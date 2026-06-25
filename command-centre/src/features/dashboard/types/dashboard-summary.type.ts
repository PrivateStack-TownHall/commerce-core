import type { ApplicationOverview } from "./application-overview.type";
import type { AuditLog } from "./audit-log.type";
import type { LatestUpdate } from "./latest-update.type";

export interface DashboardSummary {
  totalApplications: number;
  totalProducts: number;
  totalCategories: number;
  totalImages: number;
  totalReviews: number;
  totalOrders: number;

  applications: ApplicationOverview[];

  latestUpdates: LatestUpdate[];

  auditLogs: AuditLog[];
}
