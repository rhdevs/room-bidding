import React from "react";
import { api } from "~/utils/api";

const QueuePage: React.FC = () => {
  const { data: rooms, isSuccess } = api.email.test.useQuery("test");

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {JSON.stringify(rooms)}
    </div>
  );
};

export default QueuePage;
