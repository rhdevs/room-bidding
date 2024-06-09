import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const validateBids = async (
  id: number,
  db: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
) => {
  const bids = await db.bid
    .findMany({
      where: {
        userId: id,
      },
    })
    .then((bid) => {
      return bid.map((bid) => bid.rank).sort();
    });

  for (let i = 0; i < bids.length; i++) {
    if (bids[i] != i + 1) {
      return false;
    }
  }

  console.log(bids);

  return true;
};

export const bidRouter = createTRPCRouter({
  deleteBid: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (db) => {
        const bid = await db.bid.findUniqueOrThrow({
          where: {
            id: input,
          },
        });
        await db.bid.delete({
          where: {
            id: bid.id,
          },
        });
        await db.bid.updateMany({
          where: {
            rank: {
              gt: bid.rank,
            },
            userId: bid.userId,
          },
          data: {
            rank: {
              decrement: 1,
            },
          },
        });
        if (!(await validateBids(bid.userId, db))) {
          throw new Error("Something wrong with the bids");
        }
      });
    }),
  increasePriority: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.$transaction(async (db) => {
        const initialbid = await db.bid.findUniqueOrThrow({
          where: {
            id: input,
          },
        });

        const nextbid = await db.bid.findFirstOrThrow({
          where: {
            rank: initialbid.rank - 1,
            userId: initialbid.userId,
          },
        });
        await db.bid.update({
          where: {
            id: initialbid.id,
          },
          data: {
            rank: initialbid.rank - 1,
          },
        });
        await db.bid.update({
          where: {
            id: nextbid.id,
          },
          data: {
            rank: nextbid.rank + 1,
          },
        });
        if (!(await validateBids(initialbid.userId, db))) {
          throw new Error("Something wrong with the bids");
        }
      });
    }),
  decreasePriority: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.$transaction(async (db) => {
        const initialbid = await db.bid.findUniqueOrThrow({
          where: {
            id: input,
          },
        });

        const nextbid = await db.bid.findFirstOrThrow({
          where: {
            rank: initialbid.rank + 1,
            userId: initialbid.userId,
          },
        });
        await db.bid.update({
          where: {
            id: initialbid.id,
          },
          data: {
            rank: initialbid.rank + 1,
          },
        });
        await db.bid.update({
          where: {
            id: nextbid.id,
          },
          data: {
            rank: nextbid.rank - 1,
          },
        });
        if (!(await validateBids(initialbid.userId, db))) {
          throw new Error("Something wrong with the bids");
        }
      });
    }),
});

// hello: publicProcedure
//   .input(z.object({ text: z.string() }))
//   .query(({ input }) => {
//     return {
//       greeting: `Hello ${input.text}`,
//     };
//   }),

// create: publicProcedure
//   .input(z.object({ name: z.string().min(1) }))
//   .mutation(async ({ ctx, input }) => {
//     // simulate a slow db call
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     return ctx.db.post.create({
//       data: {
//         name: input.name,
//       },
//     });
//   }),

// getLatest: publicProcedure.query(({ ctx }) => {
//   return ctx.db.post.findFirst({
//     orderBy: { createdAt: "desc" },
//   });
// }),
