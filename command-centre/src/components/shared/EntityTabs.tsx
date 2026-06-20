import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface EntityTab {
  value: string;
  label: string;
  content: ReactNode;
  badge?: number;
}

interface EntityTabsProps {
  defaultValue: string;
  tabs: EntityTab[];
}

function EntityTabs({ defaultValue, tabs }: EntityTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList
        className="
          mb-6
          h-auto
          flex-wrap
          justify-start
          gap-2
          bg-transparent
          p-0
        "
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="
              rounded-md
              border
              px-4
              py-2
            "
          >
            {tab.label}

            {tab.badge !== undefined && (
              <span
                className="
                  ml-2
                  rounded-full
                  bg-primary/10
                  px-2
                  py-0.5
                  text-xs
                "
              >
                {tab.badge}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default EntityTabs;
