import React from "react";
import { api } from "~/utils/api";

const QueuePage: React.FC = () => {
  const { data: rooms } = api.room.listRoomsByBlock.useQuery("B2");
  console.log(rooms);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {JSON.stringify(rooms)}
    </div>
  );
};

export default QueuePage;
