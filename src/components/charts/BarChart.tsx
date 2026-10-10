interface BarChartProps {
  data: { label: string; value: number; category?: string }[];
  max?: number;
  unit?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Low: 'bg-red-400',
  Average: 'bg-amber-400',
  High: 'bg-emerald-500',
};

export function BarChart({ data, max = 100, unit = '%' }: BarChartProps) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-slate-400 text-center py-4">No data to display yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item, idx) => {
        const pct = Math.min(100, Math.round((item.value / max) * 100));
        const barColor = item.category ? (CATEGORY_COLORS[item.category] ?? 'bg-teal-500') : 'bg-teal-500';
        return (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-600 truncate">{item.label}</span>
              <span className="text-sm font-semibold text-slate-700 flex-shrink-0 ml-2">
                {item.value}{unit}
              </span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
