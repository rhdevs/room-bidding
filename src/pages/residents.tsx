import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useUser } from "~/hooks/useUser";

import { api } from "~/utils/api";

export default function Residents() {
  const { data: residents } = api.user.getAllUsers.useQuery();

  const user = useUser();

  if (!user.isSuccess) return <div>Loading...</div>;

  return (
    <div className="mx-8 mt-32 flex flex-col items-center justify-center bg-background">
      <h1 className="glow mb-12 text-center text-7xl font-bold text-primary  drop-shadow-md">
        <span className="text-5xl">Current Point in Queue:</span>
        <br />
        <span>{user.data!.points}</span>
      </h1>
      <Table>
        {/* <TableCaption></TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>MatricNumber</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Room Selected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {residents?.map((resident) => {
            const name = resident.name;
            const gender = resident.gender;
            const points = resident.points;
            const matricNumber = resident.matricNumber;
            return (
              <TableRow key={resident.id}>
                <TableCell className="font-bold">{name}</TableCell>
                <TableCell
                  className={gender === "Male" ? "bg-blue-300" : "bg-red-300"}
                >
                  {gender}
                </TableCell>
                <TableCell className="font-bold">{matricNumber}</TableCell>
                <TableCell
                  className={
                    points >= 100
                      ? "bg-green-300"
                      : points >= 80
                        ? "bg-gray-200"
                        : ""
                  }
                >
                  {points}
                </TableCell>
                <TableCell>
                  {/* {resident.occupies ? resident.occupies.name : "None"} */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
