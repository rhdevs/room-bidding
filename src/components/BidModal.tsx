import React, { ReactNode, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api, RouterOutputs } from "~/utils/api";
import { toast } from "react-hot-toast";
import { getString } from "./RoomCard";

type Room = RouterOutputs["room"]["getRoom"];

type BidModalProps = {
  room: Room;
  children: ReactNode;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BidModal: React.FC<BidModalProps> = ({
  room,
  children,
  isDialogOpen,
  setIsDialogOpen,
}) => {
  const [matricNumber, setMatricNumber] = useState("");
  const roomMutation = api.bid.bidRoom.useMutation();
  const { data: user, refetch: refetchUser } = api.user.getUser.useQuery(
    { matricNumber },
    { enabled: false },
  );

  const {
    data: highestUnoccupiedPoints,
    refetch: refetchHighestUnoccupiedPoints,
  } = api.user.getHighestUnoccupiedPoints.useQuery();

  const handleSubmitBid = async () => {
    // Refetch the user data
    const { data: refetchedUser } = await refetchUser();
    const { data: refetchedHighestUnoccupiedPoints } =
      await refetchHighestUnoccupiedPoints();
    if (!refetchedUser) {
      toast.error("User not found");
      return;
    }

    if (refetchedUser.occupies) {
      toast.error("User already occupies a room");
      return;
    }

    if (refetchedUser.genderId !== room?.genderId) {
      toast.error(
        `${
          refetchedUser.gender.description
        } user cannot choose a ${room?.gender.description.toLowerCase()} room`,
      );
      return;
    }

    if (refetchedHighestUnoccupiedPoints === undefined) {
      toast.error("Failed to fetch highest unoccupied points");
      return;
    }

    if (refetchedUser.points < refetchedHighestUnoccupiedPoints) {
      toast.error("Please wait for your turn.");
      return;
    }
    // Bid the room
    await roomMutation.mutate({
      userId: refetchedUser?.id,
      roomId: room?.id as number,
    });

    if (roomMutation.isSuccess) {
      console.log(roomMutation.data);
      toast.success("Bid successfully submitted!");
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      defaultOpen={false}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onCloseAutoFocus={() => setIsDialogOpen(false)}
      >
        <DialogHeader onClick={() => setIsDialogOpen(false)}>
          <DialogTitle>{`Bid for room ${getString(room)}`}</DialogTitle>
          <DialogDescription>
            Are you sure you want to bid for this room?
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="matricNumber">Matric Number</Label>
        <Input
          id="matricNumber"
          value={matricNumber}
          onChange={(e) => setMatricNumber(e.target.value)}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => setIsDialogOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmitBid} type="submit">
            Submit bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BidModal;
