import { type Block } from "@prisma/client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { type RouterOutputs } from "~/utils/api";
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
  let room = roomset.get(generateUUID(block, unit, 1)) as Room;
  const secondroom = roomset.get(generateUUID(block, unit, 2)) as Room;

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
  if (secondroom != undefined) {
    console.log(secondroom);
  }

  return (
    <BidModal
      room={room}
      room2={secondroom}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      key={room?.id}
    >
      <Button
        className={`${mappings[room?.gender]?.Single} flex h-16 min-h-[64px] w-20 min-w-[80px] flex-col px-2 py-1 text-xs outline outline-[2px] outline-offset-2`}
        // disabled={room?.occupant ? true : false}
        onClick={() => setIsDialogOpen(true)}
      >
        <span className="text-sm">{room.unit}</span>
        {/* <span>{room?.gender}</span> */}
        <span>{secondroom == undefined ? "Single" : "Double"}</span>
        {/* <span className="font-bold">{room?.occupant?.name}</span> */}
      </Button>
    </BidModal>
  );
}

const mappings = {
  Male: {
    Single: "bg-cyan-950 outline-orange-400",
    Double: "bg-orange-950 outline-cyan-400",
  },
  Female: {
    Single: "bg-fuchsia-950 outline-cyan-400",
  },
};
