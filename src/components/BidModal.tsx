import React, { ReactNode, use, useState } from "react";
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
  room: NonNullable<Room>;
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
  const bidRoom = api.user.bidForRoom.useMutation();
  const handleSubmitBid = async () => {
    bidRoom.mutate({
      userId: 1,
      roomId: room.id,
    });
    setIsDialogOpen(false);
    // TODO add Toast
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

        {/* <Label htmlFor="matricNumber">Matric Number</Label> */}
        {/* <Input
          id="matricNumber"
          value={matricNumber}
          onChange={(e) => setMatricNumber(e.target.value)}
        /> */}

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
