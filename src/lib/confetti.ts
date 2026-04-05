import confetti from "canvas-confetti";

/** 🎉 Full celebration burst — for page entry (promotions) */
export const firePageConfetti = () => {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#ff6b35", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#ff6b35", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
};

/** 🎊 Success burst — for form submissions */
export const fireSuccessConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#22c55e", "#34d399", "#fbbf24", "#60a5fa"],
  });
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#22c55e", "#34d399", "#fbbf24"],
    });
  }, 300);
};
