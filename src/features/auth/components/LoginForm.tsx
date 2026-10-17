"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  ArrowLeft,
} from "lucide-react";
import { useLogin } from "../hooks/useLogin";
import { useVerifyLoginCode } from "../hooks/useVerifyLoginCode";
import { ApiError } from "@/lib/errors/ApiError";

export function LoginForm() {
  const {
    mutate: loginUser,
    isPending: isLoggingIn,
    error: loginError,
    reset: resetLogin,
  } = useLogin();

  const {
    mutate: verifyCode,
    isPending: isVerifying,
    error: verifyError,
    reset: resetVerify,
  } = useVerifyLoginCode();

  // Active step: "CREDENTIALS" | "CHALLENGE"
  const [step, setStep] = useState<"CREDENTIALS" | "CHALLENGE">("CREDENTIALS");
  const [challengeId, setChallengeId] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");

  const activeError = step === "CREDENTIALS" ? loginError : verifyError;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetLogin();

    loginUser(formData, {
      onSuccess: (data) => {
        setChallengeId(data.challenge_id);
        setStep("CHALLENGE");
      },
      onError: (error) => {
        console.error("login errror", error)
      }
    });
  };

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeId) return;
    resetVerify();

    verifyCode({
      challenge_id: challengeId,
      code,
    }, {
      onError: (error) => {
        console.error("Verify login error: ", error)
      }
    });
  };

  const handleBackToCredentials = () => {
    setStep("CREDENTIALS");
    setChallengeId(null);
    setCode("");
    resetVerify();
  };

  const getErrorMessage = (): string | null => {
    if (!activeError) return null;
    if (activeError instanceof ApiError) {
      return activeError.message || "Authentication failed. Please try again.";
    }
    return "Failed to authenticate. Please check your network connection.";
  };

  const getFieldError = (
    fieldName: "email" | "password" | "code",
  ): string | null => {
    if (!(activeError instanceof ApiError) || !activeError.data) return null;

    const { data } = activeError;

    if (Array.isArray(data.detail)) {
      const fieldErr = data.detail.find(
        (err) => err.loc && err.loc.includes(fieldName),
      );
      if (fieldErr?.msg) return fieldErr.msg;
    }

    if (data.errors && typeof data.errors === "object") {
      const val = data.errors[fieldName];
      if (Array.isArray(val)) return val[0] || null;
      if (typeof val === "string") return val;
    }

    return null;
  };

  return (
    <div className="my-auto w-full max-w-md space-y-7">
      {/* Portal Header */}
      <div className="space-y-3">
        <div className="h-px w-12 bg-[#9D8974]" />

        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9D8974]">
          Administration
        </p>

        <h2 className="font-serif text-3xl font-normal tracking-wide text-[#211F1C] sm:text-4xl">
          Admin Portal
          <span className="mt-1 block italic text-[#82705C]">
            {step === "CREDENTIALS" ? "Sign In" : "Security Verification"}
          </span>
        </h2>

        <p className="max-w-sm text-sm leading-6 text-[#625D57]">
          {step === "CREDENTIALS"
            ? "Sign in to manage products, collections, inquiries, and showroom operations."
            : "Enter the verification code sent to your registered email or authentication app."}
        </p>
      </div>

      {/* Error Banner */}
      {activeError && (
        <div
          role="alert"
          className="border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700"
        >
          {getErrorMessage()}
        </div>
      )}

      {/* Step 1: Login Credentials Form */}
      {step === "CREDENTIALS" ? (
        <form className="space-y-5" onSubmit={handleCredentialsSubmit}>
          {/* Email Input */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#51463B]"
            >
              Administrator Email
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9D8974]" />

              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                placeholder="admin@yourcompany.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-invalid={!!getFieldError("email")}
                className="w-full border border-[#E7E1D9] bg-[#FAF8F4] py-3.5 pl-11 pr-4 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A69B8F] focus:border-[#9D8974] focus:bg-white focus:ring-1 focus:ring-[#9D8974]/20"
              />
            </div>

            {getFieldError("email") && (
              <p className="text-xs text-red-600">{getFieldError("email")}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#51463B]"
            >
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9D8974]" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                aria-invalid={!!getFieldError("password")}
                className="w-full border border-[#E7E1D9] bg-[#FAF8F4] py-3.5 pl-11 pr-12 text-sm text-[#211F1C] outline-none transition-colors placeholder:text-[#A69B8F] focus:border-[#9D8974] focus:bg-white focus:ring-1 focus:ring-[#9D8974]/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9D8974] transition-colors hover:text-[#211F1C]"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {getFieldError("password") && (
              <p className="text-xs text-red-600">
                {getFieldError("password")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="mt-2 inline-flex w-full items-center justify-center gap-3 border border-[#211F1C] bg-[#211F1C] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-[#51463B] hover:bg-[#51463B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{isLoggingIn ? "Authenticating..." : "Continue"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      ) : (
        /* Step 2: Verification Challenge Form */
        <form className="space-y-5" onSubmit={handleChallengeSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="code"
              className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#51463B]"
            >
              Verification Code
            </label>

            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9D8974]" />

              <input
                id="code"
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                aria-invalid={!!getFieldError("code")}
                className="w-full border border-[#E7E1D9] bg-[#FAF8F4] py-3.5 pl-11 pr-4 text-sm font-mono tracking-widest text-[#211F1C] outline-none transition-colors placeholder:text-[#A69B8F] focus:border-[#9D8974] focus:bg-white focus:ring-1 focus:ring-[#9D8974]/20"
              />
            </div>

            {getFieldError("code") && (
              <p className="text-xs text-red-600">{getFieldError("code")}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="inline-flex w-full items-center justify-center gap-3 border border-[#211F1C] bg-[#211F1C] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-[#51463B] hover:bg-[#51463B] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>{isVerifying ? "Verifying..." : "Verify & Sign In"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleBackToCredentials}
            className="inline-flex w-full items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#82705C] hover:text-[#211F1C]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Login</span>
          </button>
        </form>
      )}

      {/* Security Footer */}
      <div className="border-t border-[#E7E1D9] pt-5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9D8974]" />
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#51463B]">
              Restricted Access
            </p>
            <p className="text-xs leading-5 text-[#625D57]">
              This area is reserved for authorized administrators. If you need
              access, contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
