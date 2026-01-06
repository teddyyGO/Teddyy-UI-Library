import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>UI Library</h1>
      <p>Select a UI</p>

      <div className="uiList">
        <Link to="/game-stats" className="uiCard">
          🎮 Game Stats
        </Link>

        <Link to="/air-drop" className="uiCard">
          📦 Air Drop
        </Link>
      </div>
    </div>
  );
}
