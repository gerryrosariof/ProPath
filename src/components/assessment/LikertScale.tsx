import type { QuestionOption } from '@/types';

interface LikertScaleProps {
  options: QuestionOption[];
  value: number | undefined;
  onChange: (value: number) => void;
}

export function LikertScale({ options, value, onChange }: LikertScaleProps) {
  return (
    <div className="space-y-2">
      {options.map((opt, idx) => {
        const selected = value === opt.value;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
              selected
                ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
              }`}
            >
              {selected && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <span className={`text-sm font-medium ${selected ? 'text-teal-800' : 'text-slate-700'}`}>
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
