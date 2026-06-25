import { CheckCircle2, Clock3, FileText } from "lucide-react";

import type { AuditLog } from "../types/audit-log.type";

interface AuditLogsProps {
  logs: AuditLog[];
}

function AuditLogs({ logs }: AuditLogsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-semibold">Audit Logs</h2>

          <p className="text-sm text-slate-500">
            Latest activity across the ecosystem.
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <FileText className="h-5 w-5" />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start justify-between p-4 transition-colors hover:bg-slate-50"
          >
            <div className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{log.appEmoji}</span>

                  <h3 className="font-medium">{log.action}</h3>
                </div>

                <p className="mt-1 text-sm text-slate-600">{log.target}</p>

                <p className="mt-1 text-xs text-slate-500">{log.appName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock3 className="h-3.5 w-3.5" />
              {log.createdAt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuditLogs;
