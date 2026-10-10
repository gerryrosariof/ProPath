import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  icon?: typeof Construction;
}

export function Placeholder({ title, icon: Icon = Construction }: PlaceholderProps) {
  return (
    <AppShell title={title}>
      <div className="max-w-3xl mx-auto">
        <Card className="p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
          <p className="text-slate-500 max-w-md mx-auto">
            This page is part of a later build step. It will be available as the prototype progresses.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-slate-100 text-sm font-medium text-slate-500">
            <Construction className="w-4 h-4" />
            Coming soon
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
