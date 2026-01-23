import "./FamilyLeaderboard.css";

type FamilyRow = {
  name: string;
  players10: number;
  leaders: number;
  business: number;
  warSquares: number;
  resourceWins7d: number;
  robberies7d: number;
  contracts7d: number;
};

const families: FamilyRow[] = [
  {
    name: "ACE",
    players10: 41,
    leaders: 2,
    business: 3,
    warSquares: 12,
    resourceWins7d: 6,
    robberies7d: 4,
    contracts7d: 3,
  },
  {
    name: "SYNDICATE",
    players10: 38,
    leaders: 1,
    business: 2,
    warSquares: 10,
    resourceWins7d: 4,
    robberies7d: 3,
    contracts7d: 2,
  },
  {
    name: "RAVENS",
    players10: 29,
    leaders: 1,
    business: 1,
    warSquares: 7,
    resourceWins7d: 3,
    robberies7d: 1,
    contracts7d: 2,
  },
  {
    name: "NOMADS",
    players10: 26,
    leaders: 0,
    business: 1,
    warSquares: 6,
    resourceWins7d: 2,
    robberies7d: 2,
    contracts7d: 1,
  },
  {
    name: "PHANTOMS",
    players10: 24,
    leaders: 1,
    business: 0,
    warSquares: 5,
    resourceWins7d: 2,
    robberies7d: 1,
    contracts7d: 2,
  },
  {
    name: "OUTCASTS",
    players10: 21,
    leaders: 0,
    business: 1,
    warSquares: 4,
    resourceWins7d: 1,
    robberies7d: 1,
    contracts7d: 1,
  },
  {
    name: "VANGUARD",
    players10: 18,
    leaders: 0,
    business: 0,
    warSquares: 3,
    resourceWins7d: 1,
    robberies7d: 0,
    contracts7d: 1,
  },
];

function calculateTotal(f: FamilyRow) {
  return (
    f.players10 * 1 +
    f.leaders * 30 +
    f.business * 5 +
    f.warSquares * 10 +
    f.resourceWins7d * 5 +
    f.robberies7d * 1 +
    f.contracts7d * 5
  );
}

export default function FamilyLeaderboard() {
  const ranked = [...families]
    .map((f) => ({ ...f, total: calculateTotal(f) }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="fl-page">
      <div className="fl-tablet">
        <div className="fl-header">
          <div>
            <h1>Family Leaderboard</h1>
            <p>Family score ranking based on weekly and permanent activities.</p>
          </div>
        </div>

        <div className="fl-table">
          {/* HEADER */}
          <div className="fl-row fl-head">
            <span>#</span>
            <span>Family</span>
            <span>Total</span>

            <span className="fl-col">
              Players 10+
              <span className="fl-q" data-tip="1 player level 10+ = 1 point">?</span>
            </span>

            <span className="fl-col">
              Leaders
              <span className="fl-q" data-tip="Faction leader = 30 points">?</span>
            </span>

            <span className="fl-col">
              Businesses
              <span className="fl-q" data-tip="Business owner = 5 points">?</span>
            </span>

            <span className="fl-col">
              Family War
              <span className="fl-q" data-tip="Points depend on square size">?</span>
            </span>

            <span className="fl-col">
              Resource War
              <span className="fl-q" data-tip="5 points per win (7 days)">?</span>
            </span>

            <span className="fl-col">
              Gunstore
              <span className="fl-q" data-tip="1 point per robbery (7 days)">?</span>
            </span>

            <span className="fl-col">
              Contracts
              <span className="fl-q" data-tip="5 points per contract (7 days)">?</span>
            </span>
          </div>

          {/* ROWS */}
          {ranked.map((f, i) => (
            <div className="fl-row" key={f.name}>
              <span className="rank">{i + 1}</span>
              <span className="family">{f.name}</span>
              <span className="total">{f.total}</span>
              <span>{f.players10}</span>
              <span>{f.leaders}</span>
              <span>{f.business}</span>
              <span>{f.warSquares}</span>
              <span>{f.resourceWins7d}</span>
              <span>{f.robberies7d}</span>
              <span>{f.contracts7d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
