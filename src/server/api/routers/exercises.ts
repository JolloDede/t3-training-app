import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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

  getConToWorkout: privateProcedure
    .input(
      z.object({
        workoutId: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const exercises = await ctx.prisma.exercisesInWorkouts.findMany({
        where: {
          workoutId: input.workoutId,
        },
        include: {
          exercise: true,
        }
      });

      return exercises;
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

      const exerciseInWorkout = await ctx.prisma.exercisesInWorkouts.findFirst({
        where: {
          exerciseId: input.id,
        }
      });
      if (exerciseInWorkout) throw new TRPCError({ code: "CONFLICT", message: "Exercise exists in Workout cant delete" })

      // must do that before deleting the exercise
      const deletRelation = await ctx.prisma.muscleUsagesInExercises.deleteMany({
        where: {
          exerciseId: input.id,
        }
      });

      const exercise = await ctx.prisma.exercise.delete({
        where: {
          id: input.id,
        },
      });

      return exercise;
    }),
});
