const router = require("express").Router();
const User = require("../models/user");
const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret=process.env.JWT_SECRET
const {authenticateToken}=require("./userAuth")


router.post('/google', async (req, res) => {
    const { code } = req.body;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = 'postmessage'; // for auth-code flow from @react-oauth/google
  
    try {
      // 1. Exchange code for access token
      const { data: tokenData } = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }
      );
  
      const { access_token, id_token } = tokenData;
  
      // 2. Decode ID token (or fetch user info)
      const { data: userInfo } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
  
      const { email, name, picture } = userInfo;
  
      // 3. Check if user exists or create new one
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          username: name,
          email,
          profileImage: picture,
          password: null, // since it's Google login
          authProvider: 'google',
        });
      }
  
      // 4. Create app-specific JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      res.status(200).json({ token, user });
    } catch (err) {
      console.error('Google Auth Error:', err);
      res.status(500).json({ error: 'Google authentication failed' });
    }
  });
  
  module.exports = router;