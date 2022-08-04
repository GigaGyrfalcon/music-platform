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
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type Inputs = {
  username: string
  password: string
}

function Login() {
  const { t } = useTranslation()

  const defaultValues = { username: '', password: '' }
  const { handleSubmit, control } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = (values: FieldValues) => {
    console.log(values)
    // TODO: send request to server
    if (values.username === 'user' && values.password === '123456') {
      alert('Sign in success')
    } else {
      alert('Invalid username or password')
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="heading-2">{t('login')}</h2>
      <Controller
        name="username"
        control={control}
        rules={{
          required: t('messages.required', { field: t('username') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label">
              <InputText
                placeholder={t('username')}
                id={field.name}
                {...field}
                autoFocus
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              <label htmlFor={field.name}>{t('username')}</label>
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
        name="password"
        control={control}
        rules={{ required: t('messages.required', { field: t('password') }) }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <Password
                placeholder={t('password')}
                id={field.name}
                {...field}
                feedback={false}
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
      <div className="flex justify-content-center mt-4 gap-3">
        <Link className="no-underline" to="/register">
          <Button
            className="p-button-raised p-button-text"
            icon="pi pi-plus"
            label={t('register')}
          />
        </Link>

        <Button label={t('login')} icon="pi pi-sign-in" type="submit" />
      </div>
    </form>
  )
}

export default Login
