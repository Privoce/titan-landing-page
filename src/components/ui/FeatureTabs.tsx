import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface FeatureTabsProps {
  tabs: Tab[];
  initial?: number;
}

export default function FeatureTabs({ tabs, initial = 0 }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState(initial);

  return (
    <div className="w-full">
      <div className="relative inline-flex rounded-xl bg-white/5 p-1">
        {tabs.map((tab, index) => {
          const isSelected = index === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative z-10 px-4 py-2 text-sm rounded-lg transition-colors",
                isSelected ? "text-white" : "text-white/70 hover:text-white"
              )}
              aria-selected={isSelected}
              role="tab"
            >
              {tab.label}
              {isSelected && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={tabs[activeTab].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
