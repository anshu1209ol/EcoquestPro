"use client";

import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleInteraction = () => {
    if (!user) {
      router.push("/auth");
      return false;
    }
    return true;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-eco-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div onClickCapture={(e) => !user && handleInteraction()}>
      {user ? children : fallback || children}
    </div>
  );
};

export default AuthGuard;
