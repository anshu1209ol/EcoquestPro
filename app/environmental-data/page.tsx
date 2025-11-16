"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Cloud, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const temperatureData = [
  { month: "Jan", temp: 14.2 },
  { month: "Feb", temp: 15.1 },
  { month: "Mar", temp: 17.8 },
  { month: "Apr", temp: 20.5 },
  { month: "May", temp: 23.2 },
  { month: "Jun", temp: 25.8 },
];

const pollutionData = [
  { month: "Jan", aqi: 85 },
  { month: "Feb", aqi: 78 },
  { month: "Mar", aqi: 92 },
  { month: "Apr", aqi: 88 },
  { month: "May", aqi: 75 },
  { month: "Jun", aqi: 70 },
];

const stats = [
  {
    icon: Thermometer,
    label: "Global Temperature",
    value: "15.8°C",
    change: "+0.3°C",
    trend: "up",
    color: "text-red-600",
  },
  {
    icon: Cloud,
    label: "Air Quality Index",
    value: "72",
    change: "-5",
    trend: "down",
    color: "text-eco-green-600",
  },
  {
    icon: Droplets,
    label: "Water Quality",
    value: "Good",
    change: "Stable",
    trend: "stable",
    color: "text-blue-600",
  },
  {
    icon: Wind,
    label: "CO₂ Levels",
    value: "415 ppm",
    change: "+2 ppm",
    trend: "up",
    color: "text-orange-600",
  },
];

export default function EnvironmentalData() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Environmental Data</h1>
            <p className="text-xl text-gray-600">
              Real-time environmental metrics and trends
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  {stat.trend === "up" && <TrendingUp className="w-5 h-5 text-red-500" />}
                  {stat.trend === "down" && <TrendingDown className="w-5 h-5 text-eco-green-500" />}
                </div>
                <h3 className="text-sm text-gray-600 mb-2">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className={`text-sm ${stat.trend === "down" ? "text-eco-green-600" : stat.trend === "up" ? "text-red-600" : "text-gray-500"}`}>
                  {stat.change} from last month
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Thermometer className="w-6 h-6 text-red-600" />
                Temperature Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="temp" stroke="#ef4444" fill="#fecaca" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border border-eco-green-200"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                <Cloud className="w-6 h-6 text-gray-600" />
                Air Quality Index
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pollutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="aqi" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-eco-green-50 rounded-xl p-6 border border-eco-green-200"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Data</h3>
            <p className="text-gray-600">
              This environmental data is updated regularly and provides insights into global and local
              environmental conditions. The data helps track trends and understand the impact of
              environmental initiatives. Note: This is sample data for demonstration purposes.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

