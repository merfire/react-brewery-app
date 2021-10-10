import { Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function NoBreweries() {
  return (
    <Box
      className="container"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mt: '6rem' }}
    >
      <img src="/beer.svg" alt="Beer" width={600} height={400} />
      <Typography variant="h4" sx={{ my: '4rem' }}>
        Sorry, no breweries found for your search result.
      </Typography>
    </Box>
  );
}
