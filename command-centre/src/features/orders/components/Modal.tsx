import { BadgeCheck, ShoppingBag } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomerCard from "./modal/CustomerCard";
import OrderItemsCard from "./modal/OrderItemsCard";
import PaymentCard from "./modal/PaymentCard";
import SummaryCard from "./modal/SummaryCard";
import Timeline from "./modal/Timeline";

import type { Order } from "../types/order.type";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

function Modal({ open, onOpenChange, order }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-h-[92vh]
          max-w-7xl
          overflow-y-auto
          rounded-3xl
          border-0
          p-0
          shadow-2xl
        "
      >
        <div
          className="
            overflow-hidden
            rounded-3xl
            bg-white
          "
        >
          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-r
              from-primary
              via-primary
              to-primary/90
              px-8
              py-8
              text-white
            "
          >
            <div
              className="
                absolute
                -right-20
                -top-20
                h-72
                w-72
                rounded-full
                bg-white/10
              "
            />

            <div
              className="
                absolute
                -bottom-16
                left-1/2
                h-56
                w-56
                rounded-full
                bg-white/5
              "
            />

            <DialogHeader className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white/20
                      backdrop-blur
                    "
                  >
                    <ShoppingBag className="h-8 w-8" />
                  </div>

                  <div>
                    <DialogTitle className="text-3xl font-bold">
                      {order.orderNumber}
                    </DialogTitle>

                    <p className="mt-2">Customer Order Details</p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/20
                    bg-white/15
                    px-4
                    py-2
                    backdrop-blur
                  "
                >
                  <BadgeCheck className="h-5 w-5" />

                  <span className="font-semibold">{order.status}</span>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="grid gap-6 p-8 xl:grid-cols-1">
            <div className="space-y-6">
              <CustomerCard order={order} />

              <PaymentCard order={order} />

              <SummaryCard order={order} />
            </div>

            <div className="space-y-6">
              <OrderItemsCard order={order} />

              <Timeline histories={order.histories} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
