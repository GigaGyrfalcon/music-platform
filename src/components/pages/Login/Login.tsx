import './login.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import React from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Link } from 'react-router-dom'

type Inputs = {
  username: string
  password: string
}

function Login() {
  const defaultValues = {
    username: '',
    password: '',
  }
  const { handleSubmit, control } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = (values: FieldValues) => {
    console.log(values)
    // TODO: send request to server
    if (values.username === 'user' && values.password === '123456') {
      alert('Invalid username or password')
    } else {
      alert('Sign in success')
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
      <Controller
        name="username"
        control={control}
        rules={{ required: 'Username is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label">
            <InputText
              placeholder="Username"
              id={field.name}
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Username</label>
          </span>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <Password
              placeholder="Password"
              id={field.name}
              {...field}
              feedback={false}
              toggleMask={true}
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Password</label>
          </span>
        )}
      />
      <div className="flex justify-content-center mt-4 gap-3">
        <Link className="no-underline" to="/register">
          <Button
            className="p-button-raised p-button-text"
            icon="pi pi-user-plus"
            label="Sign Up"
          />
        </Link>

        <Button label="Sign In" icon="pi pi-sign-in" type="submit" />
      </div>
    </form>
  )
}

export default Login
