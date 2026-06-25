import { ArrowUpRight } from "lucide-react";

import type { MetricCard } from "../types/metric-card.type";

interface DashboardCardsProps {
  cards: MetricCard[];
}

function DashboardCards({ cards }: DashboardCardsProps) {
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
