import { Autocomplete, AutocompleteProps, FormControl, FormHelperText, TextField } from '@mui/material'
import { useDioceses } from '../../hooks/diocese/use-dioceses'
import { useEffect } from 'react'
import { Option } from '../../types/option'

export let diocesesOptions: Option[] = []

export function DiocesesAutocomplete(
  props: Omit<
    AutocompleteProps<Option, undefined, undefined, undefined, 'div'>,
    'options' | 'renderInput' | 'getOptionLabel' | 'loading'
  > & { error?: boolean },
) {
  const { dioceses } = useDioceses()

  useEffect(() => {
    diocesesOptions = dioceses.map((diocese) => ({ value: diocese.id, label: diocese.name }))
  }, [dioceses])

  const { error, ...rest } = props

  return (
    <FormControl error={error}>
      <Autocomplete
        {...rest}
        renderInput={(params) => <TextField error={error} {...params} label='Diecezja' variant='outlined' />}
        options={diocesesOptions}
      />
      <FormHelperText>{error && 'Proszę wybrać diecezję'}</FormHelperText>
    </FormControl>
  )
}
