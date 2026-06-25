import type { LucideIcon } from "lucide-react";

export interface MetricCard {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}
