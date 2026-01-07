import { useEffect, useMemo, useState } from "react";
import "./timer.css";

type FamilyRow = {
  name: string;
  alive: number;
  isOurFamily?: boolean;
  emblemText?: string;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function formatMMSS(totalSeconds: number) {
  const s = Math.max(0, totalSeconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${pad2(mm)}:${pad2(ss)}`;
}

export default function Timer() {
  const eventName = "Resource War";
  const territoryName = "Davis Quartz";

  const OUR_FAMILY = "ACE";

  const [eventSecondsLeft, setEventSecondsLeft] = useState(26 * 60 + 35);
  const [overtimeSeconds, setOvertimeSeconds] = useState(0);

  const [joinSecondsLeft, setJoinSecondsLeft] = useState(1 * 60 + 35);

  const familiesRaw: FamilyRow[] = [
    { name: "ACE", alive: 1, emblemText: "A" },
    { name: "SYNDICATE", alive: 5, emblemText: "S" },
    { name: "RAVENS", alive: 4, emblemText: "R" },
    { name: "NOMADS", alive: 2, emblemText: "N" },
  ];

  const families = useMemo(() => {
    const mapped = familiesRaw.map((f) => ({
      ...f,
      isOurFamily: f.name.toUpperCase() === OUR_FAMILY.toUpperCase(),
    }));

    const our = mapped.find((f) => f.isOurFamily);
    const others = mapped
      .filter((f) => !f.isOurFamily)
      .sort((a, b) => b.alive - a.alive);

    return ([...(our ? [our] : []), ...others] as FamilyRow[]).slice(0, 5);
  }, [familiesRaw]);

  useEffect(() => {
    const t = setInterval(() => {
      setEventSecondsLeft((prev) => {
        if (prev > 0) return prev - 1;
        setOvertimeSeconds((o) => o + 1);
        return 0;
      });

      setJoinSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const isOvertime = eventSecondsLeft <= 0 && overtimeSeconds > 0;

  return (
    <div className="t-root">
      <div className="t-panel">
        {/* Header */}
        <div className="t-header">
          <div className="t-headerLeft">
            <span className="t-liveDot" />
            <div className="t-titleWrap">
              <div className="t-title">{eventName}</div>
              <div className="t-subtitle">{territoryName}</div>
            </div>
          </div>

          <div className={`t-timer ${isOvertime ? "t-timerOvertime" : ""}`}>
            {isOvertime ? (
              <>
                <span className="t-timerLabel">OVERTIME</span>
                <span className="t-timerValue">+{formatMMSS(overtimeSeconds)}</span>
              </>
            ) : (
              <>
                <span className="t-timerLabel">TIME LEFT</span>
                <span className="t-timerValue">{formatMMSS(eventSecondsLeft)}</span>
              </>
            )}
          </div>
        </div>

        {/* Rows */}
        <div className="t-rows">
          {families.map((f) => (
            <div className={`t-row ${f.isOurFamily ? "t-rowOur" : ""}`} key={f.name}>
              <div className="t-emblem" aria-hidden="true">
                <span>{(f.emblemText ?? f.name.slice(0, 1)).toUpperCase()}</span>
              </div>

              <div className="t-name">
                {f.name}
                {f.isOurFamily && <span className="t-youTag">YOU</span>}
              </div>

              <div className={`t-alive ${f.alive <= 0 ? "t-aliveZero" : ""}`}>
                {f.alive}
              </div>
            </div>
          ))}
        </div>

        {/* Join bar */}
        <div className={`t-join ${joinSecondsLeft <= 0 ? "t-joinClosed" : ""}`}>
          <span className="t-joinDot" />
          <span className="t-joinText">
            {joinSecondsLeft > 0 ? "JOIN WINDOW" : "JOIN CLOSED"}
          </span>
          <span className="t-joinTime">
            {joinSecondsLeft > 0 ? formatMMSS(joinSecondsLeft) : "00:00"}
          </span>
        </div>
      </div>
    </div>
  );
}
