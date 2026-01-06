import "./gameStats.css";

type Player = {
  rank: number;
  name: string;
  family: string;
  logo: string; 
  kills: number;
  deaths: number;
  dealt: number;
  taken: number;
};

const players: Player[] = [
  {
    rank: 1,
    name: "David_Ace",
    family: "ACE",
    logo: "https://media.discordapp.net/attachments/900441540156067920/916026791548837959/Frame_1_1.png?ex=695df72e&is=695ca5ae&hm=71be6536317c612dcaa87e32a1ff832e337d58bec94f674d62042a56669cb98a&=&format=webp&quality=lossless&width=240&height=240",
    kills: 3,
    deaths: 0,
    dealt: 420,
    taken: 120,
  },
  {
    rank: 2,
    name: "Tokiro_Aux",
    family: "AUX",
    logo: "https://pbs.twimg.com/profile_images/1356973900182286337/s8K76d1F_400x400.jpg",
    kills: 1,
    deaths: 2,
    dealt: 180,
    taken: 260,
  },
  {
    rank: 3,
    name: "Mucho_Null",
    family: "NULL",
    logo: "https://media.discordapp.net/attachments/900441540156067920/1458061526052114495/content.png?ex=695e451d&is=695cf39d&hm=7df200041eb7bdb62802c464276f394534c030942dfbb259ce1a803fad615397&=&format=webp&quality=lossless&width=140&height=150", // put null.png in /public
    kills: 0,
    deaths: 3,
    dealt: 60,
    taken: 410,
  },
];

const winnerFamily = "ACE";
const modeTitle = "Resource War";
const killsSummary = "3 kills";

function kd(kills: number, deaths: number): string {
  if (deaths === 0) return kills > 0 ? `${kills}.0` : "0.0";
  return (kills / deaths).toFixed(1);
}

function uniqueCount(values: string[]): number {
  return new Set(values).size;
}

export default function GameStats() {
  const totalParticipants = players.length;
  const familiesCount = uniqueCount(players.map((p) => p.family));

  return (
    <div className="page">
      <div className="bgGhost" />

      <div className="wrap">
        <div className="top">
          <div className="leftBlock">
            <div>
              <div className="resultTag">GAME RESULT</div>
              <div className="resultMeta">
                <div className="kills">{killsSummary}</div>
                <div className="scoreLabel">Your score</div>
              </div>
            </div>
          </div>

          
          <div className="winnerBadge" title="Winner family">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 9l4 3 4-6 4 6 4-3v8H4V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 19h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="winnerLabel">Winner</span>
            <span className="winnerName">Family</span>
            <span className="winnerChip">{winnerFamily}</span>
          </div>

          
          <div className="rightBlock">
            <div className="modeRow">
              <div className="gameTitle">{modeTitle}</div>
            </div>
            <div className="subTitle">Match summary</div>
          </div>
        </div>

        <div className="section">
          <div className="sectionHead">
            <div className="teamName">Participants</div>

            <div className="miniStats">
              
              <div className="mini" title="Total participants">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20c0-4 3.6-6 8-6s8 2 8 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                {totalParticipants}
              </div>

              <div className="mini" title="Families participated">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 13c-2.8 0-5 1.6-5 3.5V19h10v-2.5C13 14.6 10.8 13 8 13Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 13c-1 0-1.9.2-2.7.6 1 .8 1.7 1.9 1.7 3.1V19h6v-2.5c0-1.9-2.2-3.5-5-3.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                {familiesCount}
              </div>
            </div>
          </div>

          <div className="table">
            <div className="row headerRow">
              <div className="cell">Rank</div>
              <div className="cell">Participant</div>
              <div className="cell">Family</div>
              <div className="cell center">Kills</div>
              <div className="cell center">Deaths</div>
              <div className="cell center">KD</div>
              <div className="cell center hideSm">Damage dealt</div>
              <div className="cell center hideSm">Damage taken</div>
            </div>

            {players.map((p) => (
              <div className="row" key={p.name}>
                <div className="cell place">
                  <span>{p.rank}</span>
                </div>

                <div className="cell">
                  <div className="playerName">{p.name}</div>
                </div>

                <div className="cell">
                  <div className="familyBox">
                    <img
                      className="familyLogo"
                      src={p.logo}
                      alt={`${p.family} logo`}
                    />
                    <div className="familyName">{p.family}</div>
                  </div>
                </div>

                <div className="cell mutedNum center">{p.kills}</div>
                <div className="cell mutedNum center">{p.deaths}</div>
                <div className="cell mutedNum center">{kd(p.kills, p.deaths)}</div>
                <div className="cell mutedNum center hideSm">{p.dealt}</div>
                <div className="cell mutedNum center hideSm">{p.taken}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
