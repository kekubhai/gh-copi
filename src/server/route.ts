// src/app/api/trpc/route.ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

// Step 1: Initialize tRPC
const t = initTRPC.create();

// Step 2: Define Router and Procedures
export const appRouter = t.router({
  // Example Query Procedure
  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Hello, ${input.name}!` };
    }),

  // Example Mutation Procedure
  add: t.procedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .mutation(({ input }) => {
      return { sum: input.a + input.b };
    }),
});

// Step 3: Define the API Handler
export type AppRouter = typeof appRouter;

export const runtime = 'nodejs'; // Required for tRPC in the App Router
export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}), // Add your custom context here if needed
});
