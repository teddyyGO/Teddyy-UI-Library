import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import GameStats from "./pages/GameStats/GameStats";
import Timer from "./pages/timer/timer";
import ResourceWarTablet from "./pages/resource-war-tablet/resource-war-tablet";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* UI HUB */}
        <Route path="/" element={<Home />} />

        {/* UI PREVIEWS */}
        <Route path="/game-stats" element={<GameStats />} />
        <Route path="/timer" element={<Timer />} />
<Route path="/resource-war-tablet" element={<ResourceWarTablet />} />
<Route path="/ResourceWarTablet" element={<ResourceWarTablet />} />

      </Routes>
    </BrowserRouter>
  );
}
