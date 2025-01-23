/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import SuperJSON from "superjson";
import { ZodError } from "zod";
import * as trpc from "@trpc/server";

import { db } from "../db";
import { auth } from "@clerk/nextjs/server";

// Define the AuthContext interface
interface AuthContext {
  auth: {
    userId?: string;
  };
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createContextInner = ({ auth }: AuthContext) => {
  return {
    auth,
    db,
  };
};

// Implement the context creation function
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const auth = { userId: opts.req.headers["x-user-id"] as string | undefined }; // Example auth context
  return createContextInner({ auth });
};

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>;

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

// Middleware to check if the user is authenticated
const isAuthenticated = t.middleware(async ({ next, ctx }) => {
  const user =await auth()
 
  if (!user) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user
    },
  });
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
