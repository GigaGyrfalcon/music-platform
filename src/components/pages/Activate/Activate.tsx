import './activate.scss'

import { Button } from 'primereact/button'
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
  password: string
  confirmPassword: string
}

function Activate() {
  // TODO: Verify activation token
  // a. If token is valid, show form to enter new password
  // b. If token is invalid, show error message

  const defaultValues = {
    password: '',
    confirmPassword: '',
  }
  const { handleSubmit, control } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = (values: FieldValues) => {
    console.log(values)
    // TODO: send request to server
  }

  return (
    <form className="activate" onSubmit={handleSubmit(onSubmit)}>
      <h1>Activate</h1>

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
              toggleMask={true}
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Password</label>
          </span>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{ required: 'Confirm password is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <Password
              placeholder="Confirm password"
              id={field.name}
              {...field}
              toggleMask={true}
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Confirm Password</label>
          </span>
        )}
      />
      <div className="flex justify-content-center mt-4 gap-3">
        <Link className="no-underline" to="/">
          <Button
            className="p-button-raised p-button-text"
            icon="pi pi-home"
            label="Home"
          />
        </Link>

        <Button label="Activate" icon="pi pi-check" type="submit" />
      </div>
    </form>
  )
}

export default Activate
