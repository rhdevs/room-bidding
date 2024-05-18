import { MoreHorizontal } from "lucide-react";
import React from "react";
import { api } from "~/utils/api";

import { getString } from "~/components/RoomCard";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const QueuePage: React.FC = () => {
  const { data, isSuccess, refetch } = api.user.getBids.useQuery(1);
  const increasePriority = api.bid.increasePriority.useMutation();
  const decreasePriority = api.bid.decreasePriority.useMutation();
  const utils = api.useUtils();

  if (!isSuccess) return <div>Loading...</div>;

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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Button
                              onClick={() => decreaseP(bid.id)}
                              variant="ghost"
                            >
                              Decrease Priority
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              onClick={() => increaseP(bid.id)}
                              variant="ghost"
                            >
                              Increase Priority
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
