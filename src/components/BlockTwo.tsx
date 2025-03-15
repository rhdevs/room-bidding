import React from "react";
import RoomCard from "~/components/RoomCard";
import { type RouterOutputs, api } from "~/utils/api";
import { generateUUID } from "~/utils/uuid";
import GrassPatch from "./GrassPatch";
import LevelCard from "./LevelCard";
import Pantry from "./Pantry";
import RFResidence from "./RFResidence";
import Stairs from "./Stairs";
import Toilet from "./Toilet";
type Room = RouterOutputs["room"]["getRoom"];

const Male = {
  int: 1,
  description: "Male",
};
const Female = {
  int: 2,
  description: "Female",
};

const BlockTwo: React.FC = () => {
  const { data: rooms } = api.room.listRoomsByBlock.useQuery("B2");
  //
  // console.log(rooms);
  // display columns of rooms
  if (rooms === undefined) {
    return <div>Loading...</div>;
  }

  const roomsset = new Map<string, NonNullable<Room>>();
  for (const room of rooms) {
    roomsset.set(generateUUID(room.block, room.unit, room.index), room);
  }

  return (
    <div className="flex gap-x-8 p-4">
      {/* Left column */}
      <div className="flex min-w-max gap-x-4">
        <div className="flex flex-col gap-y-1">
          <RoomCard block="B2" unit={309} key={309} roomset={roomsset} />
          <RoomCard block="B2" unit={308} key={308} roomset={roomsset} />
          <RoomCard block="B2" unit={307} key={307} roomset={roomsset} />
          <RoomCard block="B2" unit={306} key={306} roomset={roomsset} />
          <div className="h-full" />
          <LevelCard level="3.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Male" />
          <Stairs />
          <RoomCard block="B2" unit={305} key={305} roomset={roomsset} />
          <RoomCard block="B2" unit={304} key={304} roomset={roomsset} />
          <RoomCard block="B2" unit={303} key={303} roomset={roomsset} />
          <RoomCard block="B2" unit={302} key={302} roomset={roomsset} />
          <RoomCard block="B2" unit={301} key={301} roomset={roomsset} />
          <LevelCard level="3" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard block="B2" unit={209} key={209} roomset={roomsset} />
          <RoomCard block="B2" unit={208} key={208} roomset={roomsset} />
          <RoomCard block="B2" unit={207} key={207} roomset={roomsset} />
          <RoomCard block="B2" unit={206} key={206} roomset={roomsset} />
          <div className="h-full" />
          <LevelCard level="2.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Female" />
          <Stairs />
          <Pantry className="min-h-[128px]" />
          <RoomCard block="B2" unit={203} key={203} roomset={roomsset} />
          <RoomCard block="B2" unit={202} key={202} roomset={roomsset} />
          <RoomCard block="B2" unit={201} key={201} roomset={roomsset} />
          <LevelCard level="2" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard block="B2" unit={109} key={109} roomset={roomsset} />
          <RoomCard block="B2" unit={108} key={108} roomset={roomsset} />
          <RoomCard block="B2" unit={107} key={107} roomset={roomsset} />
          <RoomCard block="B2" unit={106} key={106} roomset={roomsset} />
          <div className="h-full" />
          <LevelCard level="1.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Male" />
          <Stairs />
          <RoomCard block="B2" unit={105} key={105} roomset={roomsset} />
          <RoomCard block="B2" unit={104} key={104} roomset={roomsset} />
          <RoomCard block="B2" unit={103} key={103} roomset={roomsset} />
          <RoomCard block="B2" unit={102} key={102} roomset={roomsset} />
          <RoomCard block="B2" unit={101} key={101} roomset={roomsset} />
          <LevelCard level="1" />
        </div>
      </div>
      {/* Middle Right Half */}
      <div className="flex-col space-y-2">
        <div className="flex gap-x-1">
          <RoomCard block="B2" unit={311} key={311} roomset={roomsset} />
          <RoomCard block="B2" unit={312} key={312} roomset={roomsset} />
          <RoomCard block="B2" unit={313} key={313} roomset={roomsset} />
          <RoomCard block="B2" unit={314} key={314} roomset={roomsset} />
          <RoomCard block="B2" unit={315} key={315} roomset={roomsset} />
          <RoomCard block="B2" unit={316} key={316} roomset={roomsset} />
          <div className="w-full" />
          <LevelCard level="3" className="h-16" />
        </div>
        <div className="flex gap-x-1">
          <div className="w-[500px]" />
          <RoomCard block="B2" unit={317} key={317} roomset={roomsset} />
          <RoomCard block="B2" unit={318} key={318} roomset={roomsset} />
          <RoomCard block="B2" unit={319} key={319} roomset={roomsset} />
          <RoomCard block="B2" unit={320} key={320} roomset={roomsset} />
          <LevelCard level="2.5" className="h-16" />
        </div>
        <div className="flex gap-x-1">
          <RoomCard block="B2" unit={211} key={211} roomset={roomsset} />
          <RoomCard block="B2" unit={212} key={212} roomset={roomsset} />
          <RoomCard block="B2" unit={213} key={213} roomset={roomsset} />
          <RoomCard block="B2" unit={214} key={214} roomset={roomsset} />
          <RoomCard block="B2" unit={215} key={215} roomset={roomsset} />
          <RoomCard block="B2" unit={216} key={216} roomset={roomsset} />
          <Stairs className="h-16" />
          <Toilet gender="Female" />
          <div className="w-full" />
          <LevelCard level="2" className="h-16" />
        </div>
        <div className="flex gap-x-1">
          <div className="w-[500px]" />
          <RoomCard block="B2" unit={217} key={217} roomset={roomsset} />
          <RoomCard block="B2" unit={218} key={218} roomset={roomsset} />
          <RoomCard block="B2" unit={219} key={219} roomset={roomsset} />
          <RoomCard block="B2" unit={220} key={220} roomset={roomsset} />
          <LevelCard level="1.5" className="h-16" />
        </div>
        <div className="flex gap-x-1">
          <RoomCard block="B2" unit={111} key={111} roomset={roomsset} />
          <RoomCard block="B2" unit={112} key={112} roomset={roomsset} />
          <RoomCard block="B2" unit={113} key={113} roomset={roomsset} />
          <RoomCard block="B2" unit={114} key={114} roomset={roomsset} />
          <RoomCard block="B2" unit={115} key={115} roomset={roomsset} />
          <RoomCard block="B2" unit={116} key={116} roomset={roomsset} />
          <Stairs className="h-16" />
          <Toilet gender="Male" />
          <div className="w-full" />
          <LevelCard level="1" className="h-16" />
        </div>
        <div className="flex">
          <GrassPatch className="h-72 w-[500px]" />
          <RFResidence className="h-40 w-[340px]" />
        </div>
      </div>
    </div>
  );
};

export default BlockTwo;
