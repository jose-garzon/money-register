const config = {
  db: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
  auth: {
    base_url: process.env.NEXTAUTH_URL,
    secret: process.env.AUTH_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID ?? '',
    google_client_secret: process.env.GOOGLE_SECRET ?? '',
  },
}
export { config }
