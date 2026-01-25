import "./resource-war.css";

type Territory = {
  id: string;
  name: string;         // shown in UI: "NP: Farm"
  owner: string;        // family name
  perHour: number;      // income
  imageFile: string;    // e.g. "Farm.png" (must exist in src/assets/)
};

const OUR_FAMILY = "ACE";

// IMPORTANT:
// Put images in: src/assets/
// and name them exactly like imageFile below (or change to .jpg).
const TERRITORIES: Territory[] = [
  { id: "farm", name: "Farm", owner: "Syndicate", perHour: 15000, imageFile: "Farm.png" },
  { id: "junkyard", name: "Junkyard", owner: "Ravens", perHour: 15000, imageFile: "Junkyard.png" },
  { id: "pier", name: "Pier", owner: "ACE", perHour: 15000, imageFile: "Pier.png" },
  { id: "windmill", name: "Windmill", owner: "Nomads", perHour: 15000, imageFile: "Windmill.png" },
  { id: "construction", name: "Construction site", owner: "Syndicate", perHour: 15000, imageFile: "Construction site.png" },
  { id: "elburro", name: "El Burro Heights", owner: "ACE", perHour: 15000, imageFile: "El Burro Heights.png" },
];

function money(n: number) {
  return n.toLocaleString("en-US");
}

function imgUrl(file: string) {
  // Vite-safe asset loading
  return new URL(`../../assets/${file}`, import.meta.url).href;
}

export default function ResourceWar() {
  const owned = TERRITORIES.filter(t => t.owner.toUpperCase() === OUR_FAMILY.toUpperCase());
  const ownedCount = owned.length;
  const ownedIncome = owned.reduce((sum, t) => sum + t.perHour, 0);

  // Mock “next battle”
  const nextTerritory = "Warehouse";
  const startsIn = "47:10";

  const onGps = (name: string) => {
    // Hook this into your game/NUI later
    console.log("GPS to:", name);
  };

  return (
    <div className="rw2-page">
      {/* LEFT SIDEBAR */}
      <aside className="rw2-side">
        <div className="rw2-profile">
          <div className="rw2-avatar" />
          <div className="rw2-profileText">
            <div className="rw2-lvl">1 LVL</div>
            <div className="rw2-name">Amyuneblebdize</div>
          </div>
        </div>

        <div className="rw2-nav">
          <div className="rw2-navItem">
            <span className="rw2-ico">📈</span>
            <span>Dashboard</span>
          </div>
          <div className="rw2-navItem">
            <span className="rw2-ico">👥</span>
            <span>Members</span>
          </div>
          <div className="rw2-navItem">
            <span className="rw2-ico">⚙️</span>
            <span>Settings</span>
          </div>
          <div className="rw2-navItem">
            <span className="rw2-ico">🗺️</span>
            <span>Territories</span>
          </div>

          <div className="rw2-navItem rw2-active">
            <span className="rw2-ico rw2-activeIco">⬛</span>
            <span>Resource War</span>
          </div>

          <div className="rw2-navItem">
            <span className="rw2-ico">📄</span>
            <span>Logs</span>
          </div>
          <div className="rw2-navItem">
            <span className="rw2-ico">👤</span>
            <span>Profile</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="rw2-main">
        <div className="rw2-top">
          <div className="rw2-title">Resource War</div>

          <div className="rw2-next">
            <div className="rw2-nextLeft">
              <div className="rw2-nextLabel">NEXT BATTLE</div>
              <div className="rw2-nextRow">
                <span className="rw2-redDot" />
                <div className="rw2-nextText">
                  <div className="rw2-nextTerr">NP: {nextTerritory}</div>
                  <div className="rw2-nextTime">Starts in: {startsIn}</div>
                </div>
              </div>
            </div>

            <button className="rw2-nextGpsBtn" onClick={() => onGps(nextTerritory)}>
              <span className="rw2-gpsIco">📍</span>
              GPS
            </button>
          </div>
        </div>

        <section className="rw2-gridWrap">
          <div className="rw2-grid">
            {TERRITORIES.map((t) => {
              const ownedByUs = t.owner.toUpperCase() === OUR_FAMILY.toUpperCase();

              return (
                <div className="rw2-card" key={t.id}>
                  <div className="rw2-imgWrap">
                    <img className="rw2-img" src={imgUrl(t.imageFile)} alt={t.name} />

                    {/* IMPORTANT: this class is ONLY for cards */}
                    <button className="rw2-gps" onClick={() => onGps(t.name)}>
                      <span className="rw2-gpsIco">📍</span>
                      GPS
                    </button>
                  </div>

                  <div className="rw2-cardBody">
                    <div className="rw2-np">NP: {t.name}</div>

                    <div className="rw2-bottomRow">
                      <div className={`rw2-ownerPill ${ownedByUs ? "rw2-ownerMine" : ""}`}>
                        Owner: {t.owner}
                      </div>

                      <div className="rw2-income">
                        <div className="rw2-incomeVal">{money(t.perHour)} $</div>
                        <div className="rw2-incomeSub">per hour</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FOOTER SUMMARY */}
        <footer className="rw2-footer">
          <div className="rw2-footLeft">
            <div className="rw2-footTitle">Total income:</div>
            <div className="rw2-footSub">Captured territories: {ownedCount}/{TERRITORIES.length}</div>
          </div>

          <div className="rw2-footRight">
            <div className="rw2-footMoney">{money(ownedIncome)} $</div>
            <div className="rw2-footPer">per hour</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
