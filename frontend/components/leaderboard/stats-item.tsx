import { LucideIcon } from 'lucide-react';

interface StatsItemProps {
  icon: LucideIcon;
  label: string;
  value: number;
  iconColor: string;
}

export function StatsItem({ icon: Icon, label, value, iconColor }: StatsItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`h-4 w-4 ${iconColor}`} />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}