'use client';

import { Crown, Trophy, Target, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { StatsItem } from './stats-item';
import { ProgressBar } from './progress-bar';

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
        <StatsItem
          icon={Zap}
          label="Easy"
          value={user.easy}
          iconColor="text-green-500"
        />
        <StatsItem
          icon={Target}
          label="Medium"
          value={user.medium}
          iconColor="text-orange-500"
        />
        <StatsItem
          icon={Trophy}
          label="Hard"
          value={user.hard}
          iconColor="text-red-500"
        />
      </div>
      
      <ProgressBar value={user.totalSolved} max={300} />
    </Card>
  );
}