import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'
import { useDioceses } from '../../hooks/diocese/use-dioceses'
import { useEffect } from 'react'
import { Option } from '../../types/option'

export let diocesesOptions: Option[] = []

export function DiocesesAutocomplete(
  props: Omit<
    AutocompleteProps<Option, undefined, undefined, undefined, 'div'>,
    'options' | 'renderInput' | 'getOptionLabel' | 'loading'
  >,
) {
  const { dioceses } = useDioceses()

  useEffect(() => {
    diocesesOptions = dioceses.map((diocese) => ({ value: diocese.id, label: diocese.name }))
  }, [dioceses])

  return (
    <Autocomplete
      {...props}
      renderInput={(params) => <TextField {...params} label='Diecezja' variant='outlined' />}
      options={diocesesOptions}
    />
  )
}
