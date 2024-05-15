import { Block } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// import type { Block } from "@prisma/client";
export const roomRouter = createTRPCRouter({
  // listRooms: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.room.findMany({
  //     include: {
  //       occupant: true,
  //       gender: {
  //         select: {
  //           description: true,
  //         },
  //       },
  //     },
  //   });
  // }),
  listRoomsByBlock: publicProcedure
    .input(z.custom<Block>())
    .query(({ ctx, input }) => {
      return ctx.db.room.findMany({
        where: {
          block: input,
        },
      });
    }),

  // getRoom: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.room.findFirst({
  //       where: {
  //         id: input.id,
  //       },
  //       include: {
  //         occupant: true,
  //         gender: {
  //           select: {
  //             description: true,
  //           },
  //         },
  //       },
  //     });
  //   }),
});
