import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import EcoBotWidget from "@/components/EcoBotWidget";
import { AuthProvider } from "@/components/AuthContext";

export const metadata: Metadata = {
  title: "ECO Quest - Gamified Environmental Education",
  description: "Learn about the environment through gamification - quizzes, challenges, leaderboards, and achievements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
          <EcoBotWidget />
        </AuthProvider>
      </body>
    </html>
  );
}

