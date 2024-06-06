import { Block } from "@prisma/client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { RouterOutputs } from "~/utils/api";
import { generateUUID } from "~/utils/uuid";
import BidModal from "./BidModal";
type Room = RouterOutputs["room"]["getRoom"];

type RoomCardProps = {
  block: Block;
  unit: number;
  roomset: Map<string, Room>;
};

// const getRoomType = (room: Room) => {
//   if (room == null) {
//     return "Unknown";
//   }
//   let result = "";
//   result += room?.genderId == 1 ? "M" : "F";
//   result += room?.isDouble ? "D" : "S";
//   return result;
// };
//
export const getString = (room: Room) => {
  return room?.roomType == "Double"
    ? `${room?.block.substring(1, 2)}-${room?.unit}-${room?.index}`
    : `${room?.block.substring(1, 2)}-${room?.unit}`;
};

export default function RoomCard({ block, unit, roomset }: RoomCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  let room = roomset.get(generateUUID(block, unit)) as Room;

  if (room == null) {
    room = {
      id: "123123123",
      block: block,
      unit: unit,
      gender: "Male",
      roomType: "Single",
      createdAt: new Date(),
      updatedAt: new Date(),
      occupantId: 0,
      index: 1,
    };
  }

  // const room = rooms?.find((room) => room?.name === roomNumber) || null;
  return (
    <BidModal
      room={room}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      key={room?.id}
    >
      <Button
        className="flex h-16 min-h-[64px] w-20 min-w-[80px] flex-col px-2 py-1 text-xs"
        // disabled={room?.occupant ? true : false}
        onClick={() => setIsDialogOpen(true)}
      >
        <span className="text-sm">{getString(room)}</span>
        {/* <span>{room?.gender}</span> */}
        <span>Male</span>
        {/* <span className="font-bold">{room?.occupant?.name}</span> */}
      </Button>
    </BidModal>
  );
}
