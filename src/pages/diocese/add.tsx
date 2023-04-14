import { Grid, TextField, Typography } from '@mui/material'
import { Diocese } from '../../types/diocese/diocese'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function AddDiocese() {
  const [diocese, setDiocese] = useState<Diocese>()

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const handleAddDiocese = () => {
    getApiResponse('/dioceses', Methods.POST, diocese).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Diecezja została dodana', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'success',
      })

      navigate(-1)
    })
  }

  return (
    <>
      <Grid container direction='column' gap={2} sx={{ padding: 2 }}>
        <Typography variant='h4'>Dodaj diecezje</Typography>

        <TextField
          label={'Nazwa diecezji'}
          required
          onChange={(e) => setDiocese({ ...diocese, name: e.currentTarget.value })}
        />

        <LoadingButton
          color='success'
          disabled={!diocese?.name}
          variant='contained'
          onClick={handleAddDiocese}
          sx={{ width: 150, alignSelf: 'end' }}
        >
          Dodaj
        </LoadingButton>
      </Grid>
    </>
  )
}
