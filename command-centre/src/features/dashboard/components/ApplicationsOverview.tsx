import {
  FolderKanban,
  ImageIcon,
  MessageSquareText,
  Package,
  ShoppingCart,
} from "lucide-react";

import type { ApplicationOverview } from "../types/application-overview.type";

interface ApplicationsOverviewProps {
  applications: ApplicationOverview[];
}

function ApplicationsOverview({ applications }: ApplicationsOverviewProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Applications Overview</h2>

        <p className="text-sm text-slate-500">
          Data summary across all connected applications.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {applications.map((app) => (
          <div
            key={app.id}
            className="rounded-xl border border-slate-200 p-5 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="text-3xl">{app.emoji}</div>

              <div>
                <h3 className="font-semibold">{app.name}</h3>

                <p className="text-xs text-slate-500">{app.lastUpdated}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-500" />
                  Products
                </div>

                <span className="font-semibold">{app.products}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-violet-500" />
                  Categories
                </div>

                <span className="font-semibold">{app.categories}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-pink-500" />
                  Images
                </div>

                <span className="font-semibold">{app.images}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4 text-amber-500" />
                  Reviews
                </div>

                <span className="font-semibold">{app.reviews}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-emerald-500" />
                  Orders
                </div>

                <span className="font-semibold">{app.orders}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationsOverview;
