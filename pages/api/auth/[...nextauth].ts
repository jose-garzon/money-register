import nextAuth from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'
import credentialsProvider from 'next-auth/providers/credentials'
import googleProvider from 'next-auth/providers/google'
import axios from 'axios'
import { config } from '../../../config'

const options: NextAuthOptions = {
  debug: true,
  secret: config.auth.secret,
  session: {
    strategy: 'jwt',
  },
  providers: [
    googleProvider({
      clientId: config.auth.google_client_id,
      clientSecret: config.auth.google_client_secret,
    }),
    credentialsProvider({
      type: 'credentials',
      name: 'expenses',
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
        },
        password: {
          type: 'password',
          label: 'Password',
        },
      },
      async authorize(credentials) {
        const { data, statusText } = await axios.post(
          `${config.auth.base_url}/api/auth/login`,
          credentials
        )
        if (statusText === 'OK' && data) return data
        return null
      },
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
  },
}

export default nextAuth(options)
