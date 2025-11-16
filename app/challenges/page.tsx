"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle, Clock, Image as ImageIcon, X, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface Challenge {
  id: number;
  name: string;
  description: string;
  image?: string;
  points: number;
  status: "pending" | "in-progress" | "completed";
  date: string;
}

const defaultChallenges: Challenge[] = [
  {
    id: 1,
    name: "Plant a Tree",
    description: "Plant a tree in your neighborhood or school and document it with a photo.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop",
    points: 200,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Clean a Park",
    description: "Organize or participate in a park cleanup event. Collect and properly dispose of waste.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    points: 150,
    status: "pending",
    date: "2024-01-20",
  },
  {
    id: 3,
    name: "Reduce Plastic Usage",
    description: "Go one week without using single-use plastic items. Use reusable alternatives.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
    points: 100,
    status: "in-progress",
    date: "2024-01-18",
  },
  {
    id: 4,
    name: "Water Conservation",
    description: "Implement water-saving practices at home for one month. Track your water usage reduction.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    points: 120,
    status: "pending",
    date: "2024-01-25",
  },
  {
    id: 5,
    name: "Energy Audit",
    description: "Conduct an energy audit of your home and identify ways to reduce energy consumption.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    points: 80,
    status: "completed",
    date: "2024-01-10",
  },
];

function ChallengesContent() {
  const [challenges, setChallenges] = useState<Challenge[]>(defaultChallenges);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    name: "",
    description: "",
    points: 100,
    image: "",
  });

  const handleAddChallenge = () => {
    if (!newChallenge.name || !newChallenge.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const challenge: Challenge = {
      id: challenges.length + 1,
      name: newChallenge.name,
      description: newChallenge.description,
      image: newChallenge.image || undefined,
      points: newChallenge.points,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    setChallenges([...challenges, challenge]);
    setNewChallenge({ name: "", description: "", points: 100, image: "" });
    setShowAddModal(false);
    toast.success("Challenge added successfully!");
  };

  const handleCompleteChallenge = (id: number) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === id ? { ...challenge, status: "completed" as const } : challenge
      )
    );
    const challenge = challenges.find((c) => c.id === id);
    if (challenge) {
      toast.success(`Congratulations! You earned ${challenge.points} points!`);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewChallenge({ ...newChallenge, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-eco-green-600 text-white";
      case "in-progress":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Real-World Challenges</h1>
              <p className="text-gray-600">Complete eco-friendly tasks and make a real impact!</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-eco-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-eco-green-700 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Your Challenge
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, idx) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-eco-green-200 hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  {challenge.image ? (
                    <img
                      src={challenge.image}
                      alt={challenge.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-eco-green-400 to-eco-green-600 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-eco-green-600">{challenge.points} pts</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{challenge.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(challenge.status)}`}>
                      {challenge.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-eco-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      {challenge.points} Points
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {challenge.date}
                    </div>
                  </div>
                  {challenge.status !== "completed" && (
                    <button
                      onClick={() => handleCompleteChallenge(challenge.id)}
                      className="w-full bg-eco-green-600 text-white py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Challenge Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Your Eco Challenge</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Challenge Name *
                  </label>
                  <input
                    type="text"
                    value={newChallenge.name}
                    onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    placeholder="e.g., Plant 10 Trees"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={newChallenge.description}
                    onChange={(e) =>
                      setNewChallenge({ ...newChallenge, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    placeholder="Describe your eco challenge..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Points Reward
                  </label>
                  <input
                    type="number"
                    value={newChallenge.points}
                    onChange={(e) =>
                      setNewChallenge({ ...newChallenge, points: parseInt(e.target.value) || 100 })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-transparent"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Challenge Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {newChallenge.image ? (
                      <div className="relative">
                        <img
                          src={newChallenge.image}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          onClick={() => setNewChallenge({ ...newChallenge, image: "" })}
                          className="mt-2 text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddChallenge}
                    className="flex-1 bg-eco-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
                  >
                    Add Challenge
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function Challenges() {
  return (
    <ProtectedRoute>
      <ChallengesContent />
    </ProtectedRoute>
  );
}

