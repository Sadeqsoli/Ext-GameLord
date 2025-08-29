import React from "react";
import { createRoot } from "react-dom/client";
import "../index.css";

const Popup: React.FC = () => {
  const openGame = (game: string) => {
    chrome.tabs.create({ url: chrome.runtime.getURL(`${game}.html`) });
  };

  return (
    <div className="w-96 h-144 flex flex-col bg-[#0b0f0f] text-white font-sans relative">
      {/* Header */}
      <div className="flex flex-col items-center justify-center p-3 border-b border-blue-800 text-center">
        <img
          src="/icons/icon-48.png"
          alt="Game Lord"
          className="w-12 h-12 rounded"
        />
        <h1 className="mt-2 text-[14px] font-bold tracking-wide">GAME LORD</h1>
        <p className="mt-0.5 text-[20px] text-gray-400">Play quick classics</p>
      </div>

      {/* Game List */}
      <div className="flex-1 overflow-y-auto p-3 grid grid-cols-1 gap-2">
        <button
          onClick={() => openGame("dino")}
          className="w-full h-40 px-3 flex items-center justify-between bg-blue-900 hover:bg-blue-800 rounded-lg border border-blue-800"
        >
          <span className="flex items-center gap-2">
            <span>🦖</span>
            <span className="font-medium">Dino</span>
          </span>
          <span className="text-[10px] text-gray-400">Space / ↑ to jump</span>
        </button>
        <button
          onClick={() => openGame("pong")}
          className="w-full h-40 px-3 flex items-center justify-between bg-blue-900 hover:bg-blue-800 rounded-lg border border-blue-800"
        >
          <span className="flex items-center gap-2">
            <span>🏓</span>
            <span className="font-medium">Pong</span>
          </span>
          <span className="text-[10px] text-gray-400">W/S vs ↑/↓</span>
        </button>
        <button
          onClick={() => openGame("snake")}
          className="w-full h-40 px-3 flex items-center justify-between bg-blue-900 hover:bg-blue-800 rounded-lg border border-blue-800"
        >
          <span className="flex items-center gap-2">
            <span>🐍</span>
            <span className="font-medium">Snake</span>
          </span>
          <span className="text-[10px] text-gray-400">Arrow keys</span>
        </button>
        <button
          onClick={() => alert("Minesweeper coming soon!")}
          className="w-full h-40 px-3 flex items-center justify-between bg-blue-900 hover:bg-blue-800 rounded-lg border border-blue-800"
        >
          <span className="flex items-center gap-2">
            <span>💣</span>
            <span className="font-medium">Minesweeper</span>
          </span>
          <span className="text-[10px] text-gray-400">Click to reveal</span>
        </button>
        <button
          onClick={() => alert("2048 coming soon!")}
          className="w-full h-40 px-3 flex items-center justify-between bg-blue-900 hover:bg-blue-800 rounded-lg border border-blue-800"
        >
          <span className="flex items-center gap-2">
            <span>🔢</span>
            <span className="font-medium">2048</span>
          </span>
          <span className="text-[10px] text-gray-400">Merge tiles</span>
        </button>
        <button
          onClick={() => alert("Breakout coming soon!")}
          className="w-full h-40 px-3 flex items-center justify-between bg-blue-900 hover:bg-blue-800 rounded-lg border border-blue-800"
        >
          <span className="flex items-center gap-2">
            <span>🧱</span>
            <span className="font-medium">Breakout</span>
          </span>
          <span className="text-[10px] text-gray-400">Break the bricks</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-800 text-center text-[11px] text-gray-400">
        Tip: Right-click the extension icon → Pin for quick access.
      </div>

      {/* Info button bottom-right */}
      <button
        className="absolute bottom-2 right-2 text-gray-300 hover:text-white transition-colors text-lg"
        title="About"
        onClick={async () => {
          try {
            const [tab] = await chrome.tabs.query({
              active: true,
              currentWindow: true,
            });
            if (tab?.id) {
              await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                  const text =
                    "Game Lord — quick offline games: Dino, Pong, Snake.";
                  const existing = document.getElementById("game-lord-toast");
                  if (existing) existing.remove();
                  const el = document.createElement("div");
                  el.id = "game-lord-toast";
                  el.textContent = text;
                  el.style.position = "fixed";
                  el.style.right = "16px";
                  el.style.bottom = "16px";
                  el.style.padding = "10px 14px";
                  el.style.background = "rgba(13, 31, 76, 0.95)";
                  el.style.color = "#fff";
                  el.style.borderRadius = "8px";
                  el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.3)";
                  el.style.fontFamily =
                    "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
                  el.style.fontSize = "14px";
                  el.style.zIndex = "2147483647";
                  el.style.maxWidth = "320px";
                  el.style.wordWrap = "break-word";
                  el.style.pointerEvents = "auto";
                  document.body.appendChild(el);
                  setTimeout(() => el.remove(), 4000);
                },
              });
            }
          } catch (err) {
            console.error("Failed to inject toast:", err);
          }
        }}
      >
        ℹ️
      </button>
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
