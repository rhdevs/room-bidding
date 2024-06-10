import { Block } from "@prisma/client";
import { z } from "zod";
import { generateUUID } from "~/utils/uuid";

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

  getRoom: publicProcedure
    .input(z.object({ unit: z.number(), block: z.custom<Block>() }))
    .query(({ ctx, input }) => {
      const { block, unit } = input;
      const hash = generateUUID(block, unit);

      return ctx.db.room.findUnique({
        where: {
          id: hash,
        },
      });
    }),

  getBids: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const bids = (await ctx.db.room.findFirst({
      where: {
        id: input,
      },
      include: {
        Bid: {
          include: {
            user: true,
          },
        },
      },
    }))!.Bid;

    return bids
      .map((bid) => {
        return {
          name: bid.user.name,
          points: bid.user.points,
          // TODO
          bidType: "anotherRoom",
        } as const;
      })
      .sort((a, b) => b.points - a.points);
  }),

  getRoomById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.room.findUnique({
      where: {
        id: input,
      },
      include: {
        Bid: {
          include: {
            user: true,
          },
        },
      },
    });
  }),
});
