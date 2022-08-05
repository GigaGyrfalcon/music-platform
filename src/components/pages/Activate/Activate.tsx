import './activate.scss'

import axios from 'axios'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { ApiUrl } from '../../..'

type Inputs = {
  password: string
  confirmPassword: string
}

function Activate() {
  const { t } = useTranslation()
  const { token } = useParams()
  const [activateRes, setActivateRes] = useState({})

  const activate = useCallback(async () => {
    try {
      const response = await axios.get(`${ApiUrl}/activate/${token}`)
      setActivateRes(response)
    } catch (error) {
      console.log(error)
    }
  }, [token])

  useEffect(() => {
    activate()
  }, [])

  // TODO: Verify activation token
  // a. If token is valid, show form to enter new password
  // b. If token is invalid, show error message

  const defaultValues = {
    password: '',
    confirmPassword: '',
  }
  const { handleSubmit, control } = useForm<Inputs>({ defaultValues })

  const onSubmit: SubmitHandler<Inputs> = async (values: FieldValues) => {
    try {
      const response = await axios.post(`${ApiUrl}/set_password`, {
        password: values.password,
        secret: token,
      })
      if (response.status === 200) {
        // setSuccessMessage(t('messages.successfully_registered'))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form className="activate" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="heading-2">{t('activate')}</h2>
      {activateRes && <p>Activated</p>}
      <Controller
        name="password"
        control={control}
        rules={{
          required: t('messages.required', { field: t('password') }),
          minLength: {
            value: 8,
            message: t('messages.min_length'),
          },
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
          minLength: {
            value: 8,
            message: t('messages.min_length', {
              field: t('confirm_password'),
              min_length: 8,
            }),
          },
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
