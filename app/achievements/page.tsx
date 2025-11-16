"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import { Award, Lock, CheckCircle, Star, Trophy, Leaf, Droplets, Recycle } from "lucide-react";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: any;
  points: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Steps",
    description: "Complete your first quiz",
    icon: Star,
    points: 50,
    unlocked: true,
  },
  {
    id: 2,
    name: "Tree Planter",
    description: "Plant 5 trees",
    icon: Leaf,
    points: 200,
    unlocked: true,
    progress: 5,
    maxProgress: 5,
  },
  {
    id: 3,
    name: "Water Warrior",
    description: "Save 1000 liters of water",
    icon: Droplets,
    points: 150,
    unlocked: false,
    progress: 650,
    maxProgress: 1000,
  },
  {
    id: 4,
    name: "Recycling Master",
    description: "Recycle 50 items",
    icon: Recycle,
    points: 100,
    unlocked: false,
    progress: 32,
    maxProgress: 50,
  },
  {
    id: 5,
    name: "Quiz Champion",
    description: "Score 100% on 10 quizzes",
    icon: Trophy,
    points: 300,
    unlocked: false,
    progress: 7,
    maxProgress: 10,
  },
  {
    id: 6,
    name: "Eco Explorer",
    description: "Complete 20 challenges",
    icon: Award,
    points: 250,
    unlocked: false,
    progress: 12,
    maxProgress: 20,
  },
  {
    id: 7,
    name: "Streak Master",
    description: "Maintain a 30-day streak",
    icon: Star,
    points: 400,
    unlocked: false,
    progress: 7,
    maxProgress: 30,
  },
  {
    id: 8,
    name: "Carbon Neutral",
    description: "Reduce 100kg of CO₂",
    icon: Leaf,
    points: 500,
    unlocked: false,
    progress: 45,
    maxProgress: 100,
  },
];

function AchievementsContent() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Achievements</h1>
            <p className="text-xl text-gray-600 mb-6">
              Unlock badges and milestones as you progress on your eco journey
            </p>
            <div className="flex justify-center gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-eco-green-200">
                <div className="text-3xl font-bold text-eco-green-600 mb-2">
                  {unlockedCount} / {achievements.length}
                </div>
                <div className="text-gray-600">Achievements Unlocked</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-eco-green-200">
                <div className="text-3xl font-bold text-eco-green-600 mb-2">{totalPoints}</div>
                <div className="text-gray-600">Total Points Earned</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedAchievement(achievement)}
                className={`relative bg-white rounded-xl shadow-lg p-6 border-2 cursor-pointer transition-all ${
                  achievement.unlocked
                    ? "border-eco-green-500 hover:border-eco-green-600"
                    : "border-gray-300 opacity-75 hover:border-gray-400"
                }`}
              >
                {achievement.unlocked ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2, type: "spring" }}
                    className="absolute top-2 right-2"
                  >
                    <CheckCircle className="w-6 h-6 text-eco-green-600" />
                  </motion.div>
                ) : (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                      achievement.unlocked
                        ? "bg-gradient-to-br from-eco-green-400 to-eco-green-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <achievement.icon
                      className={`w-10 h-10 ${
                        achievement.unlocked ? "text-white" : "text-gray-500"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      achievement.unlocked ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                  <div className="flex items-center gap-2 text-eco-green-600 font-semibold">
                    <Award className="w-5 h-5" />
                    {achievement.points} pts
                  </div>

                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div className="w-full mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>
                          {achievement.progress} / {achievement.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(achievement.progress / achievement.maxProgress!) * 100}%`,
                          }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                          className="bg-eco-green-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  selectedAchievement.unlocked
                    ? "bg-gradient-to-br from-eco-green-400 to-eco-green-600"
                    : "bg-gray-300"
                }`}
              >
                <selectedAchievement.icon
                  className={`w-12 h-12 ${
                    selectedAchievement.unlocked ? "text-white" : "text-gray-500"
                  }`}
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedAchievement.name}
              </h2>
              <p className="text-gray-600 mb-4">{selectedAchievement.description}</p>
              <div className="text-eco-green-600 font-semibold text-lg mb-6">
                Reward: {selectedAchievement.points} points
              </div>
              {!selectedAchievement.unlocked && selectedAchievement.progress !== undefined && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>
                      {selectedAchievement.progress} / {selectedAchievement.maxProgress}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-eco-green-600 h-3 rounded-full"
                      style={{
                        width: `${(selectedAchievement.progress / selectedAchievement.maxProgress!) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="bg-eco-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-eco-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}

export default function Achievements() {
  return (
    <ProtectedRoute>
      <AchievementsContent />
    </ProtectedRoute>
  );
}

