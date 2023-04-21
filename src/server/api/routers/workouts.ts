import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const workoutsRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.workout.findMany();
  }),
});
