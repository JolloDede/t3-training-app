import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const exerciseRepsSchema = z.object({
  exerciseId: z.string(),
  repetitions: z.number().min(1).max(100),
}).array();

export interface ExerciseReps {
  exerciseId: string;
  repetitions: number;
}

export const workoutsRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.workout.findMany({
      where: {
        userId: ctx.currentUser.id
      },
    });
  }),

  get: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const workout = await ctx.prisma.workout.findFirst({
        where: {
          id: input.id,
        }
      });

      return workout;
    }),

  getWholeWorkout: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const workout = await ctx.prisma.workout.findFirst({
        where: {
          id: input.id,
        },
        include: {
          exercises: {
            include: {
              exercise: true,
            }
          }
        }
      });

      return workout;
    }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(280),
        exerciseReps: exerciseRepsSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser.id;

      // Todo add ratelimit
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const exercise = await ctx.prisma.workout.create({
        data: {
          userId: authorId,
          name: input.name,
          exercises: {
            create: input.exerciseReps.map(exerciseRep => {
              return {
                exerciseId: exerciseRep.exerciseId,
                repetitions: exerciseRep.repetitions,
              }
            })
          }
        },
      });

      return exercise;
    }),

  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(280),
        exerciseReps: exerciseRepsSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser.id;

      // Todo add ratelimit
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const workout = await ctx.prisma.workout.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });

      // Clear all exercises not tracking which i deleted in the frontend
      await ctx.prisma.exercisesInWorkouts.deleteMany({
        where: {
          workoutId: input.id,
        }
      });

      // create all the exercise repetitions
      await ctx.prisma.exercisesInWorkouts.createMany({
        data: input.exerciseReps.map(exerciseRep => {
          return {
            exerciseId: exerciseRep.exerciseId,
            repetitions: exerciseRep.repetitions,
            workoutId: input.id,
          }
        })
      });

      return workout;
    }),

  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUser.id;

      // Todo add ratelimit
      // const { success } = await ratelimit.limit(authorId);
      // if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      // must do that before deleting the exercise
      const deletRelation = await ctx.prisma.exercisesInWorkouts.deleteMany({
        where: {
          workoutId: input.id,
        }
      });

      const workout = await ctx.prisma.workout.delete({
        where: {
          id: input.id,
        },
      });

      return workout;
    }),
});
