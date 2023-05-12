import { LoadingButton } from '@mui/lab'
import {
  Box,
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'
import Image from 'mui-image'
import { useSettings } from '../../hooks/settings/use-settings'
import { useApi } from '../../hooks/use-api'
import { Methods } from '../../types/fetch-methods'
import { useSnackbar } from 'notistack'
import { Delete } from '@mui/icons-material'
import { ImageObject } from '../../types/settings/image-object'
import { useImages } from '../../hooks/settings/use-images'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const { header: headerImage, logo: logoImage, loaded: loadedImages } = useImages()

  const [logo, setLogo] = useState<ImageObject>({})
  const [header, setHeader] = useState<ImageObject>({})

  const imagesArray = [
    { title: 'Dodaj zdjęcie nagłówka', set: setHeader, value: header, type: 'header_image' },
    { title: 'Dodaj logo', set: setLogo, value: logo, type: 'logo_image' },
  ]

  const { getApiResponse } = useApi()

  const { enqueueSnackbar } = useSnackbar()

  const { settings, loaded, reload } = useSettings()

  const [inputSettings, setInputSettings] = useState({
    headerText: 'Brak tytułu',
    headerColor: '#000000',
  })

  const createFormData = (img: File, type: string) => {
    const formData = new FormData()

    formData.append('image_type', type)
    formData.append('file', img)

    return formData
  }

  function setFileInput(e: ChangeEvent<HTMLInputElement>, type: string) {
    if (e.target.files) {
      console.log(e.target.files[0])
      if (type === 'header_image')
        setHeader({ objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
      else if (type === 'logo_image')
        setLogo({ objectUrl: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
    }
  }

  const handleSaveSettings = () => {
    setLoading(true)
    const settingsPromise = getApiResponse('/settings', Methods.POST, inputSettings)

    const imagePromises = []

    if (header.file)
      imagePromises.push(
        getApiResponse(
          '/settings/images',
          Methods.POST,
          createFormData(header.file, 'header_image'),
          true,
        ),
      )
    else if (logo.delete)
      imagePromises.push(getApiResponse('/settings/images?type=header_image', Methods.DELETE))

    if (logo.file)
      imagePromises.push(
        getApiResponse(
          '/settings/images',
          Methods.POST,
          createFormData(logo.file, 'logo_image'),
          true,
        ),
      )
    else if (logo.delete)
      imagePromises.push(getApiResponse('/settings/images?type=logo_image', Methods.DELETE))

    console.log('promki', settingsPromise, ...imagePromises)

    Promise.all(
      [settingsPromise, ...imagePromises].map(
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

        setLoading(false)
        reload()
      })
      .catch(() => {
        enqueueSnackbar('Coś poszło nie tak', {
          autoHideDuration: 3000,
          preventDuplicate: true,
          variant: 'error',
        })

        setLoading(false)
      })
  }

  useEffect(() => {
    setInputSettings(settings)
  }, [loaded])

  useEffect(() => {
    setLogo(logoImage)
    setHeader(headerImage)
  }, [loadedImages])

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

        <Grid container direction='row' gap={2}>
          {imagesArray.map(({ title, set, value, type }, index) => (
            <Grid item xs={12} md={5} key={index}>
              <Typography variant='h5'>{title}</Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
                <ImageListItem>
                  <Image
                    src={value.objectUrl ?? ''}
                    height='200px'
                    duration={500}
                    style={{ borderRadius: '12px' }}
                  />

                  {value.file && (
                    <ImageListItemBar
                      title={value.file?.name ?? 'Brak zdjęcia'}
                      sx={{ borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          onClick={() => set({ delete: true })}
                        >
                          <Delete />
                        </IconButton>
                      }
                    />
                  )}
                </ImageListItem>

                <Box
                  sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                >
                  <LoadingButton variant='contained' component='label'>
                    Dodaj zdjęcie
                    <input type='file' hidden onChange={(e) => setFileInput(e, type)} />
                  </LoadingButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <LoadingButton
          loading={loading}
          variant='contained'
          color='success'
          onClick={handleSaveSettings}
        >
          Zapisz
        </LoadingButton>
      </Grid>
    </>
  )
}
