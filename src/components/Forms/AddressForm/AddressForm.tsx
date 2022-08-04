import './address-form.scss'

import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { RegisterInputs } from '../../pages/Register/Register'
import { ConnectForm } from '../ConnectForm'

function AddressForm() {
  const { t } = useTranslation()
  return (
    <ConnectForm>
      {(form: UseFormReturn<RegisterInputs, string>) => (
        <>
          <Controller
            name="address.address_line_1"
            control={form.control}
            rules={{
              required: t('messages.required', { field: t('address_line_1') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={field.name}
                    placeholder={t('address_line_1')}
                    className={classNames({ 'p-invalid': fieldState.error })}
                    {...form.register('address.address_line_1')}
                    {...field}
                  />
                  <label htmlFor={field.name}>{t('address_line_1')}</label>
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
            name="address.address_line_2"
            control={form.control}
            render={({ field }) => (
              <span className="p-float-label mt-4">
                <InputText
                  id={field.name}
                  placeholder={t('address_line_2')}
                  {...form.register('address.address_line_2')}
                  {...field}
                />
                <label htmlFor={field.name}>{t('address_line_2')}</label>
              </span>
            )}
          />

          <Controller
            name="address.city"
            control={form.control}
            rules={{
              required: t('messages.required', { field: t('city') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={field.name}
                    placeholder={t('city')}
                    {...form.register('address.city')}
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.error })}
                  />
                  <label htmlFor={field.name}>{t('city')}</label>
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
            name="address.state"
            control={form.control}
            rules={{
              required: t('messages.required', { field: t('state') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={field.name}
                    placeholder={t('state')}
                    {...form.register('address.state')}
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.error })}
                  />
                  <label htmlFor={field.name}>{t('state')}</label>
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
            name="address.postal_code"
            control={form.control}
            rules={{
              required: t('messages.required', { field: t('postal_code') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={field.name}
                    placeholder={t('postal_code')}
                    {...form.register('address.postal_code')}
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.error })}
                  />
                  <label htmlFor={field.name}>{t('postal_code')}</label>
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
            name="address.country"
            control={form.control}
            rules={{
              required: t('messages.required', { field: t('country') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={field.name}
                    placeholder={t('country')}
                    {...form.register('address.country')}
                    {...field}
                    className={classNames({ 'p-invalid': fieldState.error })}
                  />
                  <label htmlFor={field.name}>{t('country')}</label>
                </span>
                {fieldState.error && (
                  <small className="p-error mt-1">
                    {fieldState.error?.message}
                  </small>
                )}
              </>
            )}
          />
        </>
      )}
    </ConnectForm>
  )
}

export default AddressForm
