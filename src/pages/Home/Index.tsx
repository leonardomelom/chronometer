import { HandPalm, Play } from 'phosphor-react'
import { StartButton, HomeContainer, StopCowntdownButton } from './styles'

import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm/Index'
import { Countdown } from './components/Countdown/Index'

interface Cycle {
  id: string
  task: string
  minutsAmount: number
  startDate: Date
  interrruptedDate?: Date
  finishedDate?: Date
}
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutsAmount = Math.round(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minuts = String(minutsAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minuts}:${seconds}`
    }
  }, [minuts, seconds, activeCycle])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutsAmount: data.minutsAmount,
      startDate: new Date(),
    }
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setActiveCycleId(null)
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleId={activeCycleId}
        />
        {activeCycle ? (
          <StopCowntdownButton type="button" onClick={handleInterruptCycle}>
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
