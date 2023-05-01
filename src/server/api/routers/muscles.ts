import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const musclesRouter = createTRPCRouter({

  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.muscle.findMany();
  }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser.id;

      // Todo add ratelimit
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const muscle = await ctx.prisma.muscle.create({
        data: {
          name: input.name,
        },
      });

      return muscle;
    }),

    delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const authorId = ctx.currentUser.id;

      // Todo add ratelimit
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const muscle = await ctx.prisma.muscle.delete({
        where: {
          id: input.id,
        },
      });

      return muscle;
    }),
});
