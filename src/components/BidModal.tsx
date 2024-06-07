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
import { RouterOutputs, api } from "~/utils/api";
import { getString } from "./RoomCard";
import { LinkWithQP } from "./ui/link";
import { toast } from "./ui/use-toast";

type Room = RouterOutputs["room"]["getRoom"];

type BidModalProps = {
  isDouble: boolean;
  room: NonNullable<Room>;
  room2: Room
  children: ReactNode;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BidModal: React.FC<BidModalProps> = ({
  room,
  room2,
  children,
  isDialogOpen,
  setIsDialogOpen,
  isDouble = false,
}) => {
  const bidRoom = api.user.bidForRoom.useMutation();
  const handleSubmitBid = async () => {
    bidRoom.mutate(
      {
        userId: 1,
        roomId: currentRoom.id,
      },
      {
        onSuccess: () => {
          toast({
            title: "Room Successfully Bidded!",
            description: `You have successfully bidded for room ${getString(room)}`,
            action: (
              <Button>
                <LinkWithQP href="/ranking">rank</LinkWithQP>
              </Button>
            ),
          });
        },
        onError: (e) => {
          toast({
            title: "Failed to bid for room",
            description: e.message,
          });
        },
      },
    );
    setIsDialogOpen(false);
    // TODO add Toast
  };

  const [currentRoom, setCurrentRoom] = useState<NonNullable<Room>>(room);

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
      {roomModal(currentRoom, setIsDialogOpen,handleSubmitBid)}
      </DialogContent>
    </Dialog>
  );
};

const roomModal = (room: Room,setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>, handleSubmitBid: () => Promise<void>) => {
  return (
    <>
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
    </>
  )}

export default BidModal;
