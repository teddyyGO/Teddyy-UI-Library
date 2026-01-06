// src/pages/resource-war-tablet/resource-war-tablet.tsx
import "./resource-war-tablet.css";

type Family = {
  name: string;
  logo: string;
};

type Territory = {
  id: string;
  locationName: string;
  imageUrl: string; // put images in /public/gta/
  owner: Family;
  incomePerHour: number;
};

type NextBattle = {
  territoryId: string;
  startsIn: string; // "12:40" for now
};

const OUR_FAMILY = "ACE";

const families: Record<string, Family> = {
  ACE: {
    name: "ACE",
    logo: "https://media.discordapp.net/attachments/900441540156067920/916026791548837959/Frame_1_1.png?quality=lossless",
  },
  AUX: {
    name: "AUX",
    logo: "https://pbs.twimg.com/profile_images/1356973900182286337/s8K76d1F_400x400.jpg",
  },
  NULL: {
    name: "NULL",
    logo: "https://media.discordapp.net/attachments/900441540156067920/1458061526052114495/content.png?quality=lossless",
  },
  SYNDICATE: {
    name: "SYNDICATE",
    logo: "https://pbs.twimg.com/profile_images/1356973900182286337/s8K76d1F_400x400.jpg",
  },
};

/**
 * Put these files into:
 * public/gta/sawmill.jpg
 * public/gta/davis-quartz.jpg
 * public/gta/antenna.jpg
 * public/gta/port.jpg
 * public/gta/movie-set.jpg
 * public/gta/rebel-radio.jpg
 * (optional) public/gta/fallback.jpg
 */
const territories: Territory[] = [
  {
    id: "sawmill",
    locationName: "Sawmill",
    imageUrl: "/gta/sawmill.jpg",
    owner: families.ACE,
    incomePerHour: 15000,
  },
  {
    id: "davis-quartz",
    locationName: "Davis Quartz",
    imageUrl: "/gta/davis-quartz.jpg",
    owner: families.NULL,
    incomePerHour: 15000,
  },
  {
    id: "antenna",
    locationName: "Antenna (Radio Tower)",
    imageUrl: "/gta/antenna.jpg",
    owner: families.ACE,
    incomePerHour: 15000,
  },
  {
    id: "port",
    locationName: "Port of Los Santos",
    imageUrl: "/gta/port.jpg",
    owner: families.SYNDICATE,
    incomePerHour: 15000,
  },
  {
    id: "movie-set",
    locationName: "Movie Set (Backlot)",
    imageUrl: "/gta/movie-set.jpg",
    owner: families.ACE,
    incomePerHour: 15000,
  },
  {
    id: "rebel-radio",
    locationName: "Rebel Radio",
    imageUrl: "/gta/rebel-radio.jpg",
    owner: families.AUX,
    incomePerHour: 15000,
  },
];

const nextBattle: NextBattle = {
  territoryId: "port",
  startsIn: "12:40",
};

function money(n: number) {
  return n.toLocaleString("en-US");
}

function GpsIcon() {
  return (
    <svg className="rwt-gpsIcon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 14.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 0 0 0 4.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TerritoryCard({ t, onGps }: { t: Territory; onGps: (t: Territory) => void }) {
  const owned = t.owner.name === OUR_FAMILY;

  return (
    <div className={`rwt-card ${owned ? "rwt-owned" : "rwt-neutral"}`}>
      <div className="rwt-thumb">
        <img
          src={t.imageUrl}
          alt={t.locationName}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/gta/fallback.jpg";
          }}
        />

        {/* This one is absolute INSIDE the card image (correct) */}
        <button className="rwt-gps" onClick={() => onGps(t)} type="button" title="Set GPS waypoint">
          <GpsIcon />
          <span>GPS</span>
        </button>
      </div>

      <div className="rwt-body">
        <div className="rwt-titleRow">
          <div className="rwt-title">{t.locationName}</div>

          {/* Owner pill: fully green ONLY if owned */}
          <div className="rwt-pill rwt-pillOwner">Owner: {t.owner.name}</div>
        </div>

        <div className="rwt-metaRow">
          <div className="rwt-income">
            <div className="rwt-incomeValue">${money(t.incomePerHour)}</div>
            <div className="rwt-incomeLabel">per hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResourceWarTablet() {
  const ownedTerritories = territories.filter((t) => t.owner.name === OUR_FAMILY);
  const ownedCount = ownedTerritories.length;
  const totalIncome = ownedTerritories.reduce((sum, t) => sum + t.incomePerHour, 0);

  const nextBattleTerritory =
    territories.find((t) => t.id === nextBattle.territoryId) ?? territories[0];

  const onGps = (t: Territory) => {
    // Replace later with your real waypoint logic
    alert(`GPS set to: ${t.locationName}`);
  };

  return (
    <div className="rwt-page">
      <div className="rwt-panel">
        {/* Header */}
        <div className="rwt-header">
          <div className="rwt-headerLeft">
            <div className="rwt-headerTitle">Territory Menu</div>
            <div className="rwt-headerSub">Family Tablet • Resource War</div>
          </div>

          <div className="rwt-headerRight">
            <div className="rwt-yourFamily">
              <div className="rwt-yourFamilyLabel">Current Time</div>
              <div className="rwt-yourFamilyName">22:30</div>
            </div>
          </div>
        </div>

        {/* NEXT BATTLE strip (red, centered, GPS next to it) */}
        <div className="rwt-next">
          <div className="rwt-nextCenter">
            <span className="rwt-nextDot" />

            <div className="rwt-nextText">
              <div className="rwt-nextLabel">NEXT BATTLE</div>
              <div className="rwt-nextName">{nextBattleTerritory.locationName}</div>
              <div className="rwt-nextTime">
                Starts in <strong>{nextBattle.startsIn}</strong>
              </div>
            </div>

            {/* IMPORTANT: do NOT use .rwt-gps here (it is absolute) */}
            <button
              className="rwt-nextGpsBtn"
              type="button"
              onClick={() => onGps(nextBattleTerritory)}
              title="Set GPS waypoint"
            >
              <GpsIcon />
              GPS
            </button>
          </div>
        </div>

        {/* 3x2 cards */}
        <div className="rwt-grid">
          {territories.map((t) => (
            <TerritoryCard key={t.id} t={t} onGps={onGps} />
          ))}
        </div>

        {/* Summary */}
        <div className="rwt-summary">
          <div className="rwt-summaryLeft">
            <div className="rwt-summaryTitle">Income Summary</div>
            <div className="rwt-summarySub">Total territory income (owned): {ownedCount}/6</div>
          </div>

          <div className="rwt-summaryRight">
            <div className="rwt-summaryMoney">${money(totalIncome)}</div>
            <div className="rwt-summaryUnit">per hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}
