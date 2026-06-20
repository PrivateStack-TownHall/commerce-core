import type { ColumnDef } from "@tanstack/react-table";

import PageHeader from "@/components/shared/PageHeader";
import DataTableWrapper from "@/components/shared/DataTableWrapper";
import StatusBadge from "@/components/shared/StatusBadge";

interface Service {
  name: string;
  status: "online" | "offline" | "warning" | "maintenance";
}

const data: Service[] = [
  {
    name: "Kings Brew",
    status: "online",
  },
  {
    name: "Castle Kitchen",
    status: "online",
  },
  {
    name: "Trade Hub",
    status: "warning",
  },
  {
    name: "Byte Burger",
    status: "offline",
  },
  {
    name: "Quantum Mart",
    status: "online",
  },
];

const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Application",
  },

  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

function MonitoringPage() {
  return (
    <div>
      <PageHeader
        title="Monitoring"
        description="Monitor all Commerce Core services and application health."
      />

      <DataTableWrapper columns={columns} data={data} />
    </div>
  );
}

export default MonitoringPage;
