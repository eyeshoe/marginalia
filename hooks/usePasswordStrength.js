import { useMemo } from "react";

export default function usePasswordStrength(password) {
  return useMemo(() => {
    let strength = 0;
    if (!password) return 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  }, [password]);
} 