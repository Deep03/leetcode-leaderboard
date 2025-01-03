'use client';

import React from 'react';
import { calculate_score } from './scripts/calculate_score';
import { Code2, Trophy, Medal, Award, Brain, Zap, Dumbbell, Leaf, Swords } from 'lucide-react';


export default function App() {
  const [rankedUsers, setRankedUsers] = React.useState(null);

  React.useEffect(() => {
    const usernames = ["panditapollo", "arjeetjoshi175", "upendrapant"]; 
    const fetchPromises = usernames.map((username) =>
      fetch(`/api/leetcode?username=${username}`)
        .then((response) => response.json())
        .catch((err) => {
          console.log(`Error fetching data for ${username}:`, err);
          return null; // Return null for any failed requests
        })
    );

    // Wait for all requests to complete
    Promise.all(fetchPromises)
      .then((data) => {
        const validData = data.filter((item) => item !== null);
        const rankedData = validData.map((user, index) => {
          const username = usernames[index];
          const problems_list = user.data.userProfileUserQuestionProgressV2.numAcceptedQuestions
          const score = calculate_score(problems_list);
          return {
            username: username,
            score: score,
            easy: problems_list[0].count,
            medium: problems_list[1].count,
            hard: problems_list[2].count
          };
        });
        rankedData.sort((a, b) => b.score - a.score);
        setRankedUsers(rankedData);
      })
      .catch((err) => {
        console.log("Error during fetch:", err);
      });
  }, []);

if (!rankedUsers) {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <Code2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-gray-400">Loading rankings...</p>
      </div>
    </div>
  );
}

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-400" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-300" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="text-gray-500">{rank}</span>;
  }
};

return (
  <div className="min-h-screen bg-black text-gray-100 p-8">
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center space-y-2">
        <h1  className="text-3xl font-bold flex items-center gap-2">
          <Code2 className="w-8 h-8 text-emerald-500" />
          Leetcode Leaderboard
        </h1>
        <p className="text-gray-400"><b>Code, Compete, Conquer!</b></p>
      </div>

      {/* Ranking Table */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-4 text-gray-400">Rank</th>
                <th className="text-left p-4 text-gray-400">Username</th>
                <th className="text-right p-4 text-gray-400">Score</th>
                <th className="text-right p-4 text-gray-400">Problems</th>
              </tr>
            </thead>
            <tbody>
              {rankedUsers.map((user, index) => (
                <tr key={user.username} 
                    className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getRankIcon(index + 1)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      {user.username}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className="bg-zinc-800 px-2 py-1 rounded-md text-sm">
                      <Zap className="w-3 h-3 inline mr-1 text-yellow-400" />
                      {user.score}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-4">
                      <span className="text-emerald-400" title="Easy">
                        <Leaf className="w-4 h-4 inline mr-1" />
                        {user.easy}
                      </span>
                      <span className="text-amber-400" title="Medium">
                        <Swords className="w-4 h-4 inline mr-1" />
                        {user.medium}
                      </span>
                      <span className="text-red-400" title="Hard">
                        <Dumbbell className="w-4 h-4 inline mr-1" />
                        {user.hard}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}