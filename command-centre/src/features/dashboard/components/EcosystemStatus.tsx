import { Activity } from "lucide-react";

interface EcosystemItem {
  application: string;
  status: "online" | "warning" | "offline";
}

interface EcosystemStatusProps {
  items: EcosystemItem[];
}

function EcosystemStatus({ items }: EcosystemStatusProps) {
  const colors = {
    online: "bg-emerald-500",
    warning: "bg-amber-500",
    offline: "bg-red-500",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />

        <h2 className="text-lg font-semibold">Ecosystem Status</h2>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.application}
            className="flex items-center justify-between rounded-lg border p-3"
          >
            <span className="font-medium">{item.application}</span>

            <div className="flex items-center gap-2">
              <div
                className={`h-2.5 w-2.5 rounded-full ${colors[item.status]}`}
              />

              <span className="capitalize">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EcosystemStatus;
