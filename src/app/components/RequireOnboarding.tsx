import React from 'react';
import { Navigate } from 'react-router';

export default function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const hasOnboarded = localStorage.getItem('hasOnboarded');

  if (!hasOnboarded) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
