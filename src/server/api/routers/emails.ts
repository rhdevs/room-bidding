import { Resend } from "resend";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { hashandSlice } from "~/utils/uuid";
import { env } from "./../../../env";

const resend = new Resend(env.RESEND_API_KEY);

const initialMessage = async (id: string) => {
  console.log("asdasd")
  console.log(hashandSlice(id));
  return await resend.emails.create({
    from: "Acme <onboarding@resend.dev>",
    // to: [`${id}@u.nus.edu`],
    to: ["czyang2002@gmail.com"],
    subject: "Hello World",
    html: `<strong>
            This is your code for Room Bidding:
            <br />
            <a href={https://localhost:3000/?id=${hashandSlice(id)}}>https://localhost:3000/?id=${hashandSlice(id)}</a>
          </strong>`,
  });
};

export const emailRouter = createTRPCRouter({
  sendEmailtoUser: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const result = await initialMessage(input);
      console.log(result);
      return result;
    }),

  // sendAll: publicProcedure.query(async ({ ctx }) => {
  //   const users = await ctx.db.user.findMany();

  //   const userdata = users.map((user) => {});
  // }),
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
