import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import GameStats from "./pages/GameStats/GameStats";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* landing page */}
        <Route path="/" element={<Home />} />

        {/* UIs */}
        <Route path="/game-stats" element={<GameStats />} />
      </Routes>
    </BrowserRouter>
  );
}
