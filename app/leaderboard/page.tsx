"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const leaderboardData = [
  { rank: 1, name: "Eco Warrior", points: 5420, level: 8, badge: "🥇" },
  { rank: 2, name: "Green Guardian", points: 4890, level: 7, badge: "🥈" },
  { rank: 3, name: "Nature Lover", points: 4560, level: 7, badge: "🥉" },
  { rank: 4, name: "Planet Protector", points: 4230, level: 6, badge: "🏅" },
  { rank: 5, name: "Eco Enthusiast", points: 3890, level: 6, badge: "🏅" },
  { rank: 6, name: "Sustainable Student", points: 3560, level: 5, badge: "🏅" },
  { rank: 7, name: "Climate Champion", points: 3230, level: 5, badge: "🏅" },
  { rank: 8, name: "Earth Advocate", points: 2890, level: 4, badge: "🏅" },
  { rank: 9, name: "Green Hero", points: 2560, level: 4, badge: "🏅" },
  { rank: 10, name: "Eco Explorer", points: 2230, level: 3, badge: "🏅" },
];

const chartData = leaderboardData.slice(0, 5).map((user) => ({
  name: user.name,
  points: user.points,
}));

const pieData = [
  { name: "Level 8+", value: 1 },
  { name: "Level 6-7", value: 4 },
  { name: "Level 4-5", value: 3 },
  { name: "Level 1-3", value: 2 },
];

const COLORS = ["#22c55e", "#4ade80", "#86efac", "#bbf7d0"];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Leaderboard</h1>
            <p className="text-xl text-gray-600">Top Eco Achievers Making a Difference</p>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 0, 2].map((idx) => {
              const user = leaderboardData[idx];
              const heights = ["h-64", "h-80", "h-56"];
              const colors = [
                "from-yellow-400 to-yellow-600",
                "from-gray-300 to-gray-500",
                "from-orange-400 to-orange-600",
              ];
              return (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${idx === 0 ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}
                >
                  <div
                    className={`bg-gradient-to-b ${colors[idx]} rounded-t-2xl ${heights[idx]} flex flex-col items-center justify-end pb-6 text-white shadow-xl`}
                  >
                    <div className="text-6xl mb-2">{user.badge}</div>
                    <div className="text-4xl font-bold mb-1">{user.rank}</div>
                    <div className="text-xl font-semibold">{user.name}</div>
                    <div className="text-lg">{user.points.toLocaleString()} pts</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-eco-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Level</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user, idx) => (
                    <motion.tr
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`border-b border-gray-100 hover:bg-eco-green-50 transition-colors ${
                        user.rank <= 3 ? "bg-eco-green-50" : ""
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {user.rank <= 3 && (
                            <Trophy className={`w-5 h-5 ${
                              user.rank === 1 ? "text-yellow-500" :
                              user.rank === 2 ? "text-gray-400" :
                              "text-orange-500"
                            }`} />
                          )}
                          <span className="font-semibold text-gray-900">{user.rank}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-green-400 to-eco-green-600 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-eco-green-600" />
                          <span className="text-gray-700">Level {user.level}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold text-eco-green-600">
                          {user.points.toLocaleString()}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-eco-green-600" />
                Top 5 Points Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="points" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Medal className="w-6 h-6 text-eco-green-600" />
                Level Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

