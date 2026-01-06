import "./timer.css";

type Entry = {
  family: string;
  logo: string;
  count: number;
};

const entries: Entry[] = [
  {
    family: "ACE",
    logo: "https://media.discordapp.net/attachments/900441540156067920/916026791548837959/Frame_1_1.png?quality=lossless",
    count: 4,
  },
  {
    family: "AUX",
    logo: "https://pbs.twimg.com/profile_images/1356973900182286337/s8K76d1F_400x400.jpg",
    count: 2,
  },
];

export default function Timer() {
  return (
    <div className="timerBox">
      <div className="timerHeader">
        <span className="liveDot" />
        <span className="title">AIR DROP</span>
        <span className="time">26:35</span>
      </div>

      <div className="timerList">
        {entries.map(e => (
          <div className="timerRow" key={e.family}>
            <div className="family">
              <img src={e.logo} alt={e.family} />
              <span>{e.family}</span>
            </div>
            <div className="count">{e.count}</div>
          </div>
        ))}
      </div>

      <div className="timerJoin">
        <span className="joinDot" />
        Join: 1:35
      </div>
    </div>
  );
}
