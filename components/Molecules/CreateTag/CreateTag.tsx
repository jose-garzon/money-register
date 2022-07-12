import { AxiosResponse } from 'axios'
import { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from 'react'
import { FaPen, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { UseMutationResult } from 'react-query'

interface CreateTagProps {
  label: string
  id: string
  onDelete?: MouseEventHandler<SVGElement>
  onMutation?: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      id: string
      name: string
    },
    unknown
  >
}
type InputEvent = ChangeEvent<HTMLInputElement>

const CreateTag: FC<CreateTagProps> = ({ onDelete, onMutation, label, id }) => {
  const [editing, setEditing] = useState<boolean>(false)
  const [newLabel, setNewLabel] = useState<string>(label)
  const toogleEditing = () => setEditing(!editing)
  const handleNewLabel = (event: InputEvent) => setNewLabel(event.target.value)

  useEffect(() => {
    if (onMutation?.isSuccess) setEditing(false)
  }, [onMutation?.isSuccess])

  return (
    <label
      htmlFor={`${id}_input`}
      className="mb-4 flex items-center justify-between rounded-lg border-2 border-transparent py-2 px-4 shadow-md transition duration-100 last-of-type:mb-0 focus-within:border-yellow-300"
    >
      <div className="flex items-center">
        {editing ? (
          <FaTimes
            title="Cancelar"
            onClick={toogleEditing}
            className="mr-4 cursor-pointer text-red-500"
            size={20}
            role="cancel-editing-icon"
          />
        ) : (
          <FaPen
            onClick={toogleEditing}
            className="mr-4 cursor-pointer text-slate-700"
            size={20}
            role="edit-icon"
          />
        )}
        {editing ? (
          <input
            className="w-[200px] text-lg focus:outline-none"
            id={`${id}_input`}
            value={newLabel}
            onChange={handleNewLabel}
          />
        ) : (
          <p>{label}</p>
        )}
      </div>
      {editing ? (
        <FaCheck
          title="Guardar"
          className="cursor-pointer text-emerald-500"
          size={20}
          role="save-tag-icon"
          onClick={() => onMutation?.mutate({ id, name: newLabel })}
        />
      ) : (
        <FaTrash
          onClick={onDelete}
          className="cursor-pointer text-red-500"
          size={20}
          role="delete-tag-icon"
        />
      )}
    </label>
  )
}

export { CreateTag }
