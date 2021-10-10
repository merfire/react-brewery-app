import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '../../shared/hooks/use-query-hook';
import { concat } from '../../shared/util/helpers';
import { Brewery, getBreweries } from '../BreweryAPI';
import './Breweries.scss';
import BreweriesSkeleton from './components/BreweriesSkeleton';
import NoBreweries from './components/NoBreweries';

export default function Breweries() {
  const query = useQuery();
  const history = useHistory();
  const name = query.get('by_name') || '';
  const page = parseInt(query.get('page') || '0');
  const rowsPerPage = parseInt(query.get('per_page') || '10');

  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        setLoading(true);
        const data = await getBreweries({ name, page, rowsPerPage });
        setBreweries(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBreweries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleRowClick = (id: string) => {
    history.push(`breweries/${id}`);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    history.push(
      `breweries?by_name=${name}&page=${newPage}&per_page=${rowsPerPage}`
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    history.push(
      `breweries?by_name=${name}&page=0&per_page=${event.target.value || '10'}`
    );
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (breweries.length === 0) {
    return loading ? (
      <BreweriesSkeleton></BreweriesSkeleton>
    ) : (
      <NoBreweries></NoBreweries>
    );
  }

  return (
    <div className="breweries">
      {name ? (
        <Typography variant="h4">
          Search result for: <span>{name}</span>
        </Typography>
      ) : (
        <Typography variant="h4">
          <span>List of all breweries</span>
        </Typography>
      )}

      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="right">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {breweries.map((b) => (
              <TableRow key={b.id} onClick={() => handleRowClick(b.id)}>
                <TableCell component="th" scope="row">
                  {b.name}
                </TableCell>
                <TableCell align="center">{b.brewery_type}</TableCell>
                <TableCell align="right">
                  {concat([b.city, b.state, b.country])}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={-1}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{
            disabled: breweries.length % rowsPerPage === 0 ? false : true,
          }}
          labelDisplayedRows={({ from, to, count, page }) =>
            `Showing: ${from} - ${to}`
          }
        />
      </TableContainer>
    </div>
  );
}
