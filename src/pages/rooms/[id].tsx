import { useParams } from "next/navigation";
import { api } from "~/utils/api";

export default function Room() {
  const id = useParams().id as string;
  console.log(id);

  const room = api.room.getRoomById.useQuery(id);

  console.log(room.data);
  return (
    <div>
      <h1>Room</h1>
    </div>
  );
}
