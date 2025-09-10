import { useEffect, useRef, useState } from "react";

const useIdleTimer = ({ idleTime = process.env.REACT_APP_IDLE_LOGOUT_TIME * 60 * 1000, onIdle }) => {
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (window.location.pathname != '/') {
        onIdle();
      }
    }, idleTime);
  };

  const activityEvents = ["mousemove", "keydown", "scroll", "click", "touchstart"];

  useEffect(() => {
    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // start timer on mount

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
    };
  }, []);
};

export default useIdleTimer;