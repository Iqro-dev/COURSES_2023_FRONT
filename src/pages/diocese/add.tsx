import { Typography } from '@mui/material'
import { Diocese } from '../../types/diocese/diocese'
import { useState } from 'react'
import { InputText } from '../../components/inputs/text'
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
      <Typography variant='h5'>Dodaj diecezje</Typography>

      <InputText onChange={(e) => setDiocese({ ...diocese, name: e })} />

      <LoadingButton color='success' onClick={handleAddDiocese}>
        Dodaj
      </LoadingButton>
    </>
  )
}
