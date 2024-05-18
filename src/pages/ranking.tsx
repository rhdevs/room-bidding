import React from "react";
import { api } from "~/utils/api";

import { ArrowDown, ArrowUp, X } from "lucide-react";
import { getString } from "~/components/RoomCard";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const QueuePage: React.FC = () => {
  const { data, isSuccess, isLoading, isFetching } =
    api.user.getBids.useQuery(1);
  const increasePriority = api.bid.increasePriority.useMutation();
  const decreasePriority = api.bid.decreasePriority.useMutation();
  const deleteBid = api.bid.deleteBid.useMutation();
  const utils = api.useUtils();

  if (isFetching) return <div>Loading...</div>;
  console.log(isFetching);

  const biddelete = (id: string) => {
    deleteBid.mutate(id, {
      onSuccess: () => {
        console.log("success");
        utils.user.getBids.invalidate();
      },
    });
  };
  const increaseP = (id: string) => {
    increasePriority.mutate(id, {
      onSuccess: () => {
        console.log("success");
        utils.user.getBids.invalidate();
      },
    });
  };

  const decreaseP = async (id: string) => {
    await decreasePriority.mutateAsync(id, {
      onSuccess: () => {
        console.log("success");
        utils.user.getBids.invalidate();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking</CardTitle>
        <CardDescription>Rank your room in order of preference</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead> */}
              <TableHead>Room</TableHead>
              <TableHead>Double?</TableHead>
              <TableHead>Projected Highest Bid</TableHead>
              <TableHead className="hidden md:table-cell">
                Projected Occupant
              </TableHead>
              <TableHead className="hidden md:table-cell">Ranking</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          {data &&
            data.map((bid) => {
              return (
                <TableBody>
                  <TableRow>
                    {/* <TableCell className="hidden sm:table-cell"> */}
                    {/* <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/placeholder.svg"
                  width="64"
                /> */}
                    {/* </TableCell> */}
                    <TableCell className="font-medium">
                      {getString(bid.room)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell>120</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Nicholas
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {bid.rank}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row">
                        <ArrowUp
                          className="cursor-pointer"
                          onClick={() => increaseP(bid.id)}
                        />
                        <ArrowDown
                          className="cursor-pointer"
                          onClick={() => decreaseP(bid.id)}
                        />
                        <X
                          className="cursor-pointer"
                          onClick={() => biddelete(bid.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing {data?.length} rankings
        </div>
      </CardFooter>
    </Card>
  );
};
export default QueuePage;
