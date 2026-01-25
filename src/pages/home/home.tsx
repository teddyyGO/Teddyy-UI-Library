import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>UI Library</h1>


      <div className="uiList">
        <Link to="/game-stats" className="uiCard">
          🎮 Game Stats
        </Link>

        <Link to="/Timer" className="uiCard">
          ⏱️ Timer
        </Link>
        <Link to="/ResourceWarTablet" className="uiCard">
          🔫 ResourceWarTablet
        </Link>
        <Link to="/FamilyLeaderboard" className="uiCard">
          🏆 Family Leaderboard
        </Link>
        <Link to="/resource-war" className="uiCard">
          🌍 Resource War
        </Link>
      </div>
    </div>
  );
}
