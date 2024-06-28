import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hashandSlice } from "~/utils/uuid";

export const userRouter = createTRPCRouter({
  getUserByHash: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const users = await ctx.db.user.findMany();

      users.forEach((user) => {
        console.log(hashandSlice(user.nusNetId));
      });

      const user =
        users.find((user) => hashandSlice(user.nusNetId) === input) ?? null;
      console.log(user);

      return user;
    }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();
    return users;
  }),

  getBids: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.db.bid.findMany({
      where: {
        userId: input,
      },
      include: {
        room: true,
        user: true,
      },
      orderBy: {
        rank: "asc",
      },
    });
  }),

  bidForRoom: publicProcedure
    .input(
      z.object({
        userId: z.number(),
        roomId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingbid = await ctx.db.bid.findFirst({
        where: {
          userId: input.userId,
          roomId: input.roomId,
        },
      });

      if (existingbid != null) {
        throw new Error("You have already bidded for this room");
      }

      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      const room = await ctx.db.room.findUnique({
        where: {
          id: input.roomId,
        },
      });

      if (user!.gender != room!.gender) {
        throw new Error("Wrong Gender");
      }

      const rank = (await ctx.db.bid.count()) + 1;

      return ctx.db.bid.create({
        data: {
          userId: input.userId,
          roomId: input.roomId,
          rank,
        },
      });
    }),

  // listUsers: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.user.findMany({
  //     include: {
  //       gender: {
  //         select: {
  //           description: true,
  //         },
  //       },
  //       occupies: true,
  //     },
  //     orderBy: {
  //       points: "desc",
  //     },
  //   });
  // }),

  // getHighestUnoccupiedPoints: publicProcedure.query(async ({ ctx }) => {
  //   const user = await ctx.db.user.findFirst({
  //     where: {
  //       occupies: null,
  //     },
  //     orderBy: {
  //       points: "desc",
  //     },
  //   });

  //   return user ? user.points : 0;
  // }),

  // getUser: publicProcedure
  //   .input(z.object({ matricNumber: z.string() }))
  //   .query(({ ctx, input }) => {
  //     return ctx.db.user.findFirst({
  //       where: {
  //         matricNumber: input.matricNumber,
  //       },
  //       include: {
  //         gender: {
  //           select: {
  //             description: true,
  //           },
  //         },
  //         occupies: true,
  //       },
  //     });
  //   }),
  // getUsersByPoints: publicProcedure
  //   .input(z.object({ points: z.number().min(0) }))
  //   .query(async ({ ctx, input }) => {
  //     const users = await ctx.db.user.findMany({
  //       where: {
  //         points: input.points,
  //       },
  //       select: {
  //         name: true,
  //       },
  //     });

  //     return users.map((user) => user.name);
  //   }),
  // createUser: publicProcedure
  //   .input(
  //     z.object({
  //       name: z.string().min(1),
  //       genderId: z.number().min(1).max(2),
  //       points: z.number().min(0),
  //       matricNumber: z.string().min(1),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.user.create({
  //       data: {
  //         name: input.name,
  //         genderId: input.genderId,
  //         points: input.points,
  //         matricNumber: input.matricNumber,
  //       },
  //     });
  //   }),
});
