import { Outlet, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import AppShell from "@/components/shared/AppShell";
import AppHeader from "@/components/shared/AppHeader";
import AppSidebar from "@/components/shared/AppSidebar";
import PageTransition from "@/components/shared/PageTransition";

export default function AppLayout() {
  const location = useLocation();

  return (
    <AppShell sidebar={<AppSidebar />} header={<AppHeader />}>
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
    </AppShell>
  );
}
