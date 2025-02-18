'use client'
import React from 'react'
import { Controller } from "react-hook-form"
import FormFields from "./FormFields.json"

const customInput = ({
  name,
  control,
  type,
  Style,
  label=true,
  icon,
  labelIcon,
  autoComplete
}) => {
  const InputType = type === 'textarea' ? 'textarea' : 'input'
  const FieldName =  FormFields[name]
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={`${Style.form_field} `} >
            {label && (
              <label className={`${Style.label}`} >
                {labelIcon && (<span className={` ${Style.labelicon}`}>{labelIcon}</span>)}
                { FieldName?.label}</label>
            )}

            <div className={`${Style.input_wrapper} ${icon ? Style.input_wrapper_icon : ""}`} >
              <InputType
                type={type}
                placeholder={FieldName?.placeholder}
                className={`${Style.input}`}
                {...field}
                value={field?.value || ""}
                autoComplete={autoComplete}
              />
              {icon && (<span className={` ${Style.icon}`} >{icon}</span>)}
            </div>
            {error && <span className={`${Style.error_message}`}>{error.message}</span>}
          </div>
        )
      }}
    />

  )
}

export default customInput;