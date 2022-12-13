import { HandPalm, Play } from 'phosphor-react'
import { StartButton, HomeContainer, StopCowntdownButton } from './styles'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm/Index'
import { Countdown } from './components/Countdown/Index'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CyclesContext } from '../../context/CyclesContext'

export const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser entre 5 e 60 minutos')
    .max(60, 'O ciclo deve ser entre 5 e 60 minutos'),
})

// get type of another instance(ex: newCycleFormValidationSchema) use infer(reference)
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, CreateNewCycle, InterruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    CreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCowntdownButton type="button" onClick={InterruptCurrentCycle}>
            <HandPalm size={24} /> Interromper
          </StopCowntdownButton>
        ) : (
          <StartButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Comecar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  )
}
