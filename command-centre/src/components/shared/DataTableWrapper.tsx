import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import { motion } from "framer-motion";

interface DataTableWrapperProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function DataTableWrapper<TData>({
  columns,
  data,
}: DataTableWrapperProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        overflow-hidden

        rounded-xl

        border
        border-slate-200

        bg-white

        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              bg-slate-50
            "
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="
                            px-4
                            py-3

                            text-left
                            text-sm
                            font-semibold
                            text-slate-700
                          "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="
                      border-t

                      transition-colors

                      hover:bg-slate-50
                    "
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="
                              px-4
                              py-3

                              text-sm
                            "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default DataTableWrapper;
