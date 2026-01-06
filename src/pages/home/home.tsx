import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>UI Library</h1>
      <p>Select a UI to open</p>

      <div className="uiList">
        <Link to="/game-stats" className="uiCard">
          🎮 Game Stats UI
        </Link>

        {/* future UIs */}
        {/* <Link to="/inventory" className="uiCard">Inventory UI</Link> */}
      </div>
    </div>
  );
}
