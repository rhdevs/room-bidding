import { twMerge } from "tailwind-merge";
import { Button } from "~/components/ui/button";

interface LevelCardProps {
  level: string;
  className?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, className }) => {
  return (
    <Button
      className={twMerge("w-20 border-2 z-0", className)}
      variant="outline"
      disabled
    >
      Level {level}
    </Button>
  );
};

export default LevelCard;
