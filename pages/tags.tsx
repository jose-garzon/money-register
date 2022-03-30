import { FaTag } from 'react-icons/fa'
import { Button } from '../components/Button'
import { CreateTag } from '../components/CreateTag'
import { Header } from '../components/Header'
import { Input } from '../components/Input'
import { useTags } from '../hooks/TagsPage/logic'

const Tags = () => {
  const {
    filteredTags,
    createTag,
    deleteOneTag,
    register,
    handleSubmit,
    updateTagMutation,
  } = useTags()

  return (
    <div className="px-5 pb-10">
      <Header />
      <h1 className="mb-2 mt-10 font-bold">Etiquetas</h1>
      <p className="mb-4">Edita o crea una etiqueta</p>
      <Input
        label="Buscar"
        startIcon={FaTag}
        {...register('search')}
        placeholder="Busca una etiqueta"
      />
      <div>
        {filteredTags?.map(({ name, id }) => (
          <CreateTag
            key={id}
            label={name}
            id={id}
            onDelete={() => deleteOneTag(id)}
            onMutation={updateTagMutation}
          />
        ))}
      </div>
      {filteredTags?.length === 0 && (
        <>
          <p>
            No encontramos coincidencias, <br /> crea una etiqueta nueva
          </p>
          <Button className="mt-10" onClick={handleSubmit(createTag)}>
            Crear
          </Button>
        </>
      )}
    </div>
  )
}

Tags.auth = true
export default Tags
