import { Clock3 } from "lucide-react";

interface SyncItem {
  application: string;
  status: string;
  updatedAt: string;
}

interface LastSynchronizationProps {
  items: SyncItem[];
}

function LastSynchronization({ items }: LastSynchronizationProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Clock3 className="h-5 w-5 text-primary" />

        <h2 className="text-lg font-semibold">Last Synchronization</h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.application}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <h3 className="font-medium">{item.application}</h3>

              <p className="text-xs text-slate-500">{item.updatedAt}</p>
            </div>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LastSynchronization;
