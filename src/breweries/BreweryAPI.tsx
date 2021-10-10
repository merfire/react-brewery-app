export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street?: string;
  city: string;
  state?: string;
  county_province?: any;
  postal_code: string;
  country: string;
  longitude?: string;
  latitude?: string;
  website_url?: string;
  phone?: string;
}

const BASE_URL = 'https://api.openbrewerydb.org';

export const getBreweries = async ({
  name,
  page = 0,
  rowsPerPage = 10,
}: {
  name: string;
  page: number;
  rowsPerPage: number;
}) => {
  const result = await fetch(
    `${BASE_URL}/breweries?by_name=${name}&page=${
      page + 1
    }&per_page=${rowsPerPage}`
  );
  const data = await result.json();
  return data as Brewery[];
};

export const getBrewery = async (id: string) => {
  const result = await fetch(`${BASE_URL}/breweries/${id}`);
  if (!result.ok) {
    return Promise.reject('Brewery not found.');
  }
  const data = await result.json();
  return data as Brewery;
};
