import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { concat, setDefaultPlaceholderImage } from '../../shared/util/helpers';
import { Brewery, getBrewery } from '../BreweryAPI';
import { addToFavorites, deleteFavorite, hasFavorite } from '../BreweryStorage';
import './BreweryDetails.scss';
import BreweryDetailsSkeleton from './components/BreweryDetailsSkeleton';

export default function BreweryDetails() {
  const { id } = useParams<{ id: string }>();

  const [brewery, setBrewery] = useState<Brewery>();

  const [error, setError] = useState<any>();
  const [isFavorite, setIsFavorite] = useState(false);

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

  useEffect(() => {
    updateIsFavorite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateIsFavorite = () => {
    if (hasFavorite(id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!brewery) {
    return <BreweryDetailsSkeleton></BreweryDetailsSkeleton>;
  }

  return (
    <div className="brewery">
      <div className="wrapper align-center">
        <img
          className="logo"
          src={`https://logo.clearbit.com/${brewery.website_url}`}
          alt="Brewery logo"
          width={150}
          height={150}
          onError={setDefaultPlaceholderImage}
        />
        <div>
          <Typography variant="h4">{brewery.name}</Typography>
          <p className="type">
            Type: <span>{brewery.brewery_type}</span>
          </p>
        </div>
      </div>
      <div className="wrapper">
        {brewery.latitude && brewery.longitude ? (
          <iframe
            title="Brewery Map"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://maps.google.com/maps?q=${brewery.latitude}, ${brewery.longitude}&z=15&output=embed`}
          ></iframe>
        ) : null}

        <div>
          <p>Address</p>
          <b>
            {concat([
              brewery.street,
              brewery.city,
              brewery.state,
              brewery.country,
            ])}
          </b>

          {brewery.phone ? (
            <Fragment>
              <p>Phone</p>
              <b>{brewery.phone}</b>
            </Fragment>
          ) : null}

          {brewery.website_url ? (
            <Fragment>
              <p>Website Url</p>
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noreferrer nofollow"
              >
                {brewery.website_url}
              </a>
            </Fragment>
          ) : null}

          <div>
            {isFavorite ? (
              <Button
                className="favorite-button delete"
                variant="contained"
                disableElevation
                startIcon={<DeleteIcon />}
                onClick={() => {
                  deleteFavorite(brewery.id);
                  updateIsFavorite();
                }}
              >
                Remove from favorites
              </Button>
            ) : (
              <Button
                className="favorite-button"
                variant="contained"
                disableElevation
                startIcon={<FavoriteIcon />}
                onClick={() => {
                  addToFavorites(brewery.id);
                  updateIsFavorite();
                }}
              >
                Add to favorites
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
