// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { User, Mail, Lock, LogOut } from 'lucide-react';

// export default function Profile() {
//   const { user, signOut } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: 'John Doe',
//     email: user?.email || '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle profile update
//     setIsEditing(false);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-6 bg-blue-600 text-white">
//             <div className="flex items-center space-x-4">
//               <div className="bg-white p-3 rounded-full">
//                 <User className="w-8 h-8 text-blue-600" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold">Profile Settings</h1>
//                 <p className="text-blue-100">Manage your account preferences</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     disabled={!isEditing}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     disabled={!isEditing}
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
//                   />
//                 </div>
//               </div>

//               {isEditing && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Current Password
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         value={formData.currentPassword}
//                         onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       New Password
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         value={formData.newPassword}
//                         onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Confirm New Password
//                     </label>
//                     <div className="mt-1 relative rounded-md shadow-sm">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Lock className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         type="password"
//                         value={formData.confirmPassword}
//                         onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                         className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div className="flex justify-between">
//                 {!isEditing ? (
//                   <button
//                     type="button"
//                     onClick={() => setIsEditing(true)}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     Edit Profile
//                   </button>
//                 ) : (
//                   <div className="space-x-4">
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     >
//                       Save Changes
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsEditing(false)}
//                       className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 )}

//                 <button
//                   type="button"
//                   onClick={signOut}
//                   className="text-red-600 hover:text-red-700 flex items-center gap-2"
//                 >
//                   <LogOut className="w-5 h-5" />
//                   Sign Out
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, LogOut, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, signOut, updateAddress } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    address: user?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.username || !formData.email) {
        toast.error('Username and email are required.');
        return;
      }

      // Update address only for now (password change can be added later)
      if (formData.address !== user?.address) {
        await updateAddress(formData.address);
      }

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-blue-600 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Profile Settings</h1>
                <p className="text-blue-100">Manage your account information</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <Field
                label="Full Name"
                icon={<User className="h-5 w-5 text-gray-400" />}
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
              />

              {/* Email */}
              <Field
                label="Email Address"
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />

              {/* Address */}
              <Field
                label="Address"
                icon={<MapPin className="h-5 w-5 text-gray-400" />}
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />

              {isEditing && (
                <>
                  <Field
                    label="Current Password"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                  <Field
                    label="New Password"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <Field
                    label="Confirm New Password"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="space-x-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={signOut}
                  className="text-red-600 hover:text-red-700 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared Input Field Component
function Field({
  label,
  icon,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
}: {
  label: string;
  icon: React.ReactNode;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
        />
      </div>
    </div>
  );
}
