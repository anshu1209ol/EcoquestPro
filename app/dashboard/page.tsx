"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CertificateSystem from "@/components/CertificateSystem";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { User, Award, Trophy, Calendar, TrendingUp, Leaf, CheckCircle, Edit2, Save, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useAuth } from "@/components/AuthContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  return <DashboardContent />;
}

function DashboardContent() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    address: "",
    age: ""
  });
  const { user, updateUser } = useAuth();

  if (!user) {
    return null;
  }

  const handleEdit = () => {
    setEditFormData({
      name: user.name,
      phone: user.phone,
      address: user.address,
      age: user.age
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      updateUser(editFormData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditFormData({
      name: "",
      phone: "",
      address: "",
      age: ""
    });
  };

  const recentChallenges = [
    { id: 1, name: "Plant a Tree", status: "completed", date: "2024-01-15" },
    { id: 2, name: "Reduce Plastic Usage", status: "in-progress", date: "2024-01-20" },
    { id: 3, name: "Water Conservation", status: "pending", date: "2024-01-25" },
  ];

  const activityData = [
    { name: "Mon", points: 120 },
    { name: "Tue", points: 190 },
    { name: "Wed", points: 300 },
    { name: "Thu", points: 200 },
    { name: "Fri", points: 280 },
    { name: "Sat", points: 350 },
    { name: "Sun", points: 400 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-eco-green-200"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-eco-green-500"
                />
                <div className="absolute -bottom-2 -right-2 bg-eco-green-600 text-white rounded-full p-2">
                  <Trophy className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="p-2 text-gray-600 hover:text-eco-green-600 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={editFormData.address}
                        onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        type="number"
                        value={editFormData.age}
                        onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-eco-green-600 text-white px-4 py-2 rounded-lg hover:bg-eco-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-gray-600 mb-4">
                      <div className="mb-1"><strong>Email:</strong> {user.email}</div>
                      <div className="mb-1"><strong>Phone:</strong> {user.phone || 'Not provided'}</div>
                      <div className="mb-1"><strong>Address:</strong> {user.address || 'Not provided'}</div>
                      <div className="mb-1"><strong>Age:</strong> {user.age || 'Not provided'}</div>
                      <div><strong>Plan:</strong> {user.plan === 'pro' ? 'Pro' : 'Basic'}</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-eco-green-100 px-4 py-2 rounded-full">
                        <Leaf className="w-5 h-5 text-eco-green-600" />
                        <span className="font-semibold text-eco-green-700">{user.ecoPoints} Points</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
                        <Award className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-700">Level {user.level}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                        <TrendingUp className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-700">{user.streak} Day Streak</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress to Level {user.level + 1}</span>
                        <span>{user.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${user.progress}%` }}
                          transition={{ duration: 1 }}
                          className="bg-gradient-to-r from-eco-green-500 to-eco-green-600 h-3 rounded-full"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {["overview", "activity", "challenges", "certificates"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "text-eco-green-600 border-b-2 border-eco-green-600"
                    : "text-gray-600 hover:text-eco-green-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="points" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Eco Score Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="points" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          )}

          {activeTab === "activity" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Completed Quiz: Climate Change", points: 50, time: "2 hours ago" },
                  { action: "Earned Badge: Tree Planter", points: 100, time: "1 day ago" },
                  { action: "Completed Challenge: Plant a Tree", points: 200, time: "2 days ago" },
                  { action: "Completed Quiz: Water Conservation", points: 50, time: "3 days ago" },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-eco-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-eco-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-eco-green-600">+{activity.points} pts</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "challenges" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Recent Challenges</h3>
              <div className="space-y-4">
                {recentChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center justify-between p-4 bg-eco-green-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-eco-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{challenge.name}</p>
                        <p className="text-sm text-gray-500">{challenge.date}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        challenge.status === "completed"
                          ? "bg-eco-green-600 text-white"
                          : challenge.status === "in-progress"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {challenge.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CertificateSystem 
                userPoints={user.ecoPoints} 
                userName={user.name}
                userPhoto={user.avatar}
                userEmail={user.email}
                userPhone={user.phone}
                userAddress={user.address}
              />
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

