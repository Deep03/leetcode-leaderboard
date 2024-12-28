'use client';

import { Crown, Trophy, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface UserStats {
  username: string;
  rank: number;
  easy: number;
  medium: number;
  hard: number;
  totalSolved: number;
}

interface LeaderboardCardProps {
  user: UserStats;
}

export function LeaderboardCard({ user }: LeaderboardCardProps) {
  return (
    <Card className="p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {user.rank === 1 && (
            <Crown className="h-6 w-6 text-yellow-500" aria-label="First Place" />
          )}
          <h3 className="text-xl font-semibold">{user.username}</h3>
        </div>
        <span className="text-sm text-muted-foreground">Rank #{user.rank}</span>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Easy</p>
            <p className="font-medium">{user.easy}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-orange-500" />
          <div>
            <p className="text-sm text-muted-foreground">Medium</p>
            <p className="font-medium">{user.medium}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-red-500" />
          <div>
            <p className="text-sm text-muted-foreground">Hard</p>
            <p className="font-medium">{user.hard}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-secondary">
          <div
            className="h-2 rounded-full bg-primary"
            style={{
              width: `${(user.totalSolved / 300) * 100}%`,
            }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground text-right">
          {user.totalSolved} problems solved
        </p>
      </div>
    </Card>
  );
}