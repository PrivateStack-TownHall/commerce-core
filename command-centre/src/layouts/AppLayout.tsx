import { Outlet, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import AppHeader from "@/components/shared/AppHeader";
import AppSidebar from "@/components/shared/AppSidebar";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div
      className="
        flex
        h-dvh
        w-dvw
        overflow-hidden

        bg-gradient-to-br
        from-blue-50
        via-slate-50
        to-amber-50
      "
    >
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden p-4">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -12,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              flex-1
              overflow-y-auto

              rounded-md
              border

              border-white/50

              bg-white/80

              p-6

              backdrop-blur-xl

              shadow-lg
              shadow-slate-200/50
            "
          >
            <AppHeader />

            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
