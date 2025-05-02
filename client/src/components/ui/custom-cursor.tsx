import { useEffect, useRef, useState } from "react";
import cursorImage from "@assets/cursor.png";
import clickSound from "@assets/mouse-click.mp3";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const getRandomColor = () => {
      const colors = ["#F96C53", "#2982C4", "#F2A93C", "#14F195", "#D946EF"];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const handleClick = (e: MouseEvent) => {
      const count = 6; // Number of particles
      const sound = new Audio(clickSound); // Create the Audio object
      sound.play(); // Play the sound on click

      for (let i = 0; i < count; i++) {
        const ripple = document.createElement("span");
        ripple.className = "cursor-ripple";

        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        const scale = 1 + Math.random();

        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.style.backgroundColor = getRandomColor();
        ripple.style.setProperty("--x", `${offsetX}px`);
        ripple.style.setProperty("--y", `${offsetY}px`);
        ripple.style.setProperty("--scale", scale.toString());

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed z-[9999] pointer-events-none w-6 h-6"
        style={{
          transform: "translate(-50%, -50%)",
          backgroundColor: isHovering
            ? "rgba(14, 255, 133, 0.2)"
            : "transparent",
        }}
      >
        <img
          src={cursorImage}
          alt=""
          className="w-full h-full rounded-full"
          style={{
            transform: isHovering ? "scale(1.5)" : "scale(1)",
            transition: "transform 150ms ease",
          }}
        />
      </div>

      <style jsx="true" global="true">{`
        .cursor-ripple {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          animation: firework 0.8s ease-out forwards;
        }

        @keyframes firework {
          0% {
            transform: translate(-50%, -50%) translate(0px, 0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--x), var(--y))
              scale(var(--scale));
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
