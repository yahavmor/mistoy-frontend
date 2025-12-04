import { useState, useEffect } from "react";


export function OnlineStatus() {


    const isOnline = useOnlineStatus();
  
    return (
      <div
        style={{
          padding: "10px",
          background: isOnline ? "green" : "red", 
          color: "white",
        }}
      >
        {isOnline ? "✅ You are online" : "⚠️ You are offline"}
      </div>
    );
  }


function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

