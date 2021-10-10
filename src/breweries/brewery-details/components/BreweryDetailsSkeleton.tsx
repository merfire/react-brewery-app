import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';

export default function BreweryDetailsSkeleton() {
  return (
    <div className="container">
      <Box
        display="flex"
        gap="50px"
        alignItems="center"
        sx={{ mt: '5em', mb: '50px' }}
      >
        <Skeleton variant="rectangular" width={150} height={150}></Skeleton>
        <Box>
          <Skeleton variant="text" width={400} height={40}></Skeleton>
          <Skeleton variant="text" width={100} height={30}></Skeleton>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" gap="50px">
        <Skeleton variant="rectangular" width={400} height={400}></Skeleton>
        <Box>
          {Array(3)
            .fill(null)
            .map((e, i) => {
              return (
                <Box key={i}>
                  <Skeleton
                    width={60}
                    height={16}
                    sx={{ mt: '1em', mb: '0.5em' }}
                  ></Skeleton>
                  <Skeleton width={180} height={16}></Skeleton>
                </Box>
              );
            })}
        </Box>
      </Box>
    </div>
  );
}
