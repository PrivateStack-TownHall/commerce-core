import { CreditCard, ShoppingBag } from "lucide-react";

interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  application: string;
  total: string;
  status: string;
}

interface RecentOrdersProps {
  orders: RecentOrder[];
}

function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h2 className="text-lg font-semibold">Recent Orders</h2>

          <p className="text-sm text-slate-500">
            Latest customer transactions.
          </p>
        </div>

        <ShoppingBag className="h-5 w-5 text-primary" />
      </div>

      <div className="divide-y divide-slate-100">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <CreditCard className="h-4 w-4" />
              </div>

              <div>
                <h3 className="font-medium">{order.orderNumber}</h3>

                <p className="text-sm text-slate-500">
                  {order.customer} • {order.application}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">{order.total}</p>

              <p className="text-xs text-slate-500">{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentOrders;
