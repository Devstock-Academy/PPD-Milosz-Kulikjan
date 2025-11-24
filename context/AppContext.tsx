'use client'

import React, { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { ErrorBoundary } from './ErrorBoundary'

const queryClient = new QueryClient()

const AppContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3}>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </SnackbarProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default AppContext
