import { AxiosError } from 'axios'
import { useMutation } from 'react-query'
import { useCustomForm } from '../useCustomForm'
import { RegisterSchema } from './schema'
import { useRouter } from 'next/router'
import { postUser, UserType } from '../../apiRequests/users'

const useRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useCustomForm<UserType>({ schema: RegisterSchema })
  const router = useRouter()

  const mutation = useMutation(postUser, {
    onError: (error) => {
      const { response } = error as AxiosError
      if (response?.data.code === 'user.exists')
        setError('email', { message: 'Este usuario ya está registrado' })
    },
  })

  const goLogin = () => router.push('/login')

  const doRegister = (userData: UserType) => {
    delete userData.confirm_password
    mutation.mutate(userData)
  }

  return { register, handleSubmit, doRegister, errors, mutation, goLogin }
}

export { useRegister }
