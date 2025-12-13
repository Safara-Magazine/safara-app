# Google Authentication Setup Guide

## Overview

Your app now has complete Google OAuth 2.0 authentication integrated with your backend. This guide covers setup and implementation.

## 📦 What Was Added

### New Files Created

1. **src/lib/backendConfig.ts** - Backend API configuration
2. **src/hooks/useAuthQueries.ts** - Authentication query hooks
3. **src/lib/googleAuthService.ts** - Google auth service utilities
4. **src/components/auth-examples.tsx** - Example components

### Updated Files

- **env.example** - Added backend URL configuration
- **src/exports.ts** - Added auth exports

## ⚙️ Environment Setup

### Step 1: Configure Environment Variables

Create `.env.local`:

```env
# Strapi CMS API
NEXT_PUBLIC_API_URL=http://localhost:1337/api

# Backend (Authentication Service)
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

### Step 2: Verify Backend is Running

The backend should be running on `http://localhost:4000` and have these endpoints available:

- `GET /api/auth/google` - Returns Google OAuth URL
- `POST /api/auth/google/callback` - Handles OAuth callback with auth code

## 🔑 Authentication Hooks

### useGoogleAuthUrl()

Get the Google OAuth login URL:

```tsx
import { useGoogleAuthUrl } from '@/exports';

const { data: authUrlData, isLoading } = useGoogleAuthUrl();
// authUrlData.url contains the Google login URL
```

### useGoogleCallback(code)

Handle the OAuth callback:

```tsx
import { useGoogleCallback } from '@/exports';

const { mutate: handleCallback, isPending } = useGoogleCallback();

// Call after receiving auth code from Google
handleCallback(authCode, {
  onSuccess: () => console.log('Logged in!'),
  onError: (error) => console.error('Auth failed:', error),
});
```

### useLogout()

Logout the user:

```tsx
import { useLogout } from '@/exports';

const { mutate: logout, isPending } = useLogout();

logout();
```

### useCurrentUser()

Get current logged-in user:

```tsx
import { useCurrentUser } from '@/exports';

const { data: user, isLoading } = useCurrentUser();
```

## 🛠️ Service Utilities

### initGoogleAuth()

Get Google auth URL:

```tsx
import { initGoogleAuth } from '@/exports';

const url = await initGoogleAuth();
window.location.href = url;
```

### handleGoogleOAuthCallback(code)

Exchange auth code for token:

```tsx
import { handleGoogleOAuthCallback } from '@/exports';

const result = await handleGoogleOAuthCallback(code);
// result contains token and user data
```

### getAuthCodeFromUrl()

Extract auth code from URL query params:

```tsx
import { getAuthCodeFromUrl } from '@/exports';

const code = getAuthCodeFromUrl();
// Returns auth code from ?code=... in URL
```

### redirectToGoogleLogin()

Redirect to Google login (automatic):

```tsx
import { redirectToGoogleLogin } from '@/exports';

await redirectToGoogleLogin();
```

### Token Management

```tsx
import {
  isAuthenticated,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
} from '@/exports';

// Check if user is logged in
if (isAuthenticated()) {
  const token = getAuthToken();
}

// Manually set token
setAuthToken(token);

// Clear token
clearAuthToken();
```

## 📱 Example Components

### 1. Google Login Button

```tsx
import { GoogleLoginButton } from '@/components/auth-examples';

export default function LoginPage() {
  return <GoogleLoginButton />;
}
```

**Features:**
- Shows Google login button
- Fetches OAuth URL and redirects
- Disabled while loading

### 2. OAuth Callback Handler

Place on your callback route (e.g., `/auth/callback`):

```tsx
// app/auth/callback/page.tsx
import { GoogleAuthCallback } from '@/components/auth-examples';

export default function CallbackPage() {
  return <GoogleAuthCallback />;
}
```

**Features:**
- Extracts auth code from URL
- Exchanges code for token
- Redirects on success/failure
- Shows loading state

### 3. User Profile Component

```tsx
import { UserProfile } from '@/components/auth-examples';

export default function Header() {
  return <UserProfile />;
}
```

**Features:**
- Shows logged-in user info
- Logout button
- Displays name and email

### 4. Protected Routes

```tsx
import { ProtectedRoute } from '@/components/auth-examples';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Only logged-in users see this</div>
    </ProtectedRoute>
  );
}
```

**Features:**
- Redirects to login if not authenticated
- Shows loading state
- Protects sensitive pages

### 5. Login Page

```tsx
import { LoginPage } from '@/components/auth-examples';

export default function Page() {
  return <LoginPage />;
}
```

**Features:**
- Complete login UI
- Error display
- Google button
- Responsive design

### 6. Auth Status

