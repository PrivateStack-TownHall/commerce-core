import {
  ArrowUpRight,
  Boxes,
  FolderKanban,
  ImageIcon,
  MessageSquareText,
  Package,
  ShoppingCart,
} from "lucide-react";

import type { CommandCentreApplication } from "../types/command-centre.type";

interface DashboardCardsProps {
  applications: CommandCentreApplication[];
}

function DashboardCards({ applications }: DashboardCardsProps) {
  const totalApplications = applications.length;

  const totalProducts = applications.reduce(
    (sum, app) => sum + (app.stats?.products.total ?? 0),
    0,
  );

  const totalCategories = applications.reduce(
    (sum, app) => sum + (app.stats?.categories.total ?? 0),
    0,
  );

  const totalImages = applications.reduce(
    (sum, app) => sum + (app.stats?.images.total ?? 0),
    0,
  );

  const totalReviews = applications.reduce(
    (sum, app) => sum + (app.stats?.reviews.total ?? 0),
    0,
  );

  const totalOrders = applications.reduce(
    (sum, app) => sum + (app.stats?.orders.total ?? 0),
    0,
  );

  const cards = [
    {
      title: "Applications",
      value: totalApplications,
      icon: Boxes,
    },
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Categories",
      value: totalCategories,
      icon: FolderKanban,
    },
    {
      title: "Images",
      value: totalImages,
      icon: ImageIcon,
    },
    {
      title: "Reviews",
      value: totalReviews,
      icon: MessageSquareText,
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                "
              >
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </div>

            <div className="mt-5">
              <p className="text-sm text-slate-500">{card.title}</p>

              <h2 className="mt-1 text-3xl font-bold">
                {card.value.toLocaleString()}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCards;
