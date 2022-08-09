import './register.scss'

import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { SelectButton } from 'primereact/selectbutton'
import { classNames } from 'primereact/utils'
import React, { useState } from 'react'
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import axios from '../../../api'
import { Address } from '../../../domain/address/Address'
import { User } from '../../../domain/user/User'
import { UserRoles } from '../../../domain/user/UserRole'

export type RegisterInputs = {
  legal_name: string
  description: string
  address: Address
  users: User[]
}

function Register() {
  const { t } = useTranslation()
  const [successMessage, setSuccessMessage] = useState('')

  const defaultAddressValues = {
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  }

  const defaultUserValues = {
    first_name: '',
    middle_name: '',
    last_name: '',
    position: '',
    email: '',
    phone: '',
    is_contact_person: false,
    role: UserRoles[0],
    address: defaultAddressValues,
  }

  const defaultValues = {
    legal_name: '',
    description: '',
    address: defaultAddressValues,
    users: [defaultUserValues],
  }

  const { control, handleSubmit } = useForm<RegisterInputs>({ defaultValues })
  const { fields, append, remove } = useFieldArray({
    name: 'users',
    control,
  })

  const onSubmit: SubmitHandler<RegisterInputs> = async (
    values: FieldValues
  ) => {
    try {
      const response = await axios.post(`/merchant`, values)
      if (response.status === 200) {
        setSuccessMessage(t('messages.successfully_registered'))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return successMessage ? (
    <p>{successMessage}</p>
  ) : (
    <form className="register" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="heading-2">{t('register')}</h2>

      <h3 className="heading-3">{t('general_info')}</h3>

      <Controller
        name="legal_name"
        control={control}
        rules={{
          required: t('messages.required', { field: t('legal_name') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <InputText
                id={field.name}
                placeholder={t('legal_name')}
                {...field}
                autoFocus
                className={classNames({ 'p-invalid': fieldState.error })}
              />
              <label htmlFor={field.name}>{t('legal_name')}</label>
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
        name="description"
        control={control}
        render={({ field }) => (
          <span className="p-float-label mt-4">
            <InputTextarea
              id={field.name}
              placeholder={t('business_description')}
              rows={2}
              cols={50}
              {...field}
            />
            <label htmlFor={field.name}>{t('business_description')}</label>
          </span>
        )}
      />

      <h3 className="heading-3">{t('legal_address')}</h3>

      <Controller
        name="address.address_line_1"
        control={control}
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
        control={control}
        render={({ field }) => (
          <span className="p-float-label mt-4">
            <InputText
              id={field.name}
              placeholder={t('address_line_2')}
              {...field}
            />
            <label htmlFor={field.name}>{t('address_line_2')}</label>
          </span>
        )}
      />

      <Controller
        name="address.city"
        control={control}
        rules={{
          required: t('messages.required', { field: t('city') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <InputText
                id={field.name}
                placeholder={t('city')}
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
        control={control}
        rules={{
          required: t('messages.required', { field: t('state') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <InputText
                id={field.name}
                placeholder={t('state')}
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
        control={control}
        rules={{
          required: t('messages.required', { field: t('postal_code') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <InputText
                id={field.name}
                placeholder={t('postal_code')}
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
        control={control}
        rules={{
          required: t('messages.required', { field: t('country') }),
        }}
        render={({ field, fieldState }) => (
          <>
            <span className="p-float-label mt-4">
              <InputText
                id={field.name}
                placeholder={t('country')}
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

      <h3 className="heading-3">{t('users')}</h3>

      {fields.map((item, i) => (
        <div key={item.id}>
          <h4 className="heading-4">{t('new_user', { number: i + 1 })}</h4>
          <Controller
            name={`users.${i}.first_name`}
            control={control}
            rules={{
              required: t('messages.required', { field: t('first_name') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={`users.${i}.first_name`}
                    placeholder={t('first_name')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor={`users.${i}.first_name`}>
                    {t('first_name')}
                  </label>
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
            name={`users.${i}.middle_name`}
            control={control}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={`users.${i}.middle_name`}
                    placeholder={t('middle_name')}
                    {...field}
                  />
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
            name={`users.${i}.last_name`}
            control={control}
            rules={{
              required: t('messages.required', { field: t('last_name') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={`users.${i}.last_name`}
                    placeholder={t('last_name')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor={`users.${i}.last_name`}>
                    {t('last_name')}
                  </label>
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
            name={`users.${i}.position`}
            control={control}
            rules={{
              required: t('messages.required', { field: t('position') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={`users.${i}.position`}
                    placeholder={t('position')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor={`users.${i}.position`}>{t('position')}</label>
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
            name={`users.${i}.email`}
            control={control}
            rules={{
              required: t('messages.required', { field: t('email') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={`users.${i}.email`}
                    placeholder={t('email')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor={`users.${i}.email`}>{t('email')}</label>
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
            name={`users.${i}.phone`}
            control={control}
            rules={{
              required: t('messages.required', { field: t('phone') }),
            }}
            render={({ field, fieldState }) => (
              <>
                <span className="p-float-label mt-4">
                  <InputText
                    id={`users.${i}.phone`}
                    placeholder={t('phone')}
                    className={classNames({
                      'p-invalid': fieldState.error,
                    })}
                    {...field}
                  />
                  <label htmlFor={`users.${i}.phone`}>{t('phone')}</label>
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
            name={`users.${i}.is_contact_person`}
            control={control}
            render={({ field }) => (
              <>
                <span className="block mt-3">
                  <label
                    className="block mb-2 text-base text-700"
                    htmlFor={`users.${i}.is_contact_person`}
                  >
                    {t('contact_person')}
                  </label>
                  <SelectButton
                    id={`users.${i}.is_contact_person`}
                    {...field}
                    options={[
                      { label: t('yes'), value: true },
                      { label: t('no'), value: false },
                    ]}
                  />
                </span>
              </>
            )}
          />

          <Controller
            name={`users.${i}.role`}
            control={control}
            render={({ field }) => (
              <>
                <span className="block mt-3">
                  <label
                    className="block mb-2 text-base text-700"
                    htmlFor={`users.${i}.role`}
                  >
                    {t('role')}
                  </label>
                  <SelectButton
                    id={`users.${i}.role`}
                    {...field}
                    options={UserRoles.map((role) => ({
                      label: t(role),
                      value: role,
                    }))}
                  />
                </span>
              </>
            )}
          />

          <div className="pr-3 pb-3 pl-3 my-4 surface-border border-2">
            <h4 className="heading-4">{t('user_address')}</h4>

            <Controller
              name={`users.${i}.address.address_line_1`}
              control={control}
              rules={{
                required: t('messages.required', {
                  field: t('address_line_1'),
                }),
              }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label mt-4">
                    <InputText
                      id={field.name}
                      placeholder={t('address_line_1')}
                      className={classNames({
                        'p-invalid': fieldState.error,
                      })}
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
              name={`users.${i}.address.address_line_2`}
              control={control}
              render={({ field }) => (
                <span className="p-float-label mt-4">
                  <InputText
                    id={field.name}
                    placeholder={t('address_line_2')}
                    {...field}
                  />
                  <label htmlFor={field.name}>{t('address_line_2')}</label>
                </span>
              )}
            />

            <Controller
              name={`users.${i}.address.city`}
              control={control}
              rules={{
                required: t('messages.required', { field: t('city') }),
              }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label mt-4">
                    <InputText
                      id={field.name}
                      placeholder={t('city')}
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.error,
                      })}
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
              name={`users.${i}.address.state`}
              control={control}
              rules={{
                required: t('messages.required', { field: t('state') }),
              }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label mt-4">
                    <InputText
                      id={field.name}
                      placeholder={t('state')}
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.error,
                      })}
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
              name={`users.${i}.address.postal_code`}
              control={control}
              rules={{
                required: t('messages.required', {
                  field: t('postal_code'),
                }),
              }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label mt-4">
                    <InputText
                      id={field.name}
                      placeholder={t('postal_code')}
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.error,
                      })}
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
              name={`users.${i}.address.country`}
              control={control}
              rules={{
                required: t('messages.required', { field: t('country') }),
              }}
              render={({ field, fieldState }) => (
                <>
                  <span className="p-float-label mt-4">
                    <InputText
                      id={field.name}
                      placeholder={t('country')}
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.error,
                      })}
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
          </div>
        </div>
      ))}

      <div className="flex mt-4 gap-3">
        <Button
          type="button"
          label={t('remove_user')}
          icon="pi pi-user-minus"
          className="p-button-sm p-button-outlined p-button-danger"
          disabled={fields.length === 1}
          onClick={() => fields.length !== 1 && remove(fields.length - 1)}
        />

        <Button
          type="button"
          label={t('add_user')}
          icon="pi pi-user-plus"
          className="p-button-sm p-button-outlined p-button-secondary"
          onClick={() => append({ ...defaultUserValues })}
        />
      </div>

      <Divider />

      <div className="flex justify-content-end gap-3">
        <Link className="no-underline" to="/login">
          <Button
            label={t('login')}
            icon="pi pi-sign-in"
            className="p-button-raised p-button-text"
          />
        </Link>

        <Button label={t('register')} icon="pi pi-plus" type="submit" />
      </div>
    </form>
  )
}

export default Register
