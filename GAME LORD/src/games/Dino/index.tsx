import React from "react";
import ReactDOM from "react-dom/client";

const DinoGame: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Dino Clone</h1>
      <p>Game coming soon...</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DinoGame />
  </React.StrictMode>
);
