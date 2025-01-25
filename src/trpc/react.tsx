// utils/api.ts
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import React, { useState } from 'react';
import superjson from 'superjson'; // Ensure superjson is installed

import { type AppRouter } from '@/server/api/trpc';

export const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers?: Record<string, string>; // Make headers optional
}) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer: superjson, // Use superjson for data serialization
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              ...headers,
              'x-trpc-source': 'react',
            };
          },
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
