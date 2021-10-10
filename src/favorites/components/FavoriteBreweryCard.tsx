import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Paper, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Brewery, getBrewery } from '../../breweries/BreweryAPI';
import { concat, setDefaultPlaceholderImage } from '../../shared/util/helpers';

export default function FavoriteBreweryCard({
  id,
  onDelete,
}: {
  id: string;
  onDelete: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}) {
  const [brewery, setBrewery] = useState<Brewery>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const data = await getBrewery(id);
        setBrewery(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchBrewery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Link to={`/breweries/${id}`} style={{ textDecoration: 'none' }}>
      <Box
        component={Paper}
        elevation={1}
        sx={{ p: '1rem' }}
        display="flex"
        alignItems="center"
        gap="10px"
      >
        {!brewery ? (
          <Skeleton variant="rectangular" width={80} height={80}></Skeleton>
        ) : (
          <img
            style={{ borderRadius: '8px', backgroundColor: '#bdbdbd' }}
            src={`https://logo.clearbit.com/${brewery.website_url}`}
            alt="Brewery logo"
            width={80}
            height={80}
            onError={setDefaultPlaceholderImage}
          />
        )}
        <Box flex="1">
          <Typography>
            {!brewery ? <Skeleton></Skeleton> : brewery.name}
          </Typography>
          <Typography>
            {!brewery ? (
              <Skeleton></Skeleton>
            ) : (
              concat([
                brewery.street,
                brewery.city,
                brewery.state,
                brewery.country,
              ])
            )}
          </Typography>
        </Box>
        <IconButton
          style={{ color: '#f44336' }}
          aria-label="delete"
          onClick={(event) => onDelete(event, id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Link>
  );
}
