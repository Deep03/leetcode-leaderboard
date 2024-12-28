interface ProgressBarProps {
  value: number;
  max: number;
}

export function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="mt-4">
      <div className="h-2 w-full rounded-full bg-secondary">
        <div
          className="h-2 rounded-full bg-green-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
      <p className="mt-2 text-sm text-muted-foreground text-right">
        {value} problems solved
      </p>
    </div>
  );
}