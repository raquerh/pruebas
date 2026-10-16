import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de pantalla vuelve arriba, salvo que la URL traiga un ancla (#plan-estudios).
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
