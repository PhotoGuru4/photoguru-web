import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '@shared/constants/routes';

interface BackButtonProps {
  size?: number;
  fallback?: string;
}

export const BackButton = ({
  size = 24,
  fallback = ROUTES.HOME,
}: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const from = location.state?.from as string | undefined;
    if (from) {
      navigate(from);
      return;
    }

    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(fallback);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="
        inline-flex items-center gap-2
        text-sm font-medium text-gray-600
        hover:text-gray-700
        transition
      "
      aria-label="Go back"
    >
      <ArrowLeft size={size} />
    </button>
  );
};
