import React from "react";
import { api } from "~/utils/api";

const QueuePage: React.FC = () => {
  const { data: rooms } = api.room.listRoomsByBlock.useQuery("B2");
  console.log(rooms);

  const { data: room } = api.room.getRoom.useQuery({ block: "B2", unit: 101 });

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {JSON.stringify(rooms)}
      <br />
      {JSON.stringify(room)}
    </div>
  );
};

export default QueuePage;
