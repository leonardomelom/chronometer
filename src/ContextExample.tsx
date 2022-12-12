/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState } from 'react';

const CyclesContext = createContext({} as any)

function NewCycleForm(){
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
  <div>
    <h1>NewCycleForm: {activeCycle}</h1>
    <button onClick={(activeCycle:any) => setActiveCycle(activeCycle+1) }>alterar ciclo ativo</button>
  </div>
  )}

function Countdown(){
  const { activeCycle } = useContext(CyclesContext)

  return <h1>Countdown: {activeCycle}</h1>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)
  return( 
  <CyclesContext.Provider value={{activeCycle, setActiveCycle}}>
  <div>
    <Countdown/>
    <NewCycleForm/>
  </div>
  </CyclesContext.Provider>
)}

