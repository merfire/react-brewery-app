import { SyntheticEvent } from 'react';

// Filters array of strings and removes null and undefined, then joins them using ", "
export const concat = (array: Array<string | null | undefined>) => {
  return array.filter(Boolean).join(', ');
};

// Used for onError on img element, sets default placeholder image if img src is invalid
export const setDefaultPlaceholderImage = (event: SyntheticEvent) => {
  (event.target as HTMLImageElement).src =
    'https://source.unsplash.com/3o-rcD2dBxU/128x128';
};
