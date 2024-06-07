import React from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";

const QueuePage: React.FC = () => {
  // const { data: rooms, isSuccess } = api.email.test.useQuery("test");
  const mutation = api.email.sendEmailtoUser.useMutation();
  // if (!isSuccess) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Button onClick={() => mutation.mutate("e1123255")}>Test</Button>
    </div>
  );
};

export default QueuePage;
