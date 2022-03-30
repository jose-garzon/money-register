import { useCustomForm } from '../useCustomForm'
import { LoginSchema } from './schema'
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface LoginFormTypes {
  email: string
  password: string
}

const useLogin = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useCustomForm<LoginFormTypes>({ schema: LoginSchema })
  const [loading, setLoading] = useState<boolean>(false)
  const { status } = useSession()
  const router = useRouter()

  const doLogin = async (userData: LoginFormTypes) => {
    setLoading(true)
    const res: any = await signIn('credentials', {
      email: userData.email,
      password: userData.password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })
    setLoading(false)
    if (res.error)
      setError('password', { message: 'Email o contraseña invalidos' })
  }

  const doGoogleLogin = async () =>
    await signIn('google', {
      callbackUrl: `${window.location.origin}/`,
      redirect: false,
    })

  useEffect(() => {
    if (status === 'authenticated') router.push('/')
  }, [status, router])

  return {
    register,
    handleSubmit,
    doLogin,
    errors,
    loading,
    doGoogleLogin,
  }
}

export { useLogin }
