import { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import RoomCard from "~/components/RoomCard";
import React from "react";
import GrassPatch from "./GrassPatch";
import LevelCard from "./LevelCard";
import Toilet from "./Toilet";
import Stairs from "./Stairs";
type Room = RouterOutputs["room"]["getRoom"];

const Male = {
  int: 1,
  description: "Male",
};
const Female = {
  int: 2,
  description: "Female",
};
const room6 = {
  id: 6,
  occupantId: 6,
  name: "3-106",
  isDouble: false,
  createdAt: new Date(2020, 12, 10),
  updatedAt: new Date(2020, 12, 11),
  gender: Male,
  genderId: 1,
  occupant: null,
};

const room7 = {
  id: 7,
  occupantId: 7,
  name: "3-107",
  isDouble: true,
  createdAt: new Date(2020, 12, 10),
  updatedAt: new Date(2020, 12, 11),
  gender: Male,
  genderId: 2,
  occupant: null,
};

const femaleSingle = {
  id: 8,
  occupantId: null,
  name: "3-308",
  isDouble: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  gender: Female,
  genderId: 2,
  occupant: null,
};
const BlockThree: React.FC = () => {
  const { data: rooms } = api.room.listRoomsByBlock.useQuery("B3");
  // display columns of rooms
  console.log(rooms);
  
  const roomsset = new Map<string, NonNullable<Room>>();

  for (const room of rooms) {
    roomsset.set(generateUUID(room.block, room.unit, room.index), room);
  }

  return (
    <div className="flex gap-x-5 p-4">
      {/* Left column */}
      <div className="flex min-w-max gap-x-4">
        <div className="flex flex-col gap-y-1">
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <div className="h-full" />
          <LevelCard level="3.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Female" />
          <Stairs />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <LevelCard level="3" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <div className="h-full" />
          <LevelCard level="2.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Female" />
          <Stairs />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <LevelCard level="2" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <div className="h-full" />
          <LevelCard level="1.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Male" />
          <Stairs />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <RoomCard block="B3" unit={301} key={301} roomset={roomsset} />
          <LevelCard level="1" />
        </div>
      </div>
      {/* Middle */}
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-x-1">
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
        </div>
        <div className="flex gap-x-1">
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
        </div>
        <div className="flex gap-x-1">
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
        </div>
        <GrassPatch className="h-[340px]" />
      </div>
      {/* Right Column */}
      <div className="flex gap-x-4">
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Male" />
          <Stairs />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <LevelCard level="1" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <div className="h-full" />
          <LevelCard level="1.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Female" />
          <Stairs />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <LevelCard level="2" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <div className="h-full" />
          <LevelCard level="2.5" />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="h-full" />
          <Toilet gender="Male" />
          <Stairs />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <LevelCard level="3" />
        </div>
        <div className="flex flex-col gap-y-1">
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <RoomCard rooms={rooms} roomNumber="3-XYZ" />
          <div className="h-full" />
          <LevelCard level="3.5" />
        </div>
      </div>
    </div>
  );
};

export default BlockThree;
