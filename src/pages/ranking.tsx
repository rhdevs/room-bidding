import React from "react";
import { api } from "~/utils/api";

import { ArrowDown, ArrowUp, X } from "lucide-react";
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
import { Separator } from "~/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
              <TableHead>Actions</TableHead>
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
                    {badgeMapping[bid.room.roomType]}
                    </TableCell>
                    <TableCell>120</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Nicholas
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {bid.rank}
                    </TableCell>
                    <TableCell>
                      <TooltipProvider delayDuration={150}>
                        <div className="flex flex-row">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                // disabled={!mail}
                              >
                                <ArrowUp
                                  className="cursor-pointer"
                                  onClick={() => increaseP(bid.id)}
                                />
                                <span className="sr-only">Rank Higher</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Rank Higher</TooltipContent>
                          </Tooltip>
                          <Separator
                            orientation="vertical"
                            className="mx-1 h-10"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                // disabled={!mail}
                              >
                                <ArrowDown
                                  className="cursor-pointer"
                                  onClick={() => decreaseP(bid.id)}
                                />
                                <span className="sr-only">Rank Lower</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Rank Lower</TooltipContent>
                          </Tooltip>
                          <Separator
                            orientation="vertical"
                            className="mx-1 h-10"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                // disabled={!mail}
                              >
                                <X
                                  className="cursor-pointer"
                                  onClick={() => biddelete(bid.id)}
                                />
                                <span className="sr-only">Delete Bid</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Delete Bid</TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
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


const badgeMapping = {
  Single: <Badge variant="outline" className="bg-blue-500">Single</Badge>,
  Double: <Badge variant="outline" className="bg-green-500" >Double</Badge>,
  SuperSingle: <Badge variant="outline" className="bg-sky-200">SuperSingle</Badge>,
}

