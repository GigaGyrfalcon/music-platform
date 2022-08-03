import './register.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import React from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Link } from 'react-router-dom'

export const Roles = ['admin', 'media'] as const

type Role = typeof Roles[number]

type User = {
  firstName: string
  middleName: string | null
  lastName: string
  position: string
  email: string
  phone: string
  isContactPerson: boolean
  role: Role
}

type Address = {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  zip: string
  country: string
}

type Inputs = {
  legalName: string
  description: string
  address: Address
  users: User[]
}

function Register() {
  const defaultValues = {
    legalName: '',
    description: '',
    address: {},
    users: [],
  }

  const { handleSubmit, control } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = (values: FieldValues) => {
    console.log(values)
    // TODO: send request to server
  }

  return (
    <form className="register" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl text-800 my-4">Sign Up</h2>

      <h3 className="text-l text-600 text-left mt-4 mb-0">General Info</h3>

      <Controller
        name="legalName"
        control={control}
        rules={{ required: 'Legal name is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="Legal name"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Legal name</label>
          </span>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: 'Business description is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputTextarea
              id={field.name}
              placeholder="Business description"
              rows={2}
              cols={50}
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Business description</label>
          </span>
        )}
      />

      <h3 className="text-l text-600 text-left mt-4 mb-0">
        Company Legal Address
      </h3>

      <Controller
        name="address.addressLine1"
        control={control}
        rules={{ required: 'Address line 1 is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="Address line 1"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Address line 1</label>
          </span>
        )}
      />

      <Controller
        name="address.addressLine2"
        control={control}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="Address line 2"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Address line 2</label>
          </span>
        )}
      />

      <Controller
        name="address.city"
        control={control}
        rules={{ required: 'City is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="City"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>City</label>
          </span>
        )}
      />

      <Controller
        name="address.state"
        control={control}
        rules={{ required: 'State/Province is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="State/Province"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>State/Province</label>
          </span>
        )}
      />

      <Controller
        name="address.zip"
        control={control}
        rules={{ required: 'Zip/Post code is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="Zip/Post code"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Zip/Post code</label>
          </span>
        )}
      />

      <Controller
        name="address.country"
        control={control}
        rules={{ required: 'Country is required.' }}
        render={({ field, fieldState }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder="Country"
              {...field}
              autoFocus
              className={classNames({ 'p-invalid': fieldState.error })}
            />
            <label htmlFor={field.name}>Country</label>
          </span>
        )}
      />

      <div className="flex justify-content-center mt-4 gap-3">
        <Link className="no-underline" to="/login">
          <Button
            className="p-button-raised p-button-text"
            icon="pi pi-sign-in"
            label="Sign In"
          />
        </Link>

        <Button label="Sign Up" icon="pi pi-user-plus" type="submit" />
      </div>
    </form>
  )
}

export default Register
