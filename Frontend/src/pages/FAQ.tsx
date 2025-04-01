import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our collection, add items to your cart, and proceed to checkout. You'll need to be signed in to complete your purchase. Follow the checkout steps to provide shipping and payment information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other digital payment methods. All payments are processed securely through our payment gateway."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and chosen shipping method. Standard shipping typically takes 3-5 business days, while express shipping can deliver within 1-2 business days. International shipping may take longer."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Books must be in original condition, unopened, and unmarked. Please contact our customer service team to initiate a return. Shipping costs for returns are the responsibility of the customer unless the item is defective."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that additional customs fees or import duties may apply depending on your country's regulations."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history."
    },
    {
      question: "Are the books new or used?",
      answer: "Unless specifically marked as 'used' or 'pre-owned', all books sold on our platform are brand new copies from publishers or authorized distributors."
    },
    {
      question: "What if I receive a damaged book?",
      answer: "If you receive a damaged book, please contact our customer service team within 48 hours of delivery. Include photos of the damage, and we'll arrange a replacement or refund."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-700 mb-4">
            Our customer service team is here to help. Contact us through any of these channels:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Email: support@bibliobazaar.com</li>
            <li>• Phone: +1 (555) 123-4567</li>
            <li>• Live Chat: Available 24/7 on our website</li>
          </ul>
        </div>
      </div>
    </div>
  );
}