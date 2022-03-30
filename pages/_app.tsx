import '../styles/globals.css'
import '../styles/datePicker.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { AuthNeeded } from '../components/AuthNeeded'
import { Toaster, toast } from 'react-hot-toast'
type ComponentProps = { auth: boolean }
interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: AppProps['Component'] & ComponentProps
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const err = error as Error
      toast.error(err.message)
    },
  }),
})

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {Component.auth ? (
          <AuthNeeded>
            <Component {...pageProps} />
          </AuthNeeded>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
      <Toaster />
    </QueryClientProvider>
  )
}

export default MyApp
