'use client';

import React, { useState, useEffect } from 'react';
import CertificateSystem from '@/components/CertificateSystem';
import { motion } from 'framer-motion';
import { Award, Star, TrendingUp, Users } from 'lucide-react';

const EnvironmentalCertificatesPage: React.FC = () => {
  // Mock user data - in a real app, this would come from your auth/user system
  const [userPoints, setUserPoints] = useState(250); // Starting with 250 points for demo
  const [userName, setUserName] = useState('Alex Kumar'); // Mock user name

  // In a real app, you would fetch this data from your backend
  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      // This would be an API call in production
      // const response = await fetch('/api/user/profile');
      // const userData = await response.json();
      // setUserPoints(userData.points);
      // setUserName(userData.name);
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-16 h-16 text-yellow-300" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Environmental Certificates</h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Earn prestigious certificates from the Government of NCT of Delhi 
                for your environmental achievements and contributions
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {userPoints.toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Points</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {Math.floor(userPoints / 1000)}
            </h3>
            <p className="text-gray-600">Certificates Unlocked</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <Users className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Level 5</h3>
            <p className="text-gray-600">Environmental Champion</p>
          </motion.div>
        </div>

        {/* Certificate System Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CertificateSystem 
            userPoints={userPoints} 
            userName={userName}
          />
        </motion.div>
      </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About Our Certificate Program</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Certificate Tiers</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Bronze Certificate</h4>
                    <p className="text-gray-600 text-sm">1,000 points - Environmental Champion</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Silver Certificate</h4>
                    <p className="text-gray-600 text-sm">5,000 points - Environmental Guardian</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">G</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Gold Certificate</h4>
                    <p className="text-gray-600 text-sm">10,000 points - Environmental Ambassador</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Earn Points</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complete environmental quizzes (50-200 points per quiz)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Participate in environmental activities and challenges</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Share environmental knowledge with others</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Complete daily environmental tasks and missions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Contribute to environmental conservation projects</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Official Recognition</h3>
            <p className="text-blue-800 text-sm">
              All certificates are officially recognized by the Government of NCT of Delhi, 
              Department of Environment, and Delhi Pollution Control Committee. 
              These certificates can be used for academic and professional purposes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvironmentalCertificatesPage;
