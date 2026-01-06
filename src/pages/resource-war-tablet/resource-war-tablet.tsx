import "./resource-war-tablet.css";

type Family = {
  name: string;
  logo: string;
};

type Territory = {
  id: string;
  locationName: string;
  imageUrl: string;
  owner: Family;
  incomePerHour: number;
  gpsLabel?: string;
};

const FAMILIES: Record<string, Family> = {
  ACE: {
    name: "ACE",
    logo: "https://media.discordapp.net/attachments/900441540156067920/916026791548837959/Frame_1_1.png?ex=695df72e&is=695ca5ae&hm=71be6536317c612dcaa87e32a1ff832e337d58bec94f674d62042a56669cb98a&=&format=webp&quality=lossless&width=240&height=240",
  },
  AUX: {
    name: "AUX",
    logo: "https://pbs.twimg.com/profile_images/1356973900182286337/s8K76d1F_400x400.jpg",
  },
  NULL: {
    name: "NULL",
    logo: "https://media.discordapp.net/attachments/900441540156067920/1458061526052114495/content.png?ex=695e451d&is=695cf39d&hm=7df200041eb7bdb62802c464276f394534c030942dfbb259ce1a803fad615397&=&format=webp&quality=lossless&width=140&height=150",
  },
};

// You can change this to "AUX" / "NULL" depending on the viewer
const MY_FAMILY = "ACE";

// Sample territory images (safe placeholders). Replace with your in-game images later.
const territories: Territory[] = [
  {
    id: "t1",
    locationName: "Informal Kortz",
    imageUrl: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=900&q=80",
    owner: FAMILIES.ACE,
    incomePerHour: 15000,
  },
  {
    id: "t2",
    locationName: "Marlowe Dr Informal",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    owner: FAMILIES.ACE,
    incomePerHour: 15000,
  },
  {
    id: "t3",
    locationName: "Industrial Yard",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=900&q=80",
    owner: FAMILIES.ACE,
    incomePerHour: 15000,
  },
  {
    id: "t4",
    locationName: "Informal Petrol Depot",
    imageUrl: "https://images.unsplash.com/photo-1532634896-26909d0d4b2f?auto=format&fit=crop&w=900&q=80",
    owner: FAMILIES.AUX,
    incomePerHour: 15000,
  },
  {
    id: "t5",
    locationName: "South Dock Storage",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80",
    owner: FAMILIES.NULL,
    incomePerHour: 15000,
  },
  {
    id: "t6",
    locationName: "Old Town Market",
    imageUrl: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=900&q=80",
    owner: FAMILIES.AUX,
    incomePerHour: 15000,
  },
];

function money(n: number) {
  return n.toLocaleString("en-US");
}

function TerritoryCard({
  t,
  owned,
  onGps,
}: {
  t: Territory;
  owned: boolean;
  onGps: (territory: Territory) => void;
}) {
return (
  <div className={`rwt-card ${owned ? "rwt-owned" : "rwt-neutral"}`}>
    <div className="rwt-thumb">
      <img src={t.imageUrl} alt={t.locationName} />
      <button
        className="rwt-gps"
        onClick={() => onGps(t)}
        title="Set GPS waypoint"
      >
        <svg
          className="rwt-gpsIcon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        GPS
      </button>
    </div>

    <div className="rwt-body">
      <div className="rwt-titleRow">
        <div className="rwt-title">{t.locationName}</div>
        <div className={`rwt-pill ${owned ? "rwt-pillOwned" : "rwt-pillNeutral"}`}>
          {owned ? "OWNED" : "NOT OWNED"}
        </div>
      </div>

      <div className="rwt-metaRow">
        <div className="rwt-owner">
          <img className="rwt-familyLogo" src={t.owner.logo} alt={t.owner.name} />
          <span className="rwt-ownerText">Owner: {t.owner.name}</span>
        </div>

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
  const ownedTerritories = territories.filter((t) => t.owner.name === MY_FAMILY);
  const totalIncome = ownedTerritories.reduce((sum, t) => sum + t.incomePerHour, 0);

  const onGps = (t: Territory) => {
    // Replace with your game event later:
    // emitNet("setWaypoint", t.id) or window.postMessage(...), etc.
    console.log("[GPS] Waypoint set to:", t.locationName, "| territory:", t.id);
    alert(`GPS set to: ${t.locationName}`);
  };

  return (
    <div className="rwt-page">
      {/* This is the "tablet" panel */}
      <div className="rwt-panel">
        <div className="rwt-header">
          <div>
            <div className="rwt-headerTitle">Territory Menu</div>
            <div className="rwt-headerSub">Family Tablet • Resource War</div>
          </div>

          <div className="rwt-myFam">
            <span className="rwt-myFamLabel">Your family</span>
            <span className="rwt-myFamName">{MY_FAMILY}</span>
          </div>
        </div>

        <div className="rwt-grid">
          {territories.map((t) => (
            <TerritoryCard
              key={t.id}
              t={t}
              owned={t.owner.name === MY_FAMILY}
              onGps={onGps}
            />
          ))}
        </div>

        <div className="rwt-summary">
          <div className="rwt-summaryLeft">
            <div className="rwt-summaryTitle">Income Summary</div>
            <div className="rwt-summarySub">
              Total territory income (owned): <span className="rwt-summaryCount">{ownedTerritories.length}</span>/6
            </div>
          </div>

          <div className="rwt-summaryRight">
            <div className="rwt-summaryMoney">${money(totalIncome)}</div>
            <div className="rwt-summaryLabel">per hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}
