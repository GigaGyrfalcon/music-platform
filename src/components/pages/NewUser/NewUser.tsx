import './new-user.scss'

import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import { classNames } from 'primereact/utils'
import React from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { axiosPrivate } from '../../../api'
import { User, userDefaultValues, UserRoles } from '../../../domain/user'

function NewUsers() {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<User>({
    defaultValues: userDefaultValues,
  })

  const onSubmit: SubmitHandler<User> = async (values: FieldValues) => {
    try {
      const response = await axiosPrivate(
        `${localStorage.getItem('token')}`
      ).post(`/user`, values)
      if (response.status === 200) {
        alert('User created successfully')
      }
    } catch (error) {
      alert('Error creating user')
    }
  }

  return (
    <Card className="m-3">
      <form className="new-user" onSubmit={handleSubmit(onSubmit)}>
        <h2>{t('add_user')}</h2>
        <div className="fields-container">
          <Controller
            name="first_name"
            control={control}
            rules={{
              required: t('messages.required', { field: t('first_name') }),
            }}
            render={({ field, fieldState }) => (
              <div className="wrap-field">
                <span className="p-float-label mt-4">
                  <InputText
                    id="first_name"
                    placeholder={t('first_name')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor="first_name">{t('first_name')}</label>
                </span>
                {fieldState.error && (
                  <small className="p-error mt-1">
                    {fieldState.error?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            name="middle_name"
            control={control}
            render={({ field }) => (
              <div className="wrap-field">
                <span className="p-float-label mt-4">
                  <InputText
                    id="middle_name"
                    placeholder={t('middle_name')}
                    {...field}
                  />
                  <label htmlFor="middle_name">{t('middle_name')}</label>
                </span>
              </div>
            )}
          />
          <Controller
            name="last_name"
            control={control}
            rules={{
              required: t('messages.required', { field: t('last_name') }),
            }}
            render={({ field, fieldState }) => (
              <div className="wrap-field">
                <span className="p-float-label mt-4">
                  <InputText
                    id="last_name"
                    placeholder={t('last_name')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor="last_name">{t('last_name')}</label>
                </span>
                {fieldState.error && (
                  <small className="p-error mt-1">
                    {fieldState.error?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            name="position"
            control={control}
            rules={{
              required: t('messages.required', { field: t('position') }),
            }}
            render={({ field, fieldState }) => (
              <div className="wrap-field">
                <span className="p-float-label mt-4">
                  <InputText
                    id="position"
                    placeholder={t('position')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor="position">{t('position')}</label>
                </span>
                {fieldState.error && (
                  <small className="p-error mt-1">
                    {fieldState.error?.message}
                  </small>
                )}
              </div>
            )}
          />
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
              <div className="wrap-field">
                <span className="p-float-label mt-4">
                  <InputText
                    id="email"
                    placeholder={t('email')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor="email">{t('email')}</label>
                </span>
                {fieldState.error && (
                  <small className="p-error mt-1">
                    {fieldState.error?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            name="phone"
            control={control}
            rules={{
              required: t('messages.required', { field: t('phone') }),
            }}
            render={({ field, fieldState }) => (
              <div className="wrap-field">
                <span className="p-float-label mt-4">
                  <InputText
                    id="phone"
                    placeholder={t('phone')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor="phone">{t('phone')}</label>
                </span>
                {fieldState.error && (
                  <small className="p-error mt-1">
                    {fieldState.error?.message}
                  </small>
                )}
              </div>
            )}
          />
          <Controller
            name="is_contact_person"
            control={control}
            render={({ field }) => (
              <div className="wrap-field">
                <span className="block mt-3">
                  <label
                    className="block mb-2 text-base text-700"
                    htmlFor="is_contact_person"
                  >
                    {t('contact_person')}
                  </label>
                  <SelectButton
                    id="is_contact_person"
                    {...field}
                    options={[
                      { label: t('yes'), value: true },
                      { label: t('no'), value: false },
                    ]}
                  />
                </span>
              </div>
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <div className="wrap-field">
                <span className="block mt-3">
                  <label
                    className="block mb-2 text-base text-700"
                    htmlFor="role"
                  >
                    {t('role')}
                  </label>
                  <SelectButton
                    id="role"
                    {...field}
                    options={UserRoles.map((role) => ({
                      label: t(role),
                      value: role,
                    }))}
                  />
                </span>
              </div>
            )}
          />
        </div>
        <div className="flex justify-content-end mt-3">
          <Button label={t('add_user')} icon="pi pi-plus" type="submit" />
        </div>
      </form>
    </Card>
  )
}

export default NewUsers
