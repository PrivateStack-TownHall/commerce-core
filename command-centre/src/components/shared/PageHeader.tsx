import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

function PageHeader({ title, description, badge }: PageHeaderProps) {
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
      transition={{
        duration: 0.25,
      }}
      className="mb-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h1
          className="
            text-3xl
            font-bold
            tracking-tight

            bg-gradient-to-r
            from-blue-600
            via-sky-500
            to-amber-500

            bg-clip-text
            text-transparent
          "
        >
          {title}
        </h1>

        {badge && (
          <span
            className="
              rounded-full

              bg-blue-100

              px-3
              py-1

              text-xs
              font-semibold

              text-blue-700
            "
          >
            {badge}
          </span>
        )}
      </div>

      {description && (
        <p
          className="
            mt-2
            max-w-3xl

            text-sm
            text-muted-foreground
          "
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default PageHeader;
