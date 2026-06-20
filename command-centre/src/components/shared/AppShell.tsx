import type { ReactNode } from "react";

interface AppShellProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

function AppShell({ sidebar, header, children }: AppShellProps) {
  return (
    <div className="flex h-dvh w-dvw overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-amber-50">
      {sidebar}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden ">
        <main className="mt-4 flex-1 overflow-y-auto rounded-xl border border-white/50 bg-white/80 p-6 backdrop-blur-xl shadow-lg shadow-slate-200/50">
          {header}
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
