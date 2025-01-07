import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";
const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: string;
  y: string;
  info: { name: string; email: string; avatar: string };
}) => {
  const color = stringToColor(info.email || "1");
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{ top: y, left: x, pointerEvents: "none" }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1 }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 24 24"
        className={`h-6 w-6 text-[${color}] transform translate-x-[0px] translate-y-[0px] stroke-[${color}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3 2L19 12L12 13L15 21L10 15L7 17L7 10L3 2Z" />
      </svg>

      <motion.div
        className="px-2 py-2 bg-neutral-200 text-black rounded-full text-xs font-bold whitespace-nowrap min-w-max"
        style={{ backgroundColor: color }}
        initial={{ opacity: 0.5, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.5, scale: 0 }}
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
};
export default FollowPointer;
