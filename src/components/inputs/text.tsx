import { TextField, TextFieldProps } from '@mui/material'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { Label } from './label'

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
  defaultValue,
  value,
  type,
  disabled,
  name,
  InputProps,
  TextFieldProps,
}: InputTextProps) {
  const [inputValue, setInputValue] = useState(value ?? defaultValue ?? '')

  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  return (
    <Label label={label} required={required}>
      <TextField
        name={name}
        defaultValue={defaultValue}
        error={required && !inputValue}
        helperText={helperText}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value

          setInputValue(newValue)
          onChange(newValue, !!required && !newValue)
        }}
        variant='outlined'
        size='small'
        className='min-h-[70px]'
        type={type ?? 'text'}
        InputProps={{
          inputProps: { min: 0 },
          ...InputProps,
        }}
        fullWidth
        disabled={disabled}
        {...TextFieldProps}
      />
    </Label>
  )
}
