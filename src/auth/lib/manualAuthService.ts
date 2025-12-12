/**
 * Manual Authentication Service
 * Handles email/password signup, OTP verification, and admin login
 */

import axios from "axios";
import { BACKEND_BASE_URL } from "./backendConfig";

// ============================================================================
// TYPES
// ============================================================================

export interface ExplorerSignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface PartnerSignupRequest {
  name: string;
  email: string;
  password: string;
  typeOfService: string;
}

export interface SignupResponse {
  status: string;
  message: string;
  data: {
    email: string;
    next_step: string;
    role?: string;
    typeOfService?: string;
  };
}

export interface OtpVerificationRequest {
  email: string;
  otp: string;
}

export interface OtpVerificationResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  user: {
    user_id: string;
    email: string;
    name: string;
    role: string;
    typeOfService?: string;
  };
}

export interface AdminLoginRequest {
  email: string;
}

export interface AdminLoginResponse {
  status: string;
  message: string;
  data: {
    email: string;
  };
}

export interface AdminVerifyRequest {
  email: string;
  password: string;
}

export interface AdminVerifyResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  user: {
    user_id: string;
    email: string;
    name: string;
    role: string;
  };
}

// ============================================================================
// EXPLORER SIGNUP
// ============================================================================

export const explorerSignup = async (
  payload: ExplorerSignupRequest
): Promise<SignupResponse> => {
  try {
    console.log("Signing up explorer:", payload.email);
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/auth/signup/explorer`,
      payload
    );
    console.log("Explorer signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Explorer signup error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to sign up as explorer"
      );
    }
    throw error;
  }
};

// ============================================================================
// PARTNER SIGNUP
// ============================================================================

export const partnerSignup = async (
  payload: PartnerSignupRequest
): Promise<SignupResponse> => {
  try {
    console.log("Signing up partner:", payload.email);
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/auth/signup/partner`,
      payload
    );
    console.log("Partner signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Partner signup error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to sign up as partner"
      );
    }
    throw error;
  }
};

// ============================================================================
// OTP VERIFICATION
// ============================================================================

export const verifyOtp = async (
  payload: OtpVerificationRequest
): Promise<OtpVerificationResponse> => {
  try {
    console.log("Verifying OTP for:", payload.email);
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/auth/verify-otp`,
      payload
    );
    console.log("OTP verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to verify OTP"
      );
    }
    throw error;
  }
};

// ============================================================================
// RESEND OTP
// ============================================================================

export const resendOtp = async (email: string): Promise<SignupResponse> => {
  try {
    console.log("Resending OTP to:", email);
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/auth/resend-otp`,
      { email }
    );
    console.log("Resend OTP response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Resend OTP error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to resend OTP"
      );
    }
    throw error;
  }
};

// ============================================================================
// ADMIN LOGIN (REQUEST)
// ============================================================================

export const adminLogin = async (
  payload: AdminLoginRequest
): Promise<AdminLoginResponse> => {
  try {
    console.log("Admin login request for:", payload.email);
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/admin/login`,
      payload
    );
    console.log("Admin login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Admin login error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to initiate admin login"
      );
    }
    throw error;
  }
};

// ============================================================================
// ADMIN LOGIN VERIFY (VERIFICATION)
// ============================================================================

export const adminVerify = async (
  payload: AdminVerifyRequest
): Promise<AdminVerifyResponse> => {
  try {
    console.log("Admin verification for:", payload.email);
    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/admin/login/verify`,
      payload
    );
    console.log("Admin verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Admin verification error:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to verify admin credentials"
      );
    }
    throw error;
  }
};
