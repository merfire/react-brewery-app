import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

export default function BreweriesSkeleton() {
  return (
    <div className="container">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ my: '4rem' }}
      >
        <Skeleton width={300} height={50}></Skeleton>
      </Box>

      {Array(11)
        .fill(null)
        .map((e, i) => {
          return (
            <Skeleton
              key={i}
              animation="wave"
              height={40}
              sx={{ mb: 2 }}
            ></Skeleton>
          );
        })}
    </div>
  );
}
