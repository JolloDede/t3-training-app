import { Prisma } from "@prisma/client";
import { string, z } from "zod";

import { adminProcedure, createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const muscleUsageSchema = z.object({
  id: z.string(),
  usage: z.number(),
}).array();

export type MuscleUsage = {
  id: string;
  name: string;
  usage: number;
}

export const exercisesRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(280),
        muscles: muscleUsageSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser.id;

      // Todo add ratelimit
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      console.log("hallo")

      const exercise = await ctx.prisma.exercise.create({
        data: {
          name: input.name,
          muscles: {
            create: input.muscles.map(muscle => {
              return {
                muscleId: muscle.id,
                usage: muscle.usage
              }
            })
          }
        },
      });

      return exercise;
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

      const exercise = await ctx.prisma.exercise.delete({
        where: {
          id: input.id,
        },
      });

      return exercise;
    }),
});
