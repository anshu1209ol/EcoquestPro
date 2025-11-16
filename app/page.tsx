"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { Leaf, Award, Users, TrendingUp, ArrowRight, TreePine, Recycle, Droplets } from "lucide-react";

function HomeContent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-green-50 via-eco-green-100 to-eco-green-200 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6"
              >
                <Leaf className="w-20 h-20 text-eco-green-600" />
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-eco-green-600">ECO Quest</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Gamified Environmental Education for Students
              </p>
              <p className="text-lg text-gray-500 mb-10">
                Learn about the environment through interactive quizzes, real-world challenges, 
                and earn achievements while making a real impact on our planet.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AuthGuard fallback={
                    <Link
                      href="/auth"
                      className="inline-flex items-center gap-2 bg-eco-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-eco-green-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  }>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 bg-eco-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-eco-green-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </AuthGuard>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AuthGuard fallback={
                    <button
                      className="inline-flex items-center gap-2 bg-white text-eco-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-eco-green-50 transition-colors shadow-lg border-2 border-eco-green-600"
                    >
                      Explore Quizzes
                    </button>
                  }>
                    <Link
                      href="/quizzes"
                      className="inline-flex items-center gap-2 bg-white text-eco-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-eco-green-50 transition-colors shadow-lg border-2 border-eco-green-600"
                    >
                      Explore Quizzes
                    </Link>
                  </AuthGuard>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop"
                  alt="Beautiful nature landscape"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eco-green-900/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border-2 border-eco-green-200">
                <div className="flex items-center gap-3">
                  <div className="bg-eco-green-100 p-3 rounded-lg">
                    <Users className="w-8 h-8 text-eco-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">45K+</div>
                    <div className="text-sm text-gray-600">Active Students</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore ECO Quest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                href: "/dashboard", 
                title: "Dashboard", 
                icon: Users, 
                desc: "Track your progress",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
              },
              { 
                href: "/quizzes", 
                title: "Quizzes", 
                icon: Award, 
                desc: "Test your knowledge",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
              },
              { 
                href: "/challenges", 
                title: "Challenges", 
                icon: TrendingUp, 
                desc: "Complete real tasks",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
              },
              { 
                href: "/resources", 
                title: "Resources", 
                icon: Leaf, 
                desc: "Learn and grow",
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
              },
            ].map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Link
                  href={link.href}
                  className="block overflow-hidden bg-white rounded-xl hover:shadow-2xl transition-all border border-eco-green-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={link.image}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-eco-green-900/60 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full">
                      <link.icon className="w-6 h-6 text-eco-green-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{link.title}</h3>
                    <p className="text-gray-600">{link.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&h=1080&fit=crop"
            alt="Nature background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-eco-green-900/90 to-eco-green-800/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-white">
          <h2 className="text-4xl font-bold text-center mb-16">
            How ECO Quest Makes an Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TreePine, value: "12,450", label: "Trees Planted", color: "text-eco-green-200" },
              { icon: Recycle, value: "8,920", label: "CO₂ Reduced (kg)", color: "text-eco-green-200" },
              { icon: Users, value: "45,230", label: "Active Students", color: "text-eco-green-200" },
              { icon: Droplets, value: "156,780", label: "Liters Saved", color: "text-eco-green-200" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <stat.icon className={`w-16 h-16 mx-auto mb-4 ${stat.color}`} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="text-5xl font-bold mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-eco-green-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 bg-white text-eco-green-600 px-6 py-3 rounded-full font-semibold hover:bg-eco-green-50 transition-colors shadow-lg"
            >
              Learn More About Our Impact
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose ECO Quest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gamified Learning",
                desc: "Earn points, badges, and achievements as you learn about environmental issues.",
                icon: Award,
              },
              {
                title: "Real-World Impact",
                desc: "Complete challenges that make a tangible difference in your community.",
                icon: TrendingUp,
              },
              {
                title: "Comprehensive Resources",
                desc: "Access educational content, documentaries, and downloadable materials.",
                icon: Leaf,
              },
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-eco-green-50 rounded-xl border border-eco-green-200"
              >
                <feature.icon className="w-12 h-12 text-eco-green-600 mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}

