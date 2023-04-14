import { Grid, Typography, Box, Stack, Button } from '@mui/material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDiocese } from '../../hooks/diocese/use-diocese'
import { useParishes } from '../../hooks/parish/use-parishes'
import { useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Preview } from '@mui/icons-material'
import { InputText } from '../../components/inputs/text'
import { Diocese } from '../../types/diocese/diocese'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'

export default function DioceseDetails() {
  const [params] = useSearchParams()

  const id = params.get('id')

  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const { diocese, loaded } = useDiocese(parseInt(id ?? ''))

  const { getApiResponse } = useApi()

  const [dioceseDetails, setDioceseDetails] = useState<Diocese>({ name: '' })

  const { parishes } = useParishes()

  const columns: GridColDef[] = [
    {
      field: 'ordinalNumber',
      headerName: 'Lp.',
      width: 75,
    },
    {
      field: 'name',
      headerName: 'Nazwa Parafii',
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Adres Parafii',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params: { id: any }) => [
        <GridActionsCellItem
          label={''}
          icon={<Preview />}
          onClick={() => navigate(`/dashboard/parishes/details?id=${params.id}`)}
        />,
      ],
      flex: 1,
      align: 'right',
    },
  ]

  const handleEdit = () => {
    setDioceseDetails({ ...dioceseDetails, name: dioceseDetails.name.trim() })

    getApiResponse('/dioceses', Methods.PUT, dioceseDetails).then((res) => {
      if (!res.isSuccess)
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

      enqueueSnackbar('Zmiany zostały zapisane', {
        autoHideDuration: 3000,
        preventDuplicate: true,
        variant: 'info',
      })

      navigate(-1)
    })
  }

  useEffect(() => {
    if (diocese) setDioceseDetails(diocese)
  }, [loaded])

  return (
    <>
      <Grid container direction='column' gap={3} sx={{ padding: 2 }}>
        <Typography variant='h4'>Szczegóły:</Typography>

        <Stack direction='row' alignItems='center' gap={2}>
          <Typography variant='h6'>Nazwa diecezji:</Typography>
          <InputText
            onChange={(e) => setDioceseDetails({ ...diocese, name: e })}
            value={dioceseDetails.name}
            defaultValue={diocese?.name}
          />
        </Stack>

        <Button variant='contained' color='success' sx={{ width: 150 }} onClick={handleEdit}>
          Zapisz
        </Button>

        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={
              parishes
                ?.filter((p) => p.dioceseId === diocese?.id)
                .map((u, idx) => ({
                  ...u,
                  ordinalNumber: idx + 1,
                })) ?? []
            }
            columns={columns}
          />
        </Box>
      </Grid>
    </>
  )
}
