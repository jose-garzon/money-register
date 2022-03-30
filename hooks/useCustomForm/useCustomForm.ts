import { DeepPartial, UnpackNestedValue, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Schema } from 'joi'

interface CustomFormProps<T> {
  schema: Schema
  defaultValues?: UnpackNestedValue<DeepPartial<T>>
}

const useCustomForm = <T>({ schema, defaultValues }: CustomFormProps<T>) => {
  const form = useForm<T>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema),
    shouldFocusError: true,
    defaultValues,
  })
  return form
}

export { useCustomForm }
