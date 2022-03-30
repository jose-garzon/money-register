import axios from 'axios'
import { Tag } from '../hooks/TagsPage/tags.types'

interface TagBody {
  name: string
  email: string
}

const getTags = async (email: string) => {
  const { data } = await axios.get<Tag[]>('/api/tags', { params: { email } })
  return data
}

const postTag = (tagData: TagBody) => axios.post('/api/tags', tagData)

const putTag = ({ id, name }: { id: string; name: string }) =>
  axios.put(`/api/tags/${id}`, { name })

const deleteTag = (id: string) => axios.delete(`/api/tags/${id}`)

export { getTags, postTag, deleteTag, putTag }
