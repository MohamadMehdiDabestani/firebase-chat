import { Alert } from '@mui/material'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Header } from './Header'
import { Input } from './Input'
import { List } from './List'

export const Message = () => {
  const state = useSelector((state) => state.group).filter(el => el.isActive === true)[0];
  if(typeof(state) == "undefined") return <Alert severity='info' >گروهی را انتخاب کنید</Alert>

  return (
    <Fragment>
        <Header />
        <List />
        <Input />
    </Fragment>
  )
}

