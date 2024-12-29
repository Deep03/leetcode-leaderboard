'use client';

import { LeaderboardCard } from '@/components/leaderboard/card';
import get_user_score from '@/backend/script.js';


function calculate_rank() {
  
}

const mockUsers = [
  {
    username: "Upendra Pant",
    rank: 3,
    easy: 120,
    medium: 85,
    hard: 45,
    totalSolved: 250
  },
  {
    username: "Deep Lekhak",
    rank: 2,
    easy: 110,
    medium: 75,
    hard: 35,
    totalSolved: 220
  },
  {
    username: "Aarjeet Joshi",
    rank: 1,
    easy: 95,
    medium: 65,
    hard: 30,
    totalSolved: 190
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Leetcode Leaderboard
          </h1>
        </div>
        
        <div className="space-y-6">
          {mockUsers.map((user) => (
            <LeaderboardCard key={user.username} user={user} />
          ))}
        </div>
      </div>
    </main>
  );
}