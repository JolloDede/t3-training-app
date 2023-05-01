import { createTRPCRouter } from "~/server/api/trpc";
import { workoutsRouter } from "./routers/workouts";
import { exercisesRouter } from "./routers/exercises";
import { musclesRouter } from "./routers/muscles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  workouts: workoutsRouter,
  exercises: exercisesRouter,
  muscles: musclesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
