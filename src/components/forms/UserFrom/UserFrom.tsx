import './user-form.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { SelectButton } from 'primereact/selectbutton'
import { classNames } from 'primereact/utils'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { User, UserRoles } from '../../../domain/user'

function UserForm({
  onSubmit,
  defaultValues,
  submitButtonLabel = 'button.submit',
}: {
  onSubmit: SubmitHandler<User>
  defaultValues: User
  submitButtonLabel?: string
}) {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<User>({
    defaultValues,
  })

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="fields-container">
        <Controller
          name="first_name"
          control={control}
          rules={{
            required: t('message.required', { field: t('first_name') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="first_name">{t('first_name')}</label>
              <InputText
                id="first_name"
                placeholder={t('first_name')}
                className={classNames({
                  'p-invalid': fieldState.error,
                })}
                {...field}
              />
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
              <label htmlFor="middle_name">{t('middle_name')}</label>
              <InputText
                id="middle_name"
                placeholder={t('middle_name')}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          name="last_name"
          control={control}
          rules={{
            required: t('message.required', { field: t('last_name') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="last_name">{t('last_name')}</label>
              <InputText
                id="last_name"
                placeholder={t('last_name')}
                className={classNames({
                  'p-invalid': fieldState.error,
                })}
                {...field}
              />
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
            required: t('message.required', { field: t('position') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="position">{t('position')}</label>
              <InputText
                id="position"
                placeholder={t('position')}
                className={classNames({
                  'p-invalid': fieldState.error,
                })}
                {...field}
              />
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
              message: t('message.invalid_email'),
            },
            required: t('message.required', { field: t('email') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="email">{t('email')}</label>
              <InputText
                id="email"
                placeholder={t('email')}
                className={classNames({
                  'p-invalid': fieldState.error,
                })}
                {...field}
              />
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
            required: t('message.required', { field: t('phone') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="phone">{t('phone')}</label>
              <InputText
                id="phone"
                placeholder={t('phone')}
                className={classNames({
                  'p-invalid': fieldState.error,
                })}
                {...field}
              />
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
              <label htmlFor="is_contact_person">{t('contact_person')}</label>
              <SelectButton
                id="is_contact_person"
                {...field}
                options={[
                  { label: t('yes'), value: true },
                  { label: t('no'), value: false },
                ]}
              />
            </div>
          )}
        />
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <div className="wrap-field">
              <label htmlFor="role">{t('role')}</label>
              <SelectButton
                id="role"
                {...field}
                options={UserRoles.map((role) => ({
                  label: t(role),
                  value: role,
                }))}
              />
            </div>
          )}
        />
      </div>
      <div className="flex justify-content-end mt-3">
        <Button label={t(submitButtonLabel)} type="submit" />
      </div>
    </form>
  )
}

export default UserForm
