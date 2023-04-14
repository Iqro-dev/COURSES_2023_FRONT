import { Autocomplete, TextField } from '@mui/material'
import { useDioceses } from '../../hooks/diocese/use-dioceses'
import { useEffect } from 'react'

export type Option = {
  value: number | undefined
  label: string
}

export let diocesesOptions: Option[] = []

interface DiocesesAutocompleteProps {
  onChange: (value: number) => void
  value?: number
  defaultValue?: number
}

export function DiocesesAutocomplete({ onChange, value, defaultValue }: DiocesesAutocompleteProps) {
  const { dioceses } = useDioceses()

  useEffect(() => {
    diocesesOptions = dioceses.map((diocese) => ({ value: diocese.id, label: diocese.name }))
  }, [dioceses])

  return (
    <Autocomplete
      sx={{ minWidth: 250 }}
      defaultValue={diocesesOptions.find((c) => c.value === defaultValue ?? -1)}
      value={diocesesOptions.find((c) => c.value === value ?? -1)}
      onChange={(_, e) => {
        onChange(e?.value ?? -1)
      }}
      renderInput={(params) => <TextField {...params} label='Diecezja' variant='outlined' />}
      options={diocesesOptions}
    />
  )
}
