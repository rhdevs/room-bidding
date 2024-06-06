import { Resend } from "resend";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "./../../../env";

const resend = new Resend(env.RESEND_API_KEY);

export const emailRouter = createTRPCRouter({
  test: publicProcedure.input(z.string()).query(() => {
    return resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["czyang2002@gmail.com"],
      subject: "Hello World",
      html: "<strong>It works!</strong>",
    });
  }),
  sendAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();

    const userdata = users.map((user) => {});
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
