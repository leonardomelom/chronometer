import { useForm } from 'react-hook-form'
import { FormContainer, MinutsAmountInput, TaskInput } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutsAmount: zod
    .number()
    .min(1, 'O ciclo deve ser entre 5 e 60 minutos')
    .max(60, 'O ciclo deve ser entre 5 e 60 minutos'),
})

// get type of another instance(ex: newCycleFormValidationSchema) use infer(reference)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmount: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em:</label>
      <TaskInput
        disabled={!!activeCycle}
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
      </datalist>
      <label htmlFor="">Durante</label>
      <MinutsAmountInput
        type="number"
        id="minutsAmount"
        placeholder="00"
        step="5"
        disabled={!!activeCycle}
        min="1"
        max="60"
        {...register('minutsAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
