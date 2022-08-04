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
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Inputs = {
  password: string
  confirmPassword: string
}

function Activate() {
  const { t } = useTranslation()
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
      <h2 className="heading-2">{t('activate')}</h2>

      <Controller
        name="password"
        control={control}
        rules={{
          required: t('messages.required', { field: t('password') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <Password
                placeholder={t('password')}
                id={field.name}
                {...field}
                toggleMask={true}
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              <label htmlFor={field.name}>{t('password')}</label>
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
        name="confirmPassword"
        control={control}
        rules={{
          required: t('messages.required', { field: t('confirm_password') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <Password
                placeholder={t('confirm_password')}
                id={field.name}
                {...field}
                toggleMask={true}
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              <label htmlFor={field.name}>{t('confirm_password')}</label>
            </span>
            {fieldState.error && (
              <small className="p-error mt-1">
                {fieldState.error?.message}
              </small>
            )}
          </>
        )}
      />
      <div className="flex justify-content-center mt-4 gap-3">
        <Link className="no-underline" to="/">
          <Button
            className="p-button-raised p-button-text"
            icon="pi pi-home"
            label={t('home')}
          />
        </Link>

        <Button label={t('activate')} icon="pi pi-check" type="submit" />
      </div>
    </form>
  )
}

export default Activate
