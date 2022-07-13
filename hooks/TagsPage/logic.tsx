import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'react-query'
import { deleteTag, getTags, postTag, putTag } from '../../apiRequests/tags'
import { capitalize } from '../../utils/capitalize'
import { useCustomForm } from '../useCustomForm'
import { CreateTagSchema } from './schema'
import { Tag } from './tags.types'

interface CreateTagForm {
  search: string
}

const defaultValues = { search: '' }

const useTags = () => {
  const { data: session } = useSession()
  const email = session?.user?.email ?? ''
  const { data: tags, refetch } = useQuery(['getTags'], () => getTags(email!))
  const updateTagMutation = useMutation(putTag, { onSuccess: () => refetch() })
  const createTagMutation = useMutation(postTag, {
    onSuccess: clearTagForm,
  })
  const deleteTagMutation = useMutation(deleteTag, {
    onSuccess: clearTagForm,
  })
  const { register, watch, handleSubmit, reset } = useCustomForm<CreateTagForm>(
    {
      schema: CreateTagSchema,
      defaultValues,
    }
  )

  const tagsSearch = watch('search')
  const [filteredTags, setFilteredTags] = useState<Tag[] | undefined>([])

  const createTag = ({ search }: CreateTagForm) =>
    createTagMutation.mutate({ name: capitalize(search), email })

  const deleteOneTag = (id: string) => deleteTagMutation.mutate(id)

  function clearTagForm() {
    refetch()
    reset()
  }

  useEffect(() => {
    setFilteredTags(
      tags?.filter((tag) =>
        tag?.name?.toLowerCase().includes(tagsSearch.toLowerCase())
      )
    )
  }, [tagsSearch, tags])

  return {
    tagsSearch,
    filteredTags,
    createTag,
    deleteOneTag,
    register,
    handleSubmit,
    updateTagMutation: updateTagMutation,
  }
}

export { useTags }
