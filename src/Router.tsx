import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import GameStats from "./pages/GameStats/GameStats";
import AirDrop from "./pages/timer/timer";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* UI HUB */}
        <Route path="/" element={<Home />} />

        {/* UI PAGES */}
        <Route path="/game-stats" element={<GameStats />} />
        <Route path="/air-drop" element={<AirDrop />} />
      </Routes>
    </BrowserRouter>
  );
}
