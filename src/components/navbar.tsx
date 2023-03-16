import { Box, AppBar, Toolbar, Typography } from '@mui/material';

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kursy przedmałżeńskie</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
