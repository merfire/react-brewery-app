const favoritesKey = 'favorites_key';

export const getFavorites = () => {
  const favorites: string[] = JSON.parse(
    localStorage.getItem(favoritesKey) || '[]'
  );

  return favorites;
};

export const addToFavorites = (id: string) => {
  const favorites = getFavorites();
  if (favorites.includes(id)) return;

  favorites.push(id);
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
};

export const deleteFavorite = (id: string) => {
  let favorites = getFavorites();
  favorites = favorites.filter((e) => e !== id);
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
};

export const hasFavorite = (id: string) => {
  const favorites = getFavorites();
  return favorites.includes(id);
};
