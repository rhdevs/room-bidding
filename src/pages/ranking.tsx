import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

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
  DropdownMenuLabel,
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
import { useUser } from "./_app";

const QueuePage: React.FC = () => {
  // const { data } = useUser();

  const { data, isSuccess } = api.user.getBids.useQuery(1);

  if (!isSuccess) return <div>Loading...</div>;
  if (data == null) return <div>No DATA</div>;

  console.log(data);

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
          {data.map((bid) => {
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
                  <TableCell className="font-medium">2-102</TableCell>
                  <TableCell>
                    <Badge variant="outline">Active</Badge>
                  </TableCell>
                  <TableCell>120</TableCell>
                  <TableCell className="hidden md:table-cell">
                    Nicholas
                  </TableCell>
                  <TableCell className="hidden md:table-cell">1</TableCell>
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
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
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};
export default QueuePage;
