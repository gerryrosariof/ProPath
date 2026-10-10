interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  tone?: 'teal' | 'amber' | 'green';
}

const toneClasses = {
  teal: 'bg-teal-500',
  amber: 'bg-amber-500',
  green: 'bg-emerald-500',
};

export function ProgressBar({ value, max = 100, label, tone = 'teal' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-600">{label}</span>
          <span className="text-sm font-semibold text-slate-700">{pct}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${toneClasses[tone]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
