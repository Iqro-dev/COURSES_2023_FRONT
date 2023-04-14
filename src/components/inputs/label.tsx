import { InputLabel } from '@mui/material'
import { PropsWithChildren } from 'react'

interface LabelProps {
  label?: string | JSX.Element
  required?: boolean
}

export function Label({ children, label, required }: PropsWithChildren<LabelProps>) {
  return (
    <div className='flex flex-col justify-center md:justify-start md:flex-row items-start md:gap-4'>
      {label && (
        <div className='min-w-[220px]'>
          <InputLabel required={required}>{label}</InputLabel>
        </div>
      )}
      {children}
    </div>
  )
}
