import './branch-form.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Branch } from '../../../domain/branch'

function BranchForm({
  onSubmit,
  branchDefaultValues,
}: {
  onSubmit: SubmitHandler<Branch>
  branchDefaultValues: Branch
}) {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<Branch>({
    defaultValues: branchDefaultValues,
  })

  return (
    <form className="branch-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="fields-container">
        <Controller
          name="name"
          control={control}
          rules={{
            required: t('messages.required', { field: t('name') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="name">{t('name')}</label>
              <InputText
                id="name"
                placeholder={t('name')}
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
      </div>
      <div className="flex justify-content-end mt-3">
        <Button label={t('button.submit')} icon="pi pi-plus" type="submit" />
      </div>
    </form>
  )
}

export default BranchForm
