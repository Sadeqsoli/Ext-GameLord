import React from "react";
import { createRoot } from "react-dom/client";
import "../index.css";

const Popup: React.FC = () => {
  const openGame = (game: string) => {
    chrome.tabs.create({ url: chrome.runtime.getURL(`${game}.html`) });
  };

  return (
    <div className="w-72 h-96 flex flex-col bg-[#0b0f0f] text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <img
            src="/icons/icon-48.png"
            alt="Game Lord"
            className="w-8 h-8 rounded"
          />
          <div>
            <h1 className="text-base font-bold tracking-wide">GAME LORD</h1>
            <p className="text-[11px] text-gray-400 -mt-0.5">
              Play quick classics
            </p>
          </div>
        </div>
        <button
          className="text-gray-300 hover:text-white transition-colors text-lg"
          title="About"
          onClick={() =>
            alert("Game Lord — quick offline games: Dino, Pong, Snake.")
          }
        >
          ℹ️
        </button>
      </div>

      {/* Game List */}
      <div className="flex-1 overflow-y-auto p-3 grid grid-cols-1 gap-2">
        <button
          onClick={() => openGame("dino")}
          className="w-full py-3 px-3 flex items-center justify-between bg-gray-900/80 hover:bg-gray-800 rounded-lg border border-gray-800"
        >
          <span className="flex items-center gap-2">
            <span>🦖</span>
            <span className="font-medium">Dino</span>
          </span>
          <span className="text-[10px] text-gray-400">Space/↑ to jump</span>
        </button>
        <button
          onClick={() => openGame("pong")}
          className="w-full py-3 px-3 flex items-center justify-between bg-gray-900/80 hover:bg-gray-800 rounded-lg border border-gray-800"
        >
          <span className="flex items-center gap-2">
            <span>🏓</span>
            <span className="font-medium">Pong</span>
          </span>
          <span className="text-[10px] text-gray-400">W/S vs ↑/↓</span>
        </button>
        <button
          onClick={() => openGame("snake")}
          className="w-full py-3 px-3 flex items-center justify-between bg-gray-900/80 hover:bg-gray-800 rounded-lg border border-gray-800"
        >
          <span className="flex items-center gap-2">
            <span>🐍</span>
            <span className="font-medium">Snake</span>
          </span>
          <span className="text-[10px] text-gray-400">Arrow keys</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-800 text-center text-[11px] text-gray-400">
        Tip: Right-click the extension icon → Pin for quick access.
      </div>
    </div>
  );
};

export default Popup;

// Mount when used directly as an entry (extension popup)
const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<Popup />);
}
