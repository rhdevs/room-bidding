import { Avatar } from "@radix-ui/react-avatar";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { type RouterOutputs, api } from "~/utils/api";
import { getString } from "./RoomCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { LinkWithQP } from "./ui/link";
import { toast } from "./ui/use-toast";

type Room = RouterOutputs["room"]["getRoom"];

type BidModalProps = {
  room: NonNullable<Room>;
  room2: Room;
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
}) => {
  const bidRoom = api.user.bidForRoom.useMutation();
  const handleSubmitBid = async (room: Room) => {
    if (!room) return;

    bidRoom.mutate(
      {
        userId: 1,
        roomId: room.id ?? "",
      },
      {
        onSuccess: () => {
          toast({
            title: "Room Successfully Bidded!",
            description: `You have successfully bidded for room ${getString(
              room,
            )}`,
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

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      defaultOpen={false}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="sm:max-w-[600px]"
        onCloseAutoFocus={() => setIsDialogOpen(false)}
      >
        {room2 != null ? (
          <Carousel className="relative">
            <CarouselContent>
              <CarouselItem>
                <RoomModal
                  room={room}
                  setIsDialogOpen={setIsDialogOpen}
                  handleSubmitBid={handleSubmitBid}
                ></RoomModal>
              </CarouselItem>
              <CarouselItem>
                <RoomModal
                  room={room2}
                  setIsDialogOpen={setIsDialogOpen}
                  handleSubmitBid={handleSubmitBid}
                ></RoomModal>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-80px] top-1/2 z-10 -translate-y-1/2">
              <ChevronLeftIcon className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </CarouselPrevious>
            <CarouselNext className="absolute right-[-80px] top-1/2 z-10 -translate-y-1/2">
              <ChevronRightIcon className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </CarouselNext>
          </Carousel>
        ) : (
          <RoomModal
            room={room}
            setIsDialogOpen={setIsDialogOpen}
            handleSubmitBid={handleSubmitBid}
          ></RoomModal>
        )}
      </DialogContent>
    </Dialog>
  );
};

type RoomModalProps = {
  room: NonNullable<Room>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitBid: (room: Room) => Promise<void>;
};

const RoomModal = ({
  room,
  setIsDialogOpen,
  handleSubmitBid,
}: RoomModalProps) => {
  const fullRoom = api.room.getBids.useQuery(room.id);
  return (
    <>
      {/* <Label htmlFor="matricNumber">Matric Number</Label> */}
      {/* <Input
          id="matricNumber"
          value={matricNumber}
          onChange={(e) => setMatricNumber(e.target.value)}
        /> */}

      <DialogHeader>
        <DialogTitle>Bid on Room {getString(room)}</DialogTitle>
        <DialogDescription>Current occupant: Jane Doe</DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Current Bid
            </div>
            <div className="font-medium">500 points</div>
          </div>
          {/* <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Points Needed to Beat
            </div>
            <div className="font-medium">501 points</div>
          </div> */}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Bids</CardTitle>
          </CardHeader>
          <CardContent className="grid max-h-[300px] gap-4 overflow-auto">
            {fullRoom.isSuccess ? (
              fullRoom.data.length != 0 ? (
                fullRoom.data.map((bid, index) => {
                  return CurrentBidRow(index, bid);
                })
              ) : (
                <div>No Bids Yet</div>
              )
            ) : (
              <div>Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          className="mr-auto"
          onClick={() => setIsDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmitBid(room)}>Bid Room</Button>
      </DialogFooter>
    </>
  );
};

export default BidModal;

function CurrentBidRow(
  index: number,
  bid: {
    name: string;
    points: number;
    bidType: "anotherRoom" | "winningBid" | "lowBid";
  },
): React.JSX.Element {
  const mappings = {
    anotherRoom: {
      titleText: "Has Another Room",
      titleTextColor: "text-red-500",
    },
    winningBid: {
      titleText: "Current Winning Bid",
      titleTextColor: "text-green-500",
    },
    lowBid: {
      titleText: "Waiting List",
      titleTextColor: "text-gray-500",
    },
  } as const;
  return (
    <div className="flex items-center justify-between" key={index}>
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 border">
          <img src="/placeholder.svg" alt="Avatar" />
        </Avatar>
        <div>
          <div className="font-medium">{bid.name}</div>
          <div className={`text-sm ${mappings[bid.bidType].titleTextColor}`}>
            {mappings[bid.bidType].titleText}
          </div>
        </div>
      </div>
      <div className="text-sm font-medium">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {bid.points} points
        </div>
        {/* <span className="text-gray-500 dark:text-gray-400">{bid.bidType}</span> */}
      </div>
    </div>
  );
}
