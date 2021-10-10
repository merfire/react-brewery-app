import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './BackToHome.scss';

export default function BackToHome() {
  const location = useLocation();

  const isHomePage = () => {
    return location.pathname === '/';
  };

  if (isHomePage()) {
    return null;
  }

  return (
    <Button
      id="back-to-home"
      component={Link}
      variant="contained"
      to={`/`}
      disableElevation
      startIcon={<HomeIcon />}
    >
      <span className="back-to-home-text">Back To Home</span>
    </Button>
  );
}
