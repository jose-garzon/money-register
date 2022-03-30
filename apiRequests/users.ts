import axios from 'axios'

interface UserType {
  email: string
  name: string
  lastname: string
  password: string
  confirm_password?: string
}

const postUser = (newUser: UserType) => axios.post('/api/users', newUser)

export { postUser }
export type { UserType }
