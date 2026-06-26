import PageHeader from "@/components/shared/page/PageHeader";

import ApplicationsOverview from "../components/ApplicationsOverview";
import AuditLogs from "../components/AuditLogs";
import DashboardCards from "../components/DashboardCards";
import DashboardMetrics from "../components/DashboardMetrics";
import DashboardSummary from "../components/DashboardSummary";
import EcosystemStatus from "../components/EcosystemStatus";
import LastSynchronization from "../components/LastSynchronization";
import LatestUpdates from "../components/LatestUpdates";
import RecentOrders from "../components/RecentOrders";
import RecentReviews from "../components/RecentReviews";

import { useCommandCentre } from "../hooks/useCommandCentre";

function CommandCentrePage() {
  const { data, isLoading } = useCommandCentre();

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Command Centre"
          description="Unified visibility across the Entrepreneur Topics Ecosystem."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Command Centre"
        description="Unified visibility across the Entrepreneur Topics Ecosystem."
      />

      <DashboardCards applications={data} />

      <DashboardMetrics applications={data} />

      <DashboardSummary applications={data} />

      <div className="grid gap-6 xl:grid-cols-2">
        <LatestUpdates applications={data} />

        <AuditLogs applications={data} />
      </div>

      <ApplicationsOverview applications={data} />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentOrders applications={data} />

        <RecentReviews applications={data} />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <LastSynchronization applications={data} />

        <EcosystemStatus applications={data} />
      </div>
    </div>
  );
}

export default CommandCentrePage;
