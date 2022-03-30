import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  { collection: 'users' }
)

export default mongoose.models.User || mongoose.model('User', UsersSchema)
