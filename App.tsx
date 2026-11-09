"use client";

import React, { useState } from "react";
import { Circle, Eye, EyeOff } from "lucide-react";
import { motion, type Variants } from "motion/react";

// Google Chrome SVG Icon
function Chrome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C8.21 0 4.83 1.76 2.61 4.5l5.22 9.04C8.22 10.99 9.94 9 12 9h9.45C20.37 3.73 16.55 0 12 0zm-1.15 13.5l-4.73-8.2C3.12 7.37 1.5 10.49 1.5 14c0 4.8 3.23 8.84 7.67 10.12l5.2-9.02c-1.55.33-3.13-.23-3.52-1.6zm2.3 0c.93 1.62 2.87 2.37 4.6 1.76l4.73 8.19C23.21 21.36 24 18.77 24 16c0-6.19-4.72-11.28-10.74-11.96L8.06 13.5h5.09z" />
    </svg>
  );
}

// GitHub SVG Icon
function Github({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

// Stagger animation container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Child slide-up fade-in animation
const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface AppProps {
  onLoginSuccess?: () => void;
}

export default function App({ onLoginSuccess }: AppProps = {}) {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bpm_admin_authenticated", "true");
      sessionStorage.setItem("bpm_admin_user", email || "admin@balajiprimemedia.in");
    }
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleSocialClick = (provider: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bpm_admin_authenticated", "true");
      sessionStorage.setItem("bpm_admin_user", `${provider.toLowerCase()}@aurora.space`);
    }
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      {/* 3. Left Column (Hero & Background Video) */}
      <div className="w-[52%] hidden lg:flex relative flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
        {/* Background Video (NO dark overlay, gradient, or tint mask) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            type="video/mp4"
          />
        </video>

        {/* Hero Content Container with Staggered Reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="z-10 w-full max-w-xs space-y-8"
        >
          {/* Brand/Logo */}
          <motion.div variants={childVariants} className="flex items-center gap-2.5">
            <Circle className="w-5 h-5 fill-white text-white" />
            <span className="text-xl font-semibold tracking-tight text-white">Aurora</span>
          </motion.div>

          {/* Heading Block */}
          <motion.div variants={childVariants} className="space-y-2 text-left">
            <h2 className="text-4xl font-medium tracking-tight whitespace-nowrap text-white">
              Join Aurora
            </h2>
            <p className="text-white/60 text-sm leading-relaxed px-0">
              Follow these 3 quick phases to activate your space.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div variants={childVariants} className="space-y-3 w-full">
            <StepItem number={1} text="Register your identity" active={true} />
            <StepItem number={2} text="Configure your studio" active={false} />
            <StepItem number={3} text="Finalize your profile" active={false} />
          </motion.div>
        </motion.div>
      </div>

      {/* 4. Right Column (Sign Up Form) */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-medium tracking-tight text-white">
              {isLoginMode ? "Admin Sign In" : "Create New Profile"}
            </h1>
            <p className="text-white/40 text-sm">
              {isLoginMode
                ? "Enter your credentials to access the admin workspace."
                : "Input your basic details to begin the journey."}
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <SocialButton
              icon={Chrome}
              label="Google"
              onClick={() => handleSocialClick("Google")}
            />
            <SocialButton
              icon={Github}
              label="Github"
              onClick={() => handleSocialClick("GitHub")}
            />
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
              Or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputGroup
                  label="First Name"
                  placeholder="e.g. Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <InputGroup
                  label="Last Name"
                  placeholder="e.g. Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <InputGroup
              label="Email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password with Eye Toggle & Helper */}
            <div className="flex flex-col gap-2 w-full text-left">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-gray border-none rounded-xl h-11 pl-4 pr-11 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm transition-all"
                  style={{ colorScheme: "dark" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors cursor-pointer p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-white/40 mt-1">Requires at least 8 symbols.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 transition-all cursor-pointer"
            >
              {isLoginMode ? "Enter Admin Dashboard" : "Create Account"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-sm text-white/40 pt-2">
            {isLoginMode ? (
              <>
                New to Aurora?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginMode(false)}
                  className="text-white hover:underline cursor-pointer font-medium ml-1"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Member of the team?{" "}
                <button
                  type="button"
                  onClick={() => setIsLoginMode(true)}
                  className="text-white hover:underline cursor-pointer font-medium ml-1"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

// =========================================================================
// 5. REUSABLE COMPONENTS
// =========================================================================

export interface StepItemProps {
  number: number | string;
  text: string;
  active?: boolean;
}

export function StepItem({ number, text, active = false }: StepItemProps) {
  return (
    <div
      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl w-full text-sm font-medium transition-all ${
        active
          ? "bg-white text-black border border-white shadow-lg"
          : "bg-brand-gray text-white border-none"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
          active ? "bg-black text-white" : "bg-white/10 text-white/40"
        }`}
      >
        {number}
      </div>
      <span className="truncate">{text}</span>
    </div>
  );
}

export interface SocialButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}

export function SocialButton({ icon: Icon, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 w-full h-12 bg-black border border-white/10 rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all text-sm font-medium text-white cursor-pointer"
    >
      <Icon className="w-4 h-4 text-white shrink-0" />
      <span>{label}</span>
    </button>
  );
}

export interface InputGroupProps {
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
}

export function InputGroup({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
  name,
}: InputGroupProps) {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-sm font-medium text-white">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm transition-all"
        style={{ colorScheme: "dark" }}
      />
    </div>
  );
}
