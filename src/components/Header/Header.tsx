/* eslint-disable prettier/prettier */
import React from 'react'
import { Logo } from '../Logo'
import { HeaderContanier } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
function Header() {
  return (
    <HeaderContanier>
      <span><Logo/></span>
      <nav>
        <NavLink to='/' title='timer'><Timer size={24}/></NavLink>
        <NavLink to='/history' title='histórico'><Scroll size={24}/></NavLink>
      </nav>
    </HeaderContanier>
  )
}

export default Header
