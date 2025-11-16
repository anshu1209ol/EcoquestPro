"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { TreePine, Recycle, Users, Droplets, TrendingUp, Award, Leaf, Globe } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const impactMetrics = [
  {
    icon: TreePine,
    value: 12450,
    suffix: "",
    label: "Trees Planted",
    description: "Through community tree planting challenges",
    color: "from-eco-green-500 to-eco-green-600",
  },
  {
    icon: Recycle,
    value: 8920,
    suffix: " kg",
    label: "CO₂ Reduced",
    description: "Carbon emissions prevented through eco actions",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Users,
    value: 45230,
    suffix: "",
    label: "Active Students",
    description: "Students actively participating in ECO Quest",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Droplets,
    value: 156780,
    suffix: " L",
    label: "Water Saved",
    description: "Liters of water conserved through challenges",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Recycle,
    value: 23400,
    suffix: " kg",
    label: "Waste Recycled",
    description: "Waste diverted from landfills",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Award,
    value: 125000,
    suffix: "",
    label: "Eco Points Earned",
    description: "Total points earned by the community",
    color: "from-yellow-500 to-yellow-600",
  },
];

const achievements = [
  {
    title: "Community Impact",
    description: "Our community has made significant strides in environmental conservation",
    icon: Users,
  },
  {
    title: "Educational Reach",
    description: "Thousands of students have learned about environmental issues",
    icon: Award,
  },
  {
    title: "Real-World Change",
    description: "Every challenge completed makes a tangible difference",
    icon: Globe,
  },
];

export default function Impact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-green-50 to-white">
      <Header />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-6xl font-bold text-gray-900 mb-6">
                How ECO Quest Makes an Impact
              </h1>
              <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                Together, we&apos;re creating real change for our planet through education and action
              </p>
            </motion.div>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {impactMetrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${metric.color} rounded-2xl p-8 text-white shadow-xl`}
              >
                <metric.icon className="w-12 h-12 mb-4 opacity-90" />
                <div className="text-5xl font-bold mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{metric.label}</h3>
                <p className="text-white/80 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, idx) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-eco-green-200 text-center"
                >
                  <achievement.icon className="w-16 h-16 text-eco-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Impact Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-eco-green-600 to-eco-green-700 rounded-2xl p-12 text-white"
          >
            <div className="max-w-4xl mx-auto text-center">
              <Leaf className="w-20 h-20 mx-auto mb-6 opacity-90" />
              <h2 className="text-4xl font-bold mb-6">Making a Difference Together</h2>
              <p className="text-xl mb-8 text-eco-green-100">
                ECO Quest is more than just a platform—it&apos;s a movement. Every quiz completed,
                every challenge undertaken, and every tree planted contributes to a larger goal:
                creating a sustainable future for generations to come.
              </p>
              <p className="text-lg text-eco-green-100">
                Join thousands of students who are making a real impact on the environment
                while learning and having fun. Your actions matter, and together we can
                create lasting change.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

