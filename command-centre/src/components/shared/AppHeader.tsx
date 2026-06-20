import { Moon, Sun, Map, Activity } from "lucide-react";

import { motion } from "framer-motion";
import { APPLICATIONS } from "@/lib/constants";

function AppHeader() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        flex
        items-center
        justify-between
        border
        border-white/50
        bg-white/80
      "
    >
      {/* LEFT */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 px-2">
          Available Services
        </span>

        <div className="flex max-w-[750px] gap-2 overflow-x-auto scrollbar-none p-2">
          {APPLICATIONS.map((app) => (
            <motion.a
              key={app.id}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{
                y: -2,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
          shrink-0
          rounded-md
          px-2
          py-1
          text-xs
          font-medium
          transition-all
        "
              style={{
                backgroundColor: `${app.color}20`,
                color: app.color,
                border: `1px solid ${app.color}40`,
              }}
            >
              {app.emoji} {app.name}
            </motion.a>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{
            rotate: 15,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            rounded-md
            bg-blue-50
            p-2.5
            text-blue-700
            transition-all
          "
        >
          <Moon size={18} />
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            flex
            items-center
            gap-2
            rounded-md
            bg-amber-50
            px-4
            py-2
            text-sm
            font-medium
            text-amber-700
            transition-all
          "
        >
          <Map size={16} />

          <span>Ecosystem View</span>
        </motion.button>
      </div>
    </motion.header>
  );
}

export default AppHeader;
