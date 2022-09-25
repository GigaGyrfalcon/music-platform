import './branch-form.scss'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Branch } from '../../../domain/branch'

function BranchForm({
  onSubmit,
  defaultValues,
  submitButtonLabel = 'button.submit',
}: {
  onSubmit: SubmitHandler<Branch>
  defaultValues: Branch
  submitButtonLabel?: string
}) {
  const { t } = useTranslation()
  const { control, handleSubmit } = useForm<Branch>({
    defaultValues,
  })

  return (
    <form className="branch-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="fields-container">
        <Controller
          name="name"
          control={control}
          rules={{
            required: t('messages.required', { field: t('branch_name') }),
          }}
          render={({ field, fieldState }) => (
            <div className="wrap-field">
              <label htmlFor="name">{t('branch_name')}</label>
              <InputText
                id="name"
                placeholder={t('branch_name')}
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
        <Button label={t(submitButtonLabel)} type="submit" />
      </div>
    </form>
  )
}

export default BranchForm
