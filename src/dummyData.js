export const playerMatches = [
  {
    id: 1,
    tournament: "Hostel Premier League MSRIT 2023-24",
    venue: "MSR ground, Bengaluru (Bangalore)",
    date: "27-Dec-23",
    team1: "G-XI",
    team1Score: {
      runs: 77,
      wickets: 7,
      overs: 10,
    },
    team2: "TEAM TOXIC",
    team2Score: {
      runs: 75,
      wickets: 4,
      overs: 10,
    },
    result: "G-XI won by 2 runs",
    status: "Completed",
  },
  {
    id: 2,
    tournament: "Hostel Premier League MSRIT 2023-24",
    venue: "MSR ground, Bengaluru (Bangalore)",
    date: "20-Dec-23",
    team1: "G-XI",
    team1Score: {
      runs: 109,
      wickets: 1,
      overs: 10,
    },
    team2: "102 EAGLES",
    team2Score: {
      runs: 54,
      wickets: 10,
      overs: 8.4,
    },
    result: "G-XI won by 55 runs",
    status: "Completed",
  },
  {
    id: 3,
    tournament: "Hostel Premier League MSRIT 2023-24",
    venue: "MSR ground, Bengaluru (Bangalore)",
    date: "17-Dec-23",
    team1: "Zero-11",
    team1Score: {
      runs: 77,
      wickets: 1,
      overs: 5.5,
    },
    team2: "G-XI",
    team2Score: {
      runs: 76,
      wickets: 10,
      overs: 9.3,
    },
    result: "Zero-11 won by 9 wickets",
    status: "Completed",
  },
  {
    id: 4,
    tournament: "Hostel Premier League MSRIT 2023-24",
    venue: "MSR ground, Bengaluru (Bangalore)",
    date: "28-Dec-23",
    team1: "G-XI",
    team1Score: {
      runs: 80,
      wickets: 3,
      overs: 9.0,
    },
    team2: "WARRIORS",
    team2Score: {
      runs: 60,
      wickets: 5,
      overs: 10.0,
    },
    result: "Match is live",
    status: "Live",
  },
];


export const playerStats = {
  matches: 15,            // Total number of matches played
  innings: 14,      // Number of innings played
  outs: 12,               // How many times the player got out
  runs: 480,              // Total runs scored by the player
  highestRun: 98,         // Highest individual score in an innings
  Avg: 40,         // Average runs per innings
  SR: 120.56,     // Strike rate (runs per 100 balls)
  '0s': 2,               // Number of times the player got out on 0 (ducks)
  '30s': 5,            // Number of times the player scored 30 or more runs
  '50s': 3,             // Number of 50+ scores
  '100s': 0,            // Number of centuries (100+ scores)
  '6s': 12,              // Number of sixes hit
  '4s': 35,              // Number of boundaries hit (fours)
  ducks: 2,               // Number of ducks (out on 0)
  won: 8,                 // Number of matches won
  lost: 7                 // Number of matches lost
};
export const playerteam = [
  {
    id: 1,
    team: 'G-11',
    date: '28-Dec-23',
    played: 4,
    win: 2,
    loss: 2,
  },
]
export const Mytournaments = [
  {
    id: 1,
    status:'complete',
    tournament: 'HPL 23-24',
    startdate: '18-Dec-23',
    enddate: '28-Dec-23',
    venue:'bengaluru',
    image:'/images/ball.JPG'
  },
]
