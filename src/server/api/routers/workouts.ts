import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const workoutsRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    console.log(ctx.currentUser)
    return ctx.prisma.workout.findMany({ where: { userId: ctx.currentUser.id }});
  }),
});
