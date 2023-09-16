import { useEffect, useState } from "react";

/**
 * 현재 domain 주소
 */
export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  if (!mounted) {
    return "";
  }
  return origin;
};
