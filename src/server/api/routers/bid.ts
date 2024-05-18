import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bidRouter = createTRPCRouter({
  increasePriority: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const initialbid = await ctx.db.bid.findUniqueOrThrow({
        where: {
          id: input,
        },
      });

      const nextbid = await ctx.db.bid.findFirstOrThrow({
        where: {
          rank: initialbid.rank - 1,
          userId: initialbid.userId,
        },
      });

      await ctx.db.$transaction([
        ctx.db.bid.update({
          where: {
            id: initialbid.id,
          },
          data: {
            rank: initialbid.rank - 1,
          },
        }),
        ctx.db.bid.update({
          where: {
            id: nextbid.id,
          },
          data: {
            rank: nextbid.rank + 1,
          },
        }),
      ]);
    }),

  decreasePriority: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const initialbid = await ctx.db.bid.findUniqueOrThrow({
        where: {
          id: input,
        },
      });

      const nextbid = await ctx.db.bid.findFirstOrThrow({
        where: {
          rank: initialbid.rank + 1,
          userId: initialbid.userId,
        },
      });

      await ctx.db.$transaction([
        ctx.db.bid.update({
          where: {
            id: initialbid.id,
          },
          data: {
            rank: initialbid.rank + 1,
          },
        }),
        ctx.db.bid.update({
          where: {
            id: nextbid.id,
          },
          data: {
            rank: nextbid.rank - 1,
          },
        }),
      ]);
    }),

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
});
