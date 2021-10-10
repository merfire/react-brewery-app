import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Home.scss';

export function Home() {
  const history = useHistory();

  const [name, setName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value;
      setName(value);
      history.push(`/breweries?by_name=${name}&page=0&per_page=10`);
    }
  };

  return (
    <div className="home">
      <img
        src="https://logo.clearbit.com/hopsandbarleyco.com"
        alt="Brewery logo"
        width="128"
        height="128"
      />

      <Typography variant="h4">Hops & Barley Breweries Search</Typography>

      <div className="search-wrapper">
        <TextField
          className="input"
          value={name}
          onChange={handleInputChange}
          onKeyDown={onKeyPress}
          placeholder="Enter brewery name"
        />

        <Button
          className="search-button"
          component={Link}
          variant="contained"
          to={`/breweries?by_name=${name}&page=0&per_page=10`}
          disableElevation
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>

      <Button
        className="favorites-button"
        component={Link}
        variant="contained"
        to={`/favorites`}
        disableElevation
        startIcon={<FavoriteIcon />}
      >
        Favorites
      </Button>
    </div>
  );
}
