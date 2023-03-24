import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { SketchPicker } from 'react-color'
import Image from 'mui-image'

export default function SettingsPage() {
  const [color, setColor] = useState('#000000')
  const [file, setFile] = useState<string>('');

  function setFileInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <Grid container direction='column' sx={{ padding: 2 }}>
        <Typography variant='h4'>Ustawienia:</Typography>

        <Grid container direction='row' sx={{ paddingTop: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='h5'>Tytuł strony</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant='h5'>Kolor strony</Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
                flexDirection: 'row',
                gap: 2,
                paddingY: 2,
              }}
            >
              <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  value={color}
                  label={'Wybrany kolor'}
                  onChange={(e) => setColor(e.currentTarget.value)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>


        <Grid item>
          <Typography variant='h5'>Zdjęcie strony</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 4 }}>
            <Image src={file} height="200px" duration={500} style={{ borderRadius: '12px' }} />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <LoadingButton variant='contained' component='label'>
                Dodaj zdjęcie
                <input type='file' hidden onChange={(e) => setFileInput(e)} />
              </LoadingButton>


              <Button variant='contained' color='success'>
                Zapisz
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
