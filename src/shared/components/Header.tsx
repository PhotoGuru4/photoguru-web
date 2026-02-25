import { Link } from 'react-router-dom';
import sidebarLogo from '@assets/sidebarLogo.png';
import { ROUTES } from '@shared/constants/routes';

const Header = () => {
  return (
    <header className="flex justify-end sm:justify-between bg-white px-6 shadow-sm z-10">
      <Link to={ROUTES.HOME} className="flex justify-center">
        <img
          src={sidebarLogo}
          alt="Logo"
          className="w-30 sm:w-42"
        />
      </Link>
    </header>
  );
};

export default Header;
