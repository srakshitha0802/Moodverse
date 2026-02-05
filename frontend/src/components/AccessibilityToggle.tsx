import { useState } from "react";

export default function AccessibilityToggle() {
  const [highContrast, setHighContrast] = useState(false);

  return (
    <button
      aria-label="Toggle high contrast mode"
      onClick={() => setHighContrast(!highContrast)}
      className={`p-2 ${
        highContrast ? "bg-black text-yellow-300" : "bg-white text-black"
      }`}
    >
      High Contrast
    </button>
  );
}
