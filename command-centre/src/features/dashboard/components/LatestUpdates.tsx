import { Clock3, Sparkles } from "lucide-react";

import type { LatestUpdate } from "../types/latest-update.type";

interface LatestUpdatesProps {
  updates: LatestUpdate[];
}

function LatestUpdates({ updates }: LatestUpdatesProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-semibold">Latest Updates</h2>

          <p className="text-sm text-slate-500">
            Recently added records across applications.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {updates.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 transition-colors hover:bg-slate-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl">
                {item.appEmoji}
              </div>

              <div>
                <h3 className="font-medium">{item.entityName}</h3>

                <p className="text-sm text-slate-500">
                  {item.appName} • {item.entity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock3 className="h-3.5 w-3.5" />
              {item.createdAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestUpdates;
