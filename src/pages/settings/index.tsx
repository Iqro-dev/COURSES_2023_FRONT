import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import Image from 'mui-image'

export default function SettingsPage() {
  const [color, setColor] = useState('#000000')

  return (
    <>
      <Typography variant='h4'>Ustawienia:</Typography>

      <Grid container direction='row' sx={{ paddingTop: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5'>Tytuł strony</Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Typography variant='h5'>Zdjęcie strony</Typography>

          <Box>
            <Image src={''} height='164px' duration={500} />

            <LoadingButton variant='contained' component='label'>
              Dodaj
              <input type='image' hidden accept='image/*' onChange={(e) => console.log(e)} />
            </LoadingButton>
          </Box>
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

              <Button fullWidth variant='contained' color='success'>
                Zapisz
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
