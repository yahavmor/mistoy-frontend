import React, { useEffect } from "react"

export function Popup({ isOpen, onClose,children }) {

    useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose()
    }
    if (isOpen) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <header className="popup-header">
          <h2>Your AI asisstant</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </header>
        <main className="popup-main">
          {children}
        </main>
        <footer className="popup-footer">
         <p>© 2025 AI chat. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
