/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0asPptlqFe5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { MailPlusIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
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
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";

export default function Component() {
  const { isSuccess, data } = api.user.getAllUsers.useQuery();

  const sendEmail = api.email.sendEmailtoUser.useMutation();
  const resetBids = api.user.resetBids.useMutation();

  if (!isSuccess) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col">
        <main className="w-full flex-1 p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
              <p className="text-muted-foreground">
                Here's a quick overview of this current room bidding exercise
              </p>
            </div>
            {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <TooltipProvider>
                    <div className="text-sm font-medium">Total Users</div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MailIcon className="h-6 w-6 text-muted-foreground" />
                          <span className="sr-only">
                            Send Signin Email To User
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send Signin Email To User</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <TooltipProvider>
                    <div className="text-sm font-medium">Active Users</div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <RefreshCwIcon className="h-6 w-6 text-muted-foreground" />
                          <span className="sr-only">
                            Reset Bids for this User
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Reset Bids for this User</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">987</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="text-sm font-medium">New Users</div>
                  <UserPlusIcon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">123</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="text-sm font-medium">Pending Users</div>
                  <UserMinusIcon className="h-6 w-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                </CardContent>
              </Card>
            </div> */}
            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((user) => {
                      return (
                        <TableRow>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.matricNumber}</TableCell>
                          <TableCell>{user.points}</TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      sendEmail.mutate(user.nusNetId)
                                    }
                                  >
                                    <MailPlusIcon className="h-4 w-4" />
                                    <span className="sr-only">
                                      Send Signin Email To User
                                    </span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Send Signin Email To User
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      resetBids.mutate(user.id, {
                                        onSuccess: () => {
                                          toast({
                                            title: "Successfully Reset Bids!",
                                            description: `Resetting Bids for ${user.name}`,
                                          });
                                        },
                                      })
                                    }
                                  >
                                    <RefreshCwIcon className="h-4 w-4" />
                                    <span className="sr-only">
                                      Reset Bids for this User
                                    </span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Reset Bids for this User
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
