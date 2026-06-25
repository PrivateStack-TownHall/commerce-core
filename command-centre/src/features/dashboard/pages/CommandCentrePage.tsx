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

import {
  APPLICATIONS_OVERVIEW,
  AUDIT_LOGS,
  DASHBOARD_CARDS,
  DASHBOARD_SUMMARY,
  ECOSYSTEM_STATUS,
  LAST_SYNCHRONIZATION,
  LATEST_UPDATES,
  RECENT_ORDERS,
  RECENT_REVIEWS,
} from "../constants/command-centre.constants";

function CommandCentrePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Command Centre"
        description="Unified visibility across the Entrepreneur Topics Ecosystem."
      />

      <DashboardCards cards={DASHBOARD_CARDS} />

      <DashboardMetrics />

      <DashboardSummary summary={DASHBOARD_SUMMARY} />

      <div className="grid gap-6 xl:grid-cols-2">
        <LatestUpdates updates={LATEST_UPDATES} />
        <AuditLogs logs={AUDIT_LOGS} />
      </div>

      <ApplicationsOverview applications={APPLICATIONS_OVERVIEW} />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentOrders orders={RECENT_ORDERS} />
        <RecentReviews reviews={RECENT_REVIEWS} />
      </div>

      {/* <div className="grid gap-6 xl:grid-cols-2">
        <LastSynchronization items={LAST_SYNCHRONIZATION} />
        <EcosystemStatus items={ECOSYSTEM_STATUS} />
      </div> */}
    </div>
  );
}

export default CommandCentrePage;
