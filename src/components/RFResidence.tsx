import { Button } from "~/components/ui/button";
import { type withClassname } from "~/components/Stairs";
import { twMerge } from "tailwind-merge";

const RFResidence: React.FC<withClassname> = ({ className }) => {
  return (
    <Button
      className={twMerge("border-2", className)}
      variant="outline"
      disabled
    >
      RF Residence
    </Button>
  );
};

export default RFResidence;
