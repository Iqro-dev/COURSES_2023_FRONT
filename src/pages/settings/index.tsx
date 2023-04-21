import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import Image from 'mui-image'
import { useSettings } from '../../hooks/use-settings'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'

export default function SettingsPage() {
  const [file, setFile] = useState<string>('')

  const [formData] = useState(new FormData())

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const { settings, loaded, reload } = useSettings()

  const [inputSettings, setInputSettings] = useState({
    headerText: 'Brak tytułu',
    headerColor: '#000000',
  })

  function setFileInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      console.log(e.target.files[0])
      setFile(URL.createObjectURL(e.target.files[0]))
      formData.append('image_type', 'header_image')
      formData.append('file', e.target.files[0])
    }
  }

  const handleSaveSettings = () => {
    const settingsPromise = getApiResponse('/settings', Methods.POST, inputSettings)

    const imagesPromise = getApiResponse('/settings/images', Methods.POST, formData.get('file'))

    console.log(formData.get('file'))

    console.log(settingsPromise, imagesPromise)

    Promise.all(
      [settingsPromise, imagesPromise].map(
        (promise) =>
          new Promise(async (resolve, reject) => {
            const response = await promise
            if (!response.isSuccess) reject()
            resolve(response)
          }),
      ),
    )
      .then(() => {
        enqueueSnackbar('Zapisano', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'success',
        })

        return reload()
      })
      .catch(() => {
        return enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })
      })
  }

  useEffect(() => {
    setInputSettings(settings)
  }, [loaded])

  return (
    <>
      <Grid container direction='column' sx={{ padding: 2, gap: 4 }}>
        <Typography variant='h4'>Ustawienia:</Typography>

        <Grid item>
          <Typography variant='h5'>Tytuł strony</Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              paddingTop: 2,
              maxWidth: 300,
            }}
          >
            <TextField
              placeholder='Kursy...'
              value={inputSettings.headerText}
              onChange={(e) =>
                setInputSettings({ ...inputSettings, headerText: e.currentTarget.value })
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h5'>Kolor strony</Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 2,
              paddingY: 2,
            }}
          >
            <SketchPicker
              color={inputSettings.headerColor}
              onChangeComplete={(color) =>
                setInputSettings({ ...inputSettings, headerColor: color.hex })
              }
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                value={inputSettings.headerColor}
                label={'Wybrany kolor'}
                onChange={(e) =>
                  setInputSettings({ ...inputSettings, headerColor: e.currentTarget.value })
                }
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant='h5'>Zdjęcie strony</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Image src={file} height='200px' duration={500} style={{ borderRadius: '12px' }} />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <LoadingButton variant='contained' component='label'>
                Dodaj zdjęcie
                <input type='file' hidden onChange={(e) => setFileInput(e)} />
              </LoadingButton>

              <Button variant='contained' color='success' onClick={handleSaveSettings}>
                Zapisz
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
