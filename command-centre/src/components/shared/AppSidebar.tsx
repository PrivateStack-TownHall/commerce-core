import { ChevronDown } from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import { NavLink } from "react-router-dom";

import sidebarLogo from "@/assets/images/sidebar-logo.png";
import hqStudioBuilding from "@/assets/images/hq-studio-building.png";

import { APPLICATIONS, SIDEBAR_MENU } from "@/lib/constants";

function AppSidebar() {
  const [openApplications, setOpenApplications] = useState(true);

  return (
    <aside
      className="
        m-4
        flex
        h-[calc(100dvh-2rem)]
        w-70
        flex-col
        rounded-md
        border
        border-white/50
        bg-white/85
        backdrop-blur-xl
        shadow-xl
        shadow-slate-200/50
      "
    >
      <div
        className="px-6 pt-8 pb-6 border-b
            border-slate-200/60"
      >
        <motion.img
          src={sidebarLogo}
          alt="Commerce Core"
          className="mx-auto w-full object-contain"
          whileHover={{
            scale: 1.03,
          }}
          transition={{
            duration: 0.2,
          }}
        />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden py-2">
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-2">
            {SIDEBAR_MENU.map((item) => {
              const Icon = item.icon;

              if (item.name === "Applications") {
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => setOpenApplications(!openApplications)}
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-md
                        bg-amber-50/60
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        transition-all
                        duration-200
                        hover:bg-amber-100/80
                        hover:shadow-sm
                      "
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-amber-600" />

                        <span>Applications</span>
                      </div>

                      <motion.div
                        animate={{
                          rotate: openApplications ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {openApplications && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-2 pl-4">
                            {APPLICATIONS.map((app) => (
                              <NavLink key={app.id} to={app.path}>
                                {({ isActive }) => (
                                  <motion.div
                                    whileHover={{
                                      x: 4,
                                      scale: 1.02,
                                    }}
                                    transition={{
                                      duration: 0.15,
                                    }}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-md
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        transition-all
                                        duration-200
                                       mb-2
                                      "
                                    style={{
                                      backgroundColor: isActive
                                        ? `${app.color}20`
                                        : undefined,

                                      color: isActive ? app.color : undefined,

                                      boxShadow: isActive
                                        ? `0 8px 24px ${app.color}20`
                                        : undefined,
                                    }}
                                    onMouseEnter={(e) => {
                                      if (!isActive) {
                                        e.currentTarget.style.backgroundColor = `${app.color}15`;

                                        e.currentTarget.style.color = app.color;
                                      }
                                    }}
                                    onMouseLeave={(e) => {
                                      if (!isActive) {
                                        e.currentTarget.style.backgroundColor =
                                          "";
                                        e.currentTarget.style.color = "";
                                      }
                                    }}
                                  >
                                    <span className="text-xl">{app.emoji}</span>

                                    <div className="flex flex-col">
                                      <span>{app.name}</span>

                                      <span
                                        className="
                                            text-xs
                                            opacity-60
                                          "
                                      >
                                        {app.shortName}
                                      </span>
                                    </div>
                                  </motion.div>
                                )}
                              </NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink key={item.name} to={item.path}>
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      transition={{
                        duration: 0.15,
                      }}
                      className={`
                        flex
                        items-center
                        gap-3
                        rounded-md
                        px-4
                        py-2
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        mb-2
                        ${
                          isActive
                            ? "bg-blue-100 text-blue-700 shadow-sm"
                            : "hover:bg-slate-100"
                        }
                      `}
                    >
                      <Icon size={18} />

                      <span>{item.name}</span>
                    </motion.div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.5,
          }}
          className="
            border-t
            border-slate-200/60
            p-4
          "
        >
          <motion.img
            src={hqStudioBuilding}
            alt="Headquarter Studio"
            className="
              mx-auto
              h-auto
              w-24
              object-contain
            "
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4,
              //   repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="mt-1 text-center">
            <h3
              className="
                text-xs
                font-semibold
                text-slate-800
              "
            >
              Headquarter Studio
            </h3>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Commerce Core Analytics Command Centre
            </p>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}

export default AppSidebar;
