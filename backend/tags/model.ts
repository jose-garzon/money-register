import mongoose from 'mongoose'

const TagsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    description: String,
    name: { type: String, required: true },
  },
  { collection: 'tags' }
)

export default mongoose.models.Tags || mongoose.model('Tags', TagsSchema)
