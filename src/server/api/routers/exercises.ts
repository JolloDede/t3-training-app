import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const exercisesRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.exercise.findMany();
  }),
});
