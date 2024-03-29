import { Autocomplete, AutocompleteProps, FormControl, FormHelperText, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useParishes } from '../../hooks/parish/use-parishes'

export type Option = {
  value: number | undefined
  label: string
}

export let parishesOptions: Option[] = []

export function ParishesAutocomplete(
  props: Omit<
    AutocompleteProps<Option, true, undefined, undefined, 'div'>,
    'options' | 'renderInput' | 'getOptionLabel' | 'loading'
  > & { error?: boolean },
) {
  const { parishes } = useParishes()

  useEffect(() => {
    parishesOptions = parishes.map((parish) => ({ value: parish.id, label: parish.name }))
  }, [parishes])

  const { error, ...rest } = props

  return (
    <FormControl error={error}>
      <Autocomplete
        {...rest}
        renderInput={(params) => <TextField error={error} {...params} label='Parafie' variant='outlined' />}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          );
        }}
        options={parishesOptions}
      />
      <FormHelperText>{error && 'Proszę wybrać parafię'}</FormHelperText>
    </FormControl>
  )
}
