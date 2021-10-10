import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteFavorite, getFavorites } from '../breweries/BreweryStorage';
import FavoriteBreweryCard from './components/FavoriteBreweryCard';
import NoFavorites from './components/NoFavorites';
import './Favorites.scss';

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFavorites = () => {
    const data = getFavorites();
    setFavorites(data);
  };

  const onDelete = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    deleteFavorite(id);
    fetchFavorites();
  };

  return (
    <div className="container favorites">
      <Typography variant="h4">Favorites</Typography>

      {favorites.length === 0 ? (
        <NoFavorites></NoFavorites>
      ) : (
        <div className="grid">
          {favorites.map((id) => (
            <FavoriteBreweryCard
              key={id}
              id={id}
              onDelete={onDelete}
            ></FavoriteBreweryCard>
          ))}
        </div>
      )}
    </div>
  );
}
