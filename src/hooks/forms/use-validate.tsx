import { useCallback } from 'react'
import { ValidationError, Schema } from 'yup'

export function useValidationResolver(validationSchema: Schema) {
  return useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        })
        return {
          values,
          errors: {},
        }
      } catch (errors) {
        if (!(errors instanceof ValidationError))
          return {
            values: {},
            errors: {
              '': {
                type: 'validation',
                message: 'Wystąpił błąd podczas walidacji',
              },
            },
          }
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path!]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        }
      }
    },
    [validationSchema],
  )
}
