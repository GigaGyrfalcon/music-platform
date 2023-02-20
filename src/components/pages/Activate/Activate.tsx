import './activate.scss'

import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import { useCallback, useEffect, useState } from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from '../../../api'
import { useToast } from '../../../hooks'

type Inputs = {
  password: string
  confirmPassword: string
}

function Activate() {
  const { t } = useTranslation()
  const toast = useToast()
  const { token } = useParams()
  const [activate, setActivate] = useState(false)
  const navigate = useNavigate()

  const send = useCallback(async () => {
    try {
      const response = await axios.get(`/activate/${token}`)
      setActivate(response.status === 200)
    } catch (error) {
      toast.setToast('error', 'Error', error.response.data.message)
    }
  }, [token])

  useEffect(() => {
    send()
  }, [])

  const defaultValues = {
    password: '',
    confirmPassword: '',
  }
  const { handleSubmit, control, getValues } = useForm<Inputs>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<Inputs> = async (values: FieldValues) => {
    try {
      const response = await axios.post(`/set_password`, {
        password: values.password,
        secret: token,
      })
      if (response.status === 200) {
        toast.setToast('success', 'Success', response.data.message)
        navigate('/login', { replace: true })
      }
    } catch (error) {
      toast.setToast('error', 'Error', error.response.data.message)
    }
  }
  return activate ? (
    <form className="activate" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="heading-2">{t('activate')}</h2>
      <Controller
        name="password"
        control={control}
        rules={{
          required: t('message.required', { field: t('password') }),
          minLength: {
            value: 8,
            message: t('message.min_length'),
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
          required: t('message.required', { field: t('confirm_password') }),
          minLength: {
            value: 8,
            message: t('message.min_length', {
              field: t('confirm_password'),
              min_length: 8,
            }),
          },
          validate: (value) => {
            return (
              value === getValues().password ||
              t('message.passwords_do_not_match')
            )
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
            type="button"
          />
        </Link>

        <Button label={t('activate')} icon="pi pi-check" type="submit" />
      </div>
    </form>
  ) : (
    <p>Not activated</p>
  )
}

export default Activate
