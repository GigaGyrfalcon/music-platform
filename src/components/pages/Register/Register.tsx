import './register.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { classNames } from 'primereact/utils'
import React from 'react'
import {
  Controller,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Address } from '../../../domain/address/Address'
import { User } from '../../../domain/user/User'
import AddressForm from '../../Forms/AddressForm'

export type RegisterInputs = {
  legal_name: string
  description: string
  address: Address
  users: User[]
}

function Register() {
  const { t } = useTranslation()

  const defaultValues = {
    legal_name: '',
    description: '',
    address: {},
    users: [],
  }

  const form = useForm<RegisterInputs>({ defaultValues })

  const onSubmit: SubmitHandler<RegisterInputs> = (values: FieldValues) => {
    console.log(values)
    // TODO: send request to server
  }

  return (
    <FormProvider {...form}>
      <form className="register" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="heading-2">{t('register')}</h2>

        <h3 className="heading-3">{t('general_info')}</h3>

        <Controller
          name="legal_name"
          control={form.control}
          rules={{
            required: t('messages.required', { field: t('legal_name') }),
          }}
          render={({ field, fieldState }) => (
            <>
              <span className="p-float-label mt-4">
                <InputText
                  id={field.name}
                  placeholder={t('legal_name')}
                  {...field}
                  autoFocus
                  className={classNames({ 'p-invalid': fieldState.error })}
                />
                <label htmlFor={field.name}>{t('legal_name')}</label>
              </span>
              {fieldState.error && (
                <small className="p-error mt-1">
                  {fieldState.error?.message}
                </small>
              )}
            </>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field }) => (
            <span className="p-float-label mt-4">
              <InputTextarea
                id={field.name}
                placeholder={t('business_description')}
                rows={2}
                cols={50}
                {...field}
              />
              <label htmlFor={field.name}>{t('business_description')}</label>
            </span>
          )}
        />

        <h3 className="heading-3">{t('legal_address')}</h3>

        <AddressForm />

        <div className="flex justify-content-center mt-4 gap-3">
          <Link className="no-underline" to="/login">
            <Button
              className="p-button-raised p-button-text"
              icon="pi pi-sign-in"
              label={t('login')}
            />
          </Link>

          <Button label={t('register')} icon="pi pi-user-plus" type="submit" />
        </div>
      </form>
    </FormProvider>
  )
}

export default Register
