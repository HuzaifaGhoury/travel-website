"use client"
import React, { useState } from 'react';
import { sendPasswordResetEmail, Auth } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth as Auth, email);
      setResetSent(true);
    } 
    catch (error) {
      console.error('Reset password error:', error);
  if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      } 
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {resetSent ? (
        <p>Password reset email sent. Check your email for instructions.</p>
      ) : (
        <>
          <p>Enter your email to reset your password.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;