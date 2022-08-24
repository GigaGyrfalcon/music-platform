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
import { Link, useLocation, useNavigate } from 'react-router-dom'

import axios from '../../../api'
import useAuth from '../../../hooks/useAuth'
import useToast from '../../../hooks/useToast'

type Inputs = {
  email: string
  password: string
}

type LocationState = { from: { pathname: string } }

function Login() {
  const { setAuth } = useAuth()
  const toast = useToast()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const from = state?.from?.pathname || '/dashboard'

  const defaultValues = { email: '', password: '' }
  const { handleSubmit, control } = useForm<Inputs>({ defaultValues })
  const onSubmit: SubmitHandler<Inputs> = async (values: FieldValues) => {
    try {
      const response = await axios.post('/sign_in', {
        email: values.email,
        password: values.password,
      })
      if (response.status === 200) {
        setAuth({ token: response.data.auth_token })
        navigate(from, { replace: true })
      }
    } catch (error) {
      toast.setToast('error', 'Error', error.message)
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="heading-2">{t('login')}</h2>
      <Controller
        name="email"
        control={control}
        rules={{
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t('messages.invalid_email'),
          },
          required: t('messages.required', { field: t('email') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label">
              <InputText
                placeholder={t('email')}
                id={field.name}
                {...field}
                autoFocus
                autoComplete="off"
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              <label htmlFor={field.name}>{t('email')}</label>
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
            type="button"
          />
        </Link>

        <Button label={t('login')} icon="pi pi-sign-in" type="submit" />
      </div>
    </form>
  )
}

export default Login
