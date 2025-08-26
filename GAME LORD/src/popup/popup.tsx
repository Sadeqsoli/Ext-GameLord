export default function Popup() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "200px",
        backgroundColor: "#111",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "10px",
      }}
    >
      {/* Logo */}
      <img
        src="icons/logo-48.png"
        alt="Game Lord Logo"
        style={{ width: "64px", height: "64px", marginBottom: "10px" }}
      />

      {/* Title */}
      <h2 style={{ margin: "0 0 10px 0" }}>🎮 Game Lord</h2>

      {/* Buttons */}
      <button
        style={{
          width: "100%",
          height: "50px",
          margin: "5px 0",
          fontSize: "16px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🦖 Dino Game
      </button>

      <button
        style={{
          width: "100%",
          height: "50px",
          margin: "5px 0",
          fontSize: "16px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🏓 Pong
      </button>

      <button
        style={{
          width: "100%",
          height: "50px",
          margin: "5px 0",
          fontSize: "16px",
          backgroundColor: "#333",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🐍 Snake
      </button>
    </div>
  );
}
