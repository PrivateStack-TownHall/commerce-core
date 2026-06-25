import { Activity, Clock3, Database, Server } from "lucide-react";

function DashboardMetrics() {
  const metrics = [
    {
      title: "Last Sync",
      value: "2 sec",
      icon: Clock3,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Healthy Apps",
      value: "5 / 5",
      icon: Activity,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "API Status",
      value: "Online",
      icon: Server,
      color: "text-violet-600 bg-violet-50",
    },
    {
      title: "Data Sources",
      value: "20",
      icon: Database,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.title}
            className="
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-slate-200
              bg-white
              p-4
              shadow-sm
            "
          >
            <div
              className={`
                flex h-11 w-11 items-center justify-center rounded-xl
                ${metric.color}
              `}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-slate-500">{metric.title}</p>

              <h3 className="text-xl font-bold">{metric.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardMetrics;
