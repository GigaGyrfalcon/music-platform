import './address-form.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Address } from '../../../domain/address'

export default function AddressForm({
  onSubmit,
  defaultValues,
  submitButtonLabel = 'button.submit',
  cancelButtonLabel,
  cancelButtonFn,
}: {
  onSubmit: SubmitHandler<Address>
  defaultValues: Address
  submitButtonLabel?: string
  cancelButtonLabel?: string
  cancelButtonFn?: () => void
}) {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<Address>({
    defaultValues,
  })

  return (
    <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="fields-container">
        <Controller
          name="address_line_1"
          control={control}
          rules={{
            required: t('message.required', { field: t('address_line_1') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="address_line_1">{t('address_line_1')}</label>
              <InputText
                id="address_line_1"
                placeholder={t('address_line_1')}
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
          name="address_line_2"
          control={control}
          render={({ field }) => (
            <div className="wrap-field">
              <label htmlFor="address_line_2">{t('address_line_2')}</label>
              <InputText
                id="address_line_2"
                placeholder={t('address_line_2')}
                {...field}
              />
            </div>
          )}
        />

        <Controller
          name="city"
          control={control}
          rules={{
            required: t('message.required', { field: t('city') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="city">{t('city')}</label>
              <InputText
                id="city"
                placeholder={t('city')}
                {...field}
                className={classNames({ 'p-invalid': fieldState.error })}
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
          name="state"
          control={control}
          rules={{
            required: t('message.required', { field: t('state') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="state">{t('state')}</label>
              <InputText
                id="state"
                placeholder={t('state')}
                {...field}
                className={classNames({ 'p-invalid': fieldState.error })}
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
          name="postal_code"
          control={control}
          rules={{
            required: t('message.required', { field: t('postal_code') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="postal_code">{t('postal_code')}</label>
              <InputText
                id="postal_code"
                placeholder={t('postal_code')}
                {...field}
                className={classNames({ 'p-invalid': fieldState.error })}
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
          name="country"
          control={control}
          rules={{
            required: t('message.required', { field: t('country') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="country">{t('country')}</label>
              <InputText
                id="country"
                placeholder={t('country')}
                {...field}
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              {fieldState.error && (
                <small className="p-error mt-1">
                  {fieldState.error?.message}
                </small>
              )}
            </div>
          )}
        />
      </div>
      <div className="flex justify-content-end mt-3 gap-2">
        {cancelButtonLabel && (
          <Button
            className="p-button-secondary"
            label={t(cancelButtonLabel)}
            onClick={cancelButtonFn}
            type="button"
          />
        )}
        <Button label={t(submitButtonLabel)} type="submit" />
      </div>
    </form>
  )
}