```tsx
import { AuthStatus } from '@/components/auth-examples';

export default function Header() {
  return <AuthStatus />;
}
```

**Features:**
- Shows login status
- Displays user info if logged in

## 🔐 Auth Store (Zustand)

The authentication state is managed by `useAuthStore`:

```tsx
import { useAuthStore } from '@/exports';

const {
  user,                // Current user object
  isAuthenticated,     // Boolean
  isLoading,          // Loading state
  error,              // Error message
  setUser,            // Set user
  setLoading,         // Set loading
  setError,           // Set error
  logout,             // Clear auth state
} = useAuthStore();
```

## 📋 Complete Login Flow Example

### Step 1: Create Login Page

```tsx
// app/login/page.tsx
"use client";

import { GoogleLoginButton } from '@/components/auth-examples';
import { useAuthStore } from '@/exports';

export default function LoginPage() {
  const { error } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        
        {error && <div className="text-red-600 mb-4">{error}</div>}
        
        <GoogleLoginButton />
      </div>
    </div>
  );
}
```

### Step 2: Create Callback Route

```tsx
// app/auth/callback/page.tsx
import { GoogleAuthCallback } from '@/components/auth-examples';

export default function CallbackPage() {
  return <GoogleAuthCallback />;
}
```

### Step 3: Protect Routes

```tsx
// app/dashboard/page.tsx
"use client";

import { ProtectedRoute } from '@/components/auth-examples';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Welcome to Dashboard</div>
    </ProtectedRoute>
  );
}
```

### Step 4: Show User Info

```tsx
// components/Header.tsx
"use client";

import { UserProfile, AuthStatus } from '@/components/auth-examples';
import { useAuthStore } from '@/exports';

export default function Header() {
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="border-b p-4">
      {isAuthenticated ? <UserProfile /> : <AuthStatus />}
    </header>
  );
}
```

## 🔄 Authentication Flow Diagram

```
1. User clicks "Sign in with Google"
   ↓
2. App calls useGoogleAuthUrl()
   ↓
3. Backend returns Google OAuth URL
   ↓
4. Redirect to Google login (authUrlData.url)
   ↓
5. User authorizes app on Google
   ↓
6. Google redirects to /auth/callback?code=XXX
   ↓
7. <GoogleAuthCallback /> extracts code
   ↓
8. Calls useGoogleCallback(code)
   ↓
9. Backend exchanges code for token
   ↓
10. Token saved to localStorage
    ↓
11. User data saved to auth store
    ↓
12. Redirect to home/dashboard
```

## 📡 Backend Integration

Your backend should implement:

### GET /api/auth/google

Returns Google OAuth URL:

```json
{
  "url": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### POST /api/auth/google/callback

Accepts auth code, returns token:

```json
{
  "request": {
    "code": "auth_code_from_google"
  },
  "response": {
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "name": "User Name",
      "picture": "https://..."
    }
  }
}
```

### GET /api/auth/me

Get current user (requires Bearer token):

```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "picture": "https://..."
  }
}
```

### POST /api/auth/logout

Logout endpoint (requires Bearer token).

## 🧪 Testing

### Mock User Data

```tsx
import { mockUser } from '@/exports';

// mockUser = {
//   id: "user-1",
//   email: "test@example.com",
//   name: "Test User",
//   role: "user"
// }
```

### Reset Auth State

```tsx
import { useAuthStore } from '@/exports';

// Reset to initial state
useAuthStore.setState({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
});
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Ensure NEXT_PUBLIC_BACKEND_URL is set in .env.local |
| Token not persisting | Check localStorage in browser DevTools |
| Callback not working | Verify backend /api/auth/google/callback is running |
| User not updating | Check that backend returns correct user structure |
| CORS errors | Ensure backend allows requests from your frontend origin |

## 📚 API Reference

### Types

```tsx
interface GoogleAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}
```

### Auth Store Structure

```tsx
interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}
```

## ✅ Setup Checklist

- [ ] Backend running on http://localhost:4000
- [ ] Verify `/api/auth/google` endpoint works
- [ ] Verify `/api/auth/google/callback` endpoint works
- [ ] Set `NEXT_PUBLIC_BACKEND_URL=http://localhost:4000` in `.env.local`
- [ ] Import and use GoogleLoginButton component
- [ ] Create /auth/callback route with GoogleAuthCallback
- [ ] Test login flow end-to-end
- [ ] Protect routes with ProtectedRoute component
- [ ] Display user info with UserProfile component

## 🚀 Next Steps

1. **Start your backend** on port 4000
2. **Set environment variables** in .env.local
3. **Copy auth components** to your pages
4. **Test the login flow** end-to-end
5. **Protect your routes** that need authentication

Everything is ready to integrate!
