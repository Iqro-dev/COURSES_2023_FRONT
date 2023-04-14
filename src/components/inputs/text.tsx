import { TextField, TextFieldProps } from '@mui/material'
import { InputHTMLAttributes } from 'react'

interface InputTextProps {
  onChange: (value: string, error: boolean) => void
  label?: string
  required?: boolean
  helperText?: string
  defaultValue?: string
  name?: string
  type?: InputHTMLAttributes<unknown>['type']
  disabled?: boolean
  value?: string
  InputProps?: TextFieldProps['InputProps']
  TextFieldProps?: TextFieldProps
}

export function InputText({
  label,
  required,
  onChange,
  helperText,
  value,
  type,
  disabled,
  InputProps,
  TextFieldProps,
}: InputTextProps) {
  return (
    <>
      <TextField
        label={label}
        type={type ?? 'text'}
        disabled={disabled}
        helperText={helperText}
        onChange={(e) => {
          const newValue = e.target.value

          onChange(newValue, !!required && !newValue)
        }}
        InputProps={{ inputProps: { min: 0 }, ...InputProps }}
        value={value}
        required={required}
        InputLabelProps={{ shrink: true }}
        {...TextFieldProps}
      />
    </>
  )
}
