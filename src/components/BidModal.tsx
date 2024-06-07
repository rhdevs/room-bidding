import { Avatar } from "@radix-ui/react-avatar";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { ReactNode } from "react";
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
import { RouterOutputs, api } from "~/utils/api";
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
  isDouble: boolean;
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
        <Carousel className="relative">
          <CarouselContent>
            <CarouselItem>
              {roomModal(room, setIsDialogOpen, handleSubmitBid)}
            </CarouselItem>
            <CarouselItem>
              {roomModal(room2, setIsDialogOpen, handleSubmitBid)}
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-80px] top-1/2 -translate-y-1/2 z-10">
            <ChevronLeftIcon className="h-6 w-6" />
            <span className="sr-only">Previous</span>
          </CarouselPrevious>
          <CarouselNext className="absolute right-[-80px] top-1/2 -translate-y-1/2 z-10">
            <ChevronRightIcon className="h-6 w-6" />
            <span className="sr-only">Next</span>
          </CarouselNext>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

const roomModal = (
  room: Room,
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmitBid: () => Promise<void>,
) => {
  return (
    <div>
      {/* <Label htmlFor="matricNumber">Matric Number</Label> */}
      {/* <Input
          id="matricNumber"
          value={matricNumber}
          onChange={(e) => setMatricNumber(e.target.value)}
        /> */}

      <DialogHeader>
        <DialogTitle>Bid on Room</DialogTitle>
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
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Points Needed to Beat
            </div>
            <div className="font-medium">501 points</div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Bids</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 max-h-[300px] overflow-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="border w-8 h-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                </Avatar>
                <div>
                  <div className="font-medium">Jane Doe</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    500 points
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Current Bid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="border w-8 h-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                </Avatar>
                <div>
                  <div className="font-medium">John Bauer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    450 points
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Previous Bid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="border w-8 h-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                </Avatar>
                <div>
                  <div className="font-medium">Sarah Miller</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    400 points
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Previous Bid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="border w-8 h-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                </Avatar>
                <div>
                  <div className="font-medium">Michael Johnson</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    375 points
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Previous Bid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="border w-8 h-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                </Avatar>
                <div>
                  <div className="font-medium">Emily Michaels</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    350 points
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Previous Bid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="border w-8 h-8">
                  <img src="/placeholder.svg" alt="Avatar" />
                </Avatar>
                <div>
                  <div className="font-medium">Robert Davis</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    325 points
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Previous Bid
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <DialogFooter>
        <Button variant="outline" className="mr-auto">
          Cancel
        </Button>
        <Button>Bid Room</Button>
      </DialogFooter>
    </div>
  );
};

export default BidModal;
