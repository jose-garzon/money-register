import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { OverlayLoader } from '../Loaders'

interface Props {
  children: JSX.Element
}

const AuthNeeded: FC<Props> = ({ children }) => {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login')
    },
  })
  const isUser = !!session?.user

  if (isUser) return children
  return <OverlayLoader />
}

export { AuthNeeded }
