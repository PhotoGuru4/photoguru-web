import { Button } from '@shared/components/common/Button';

interface Props {
  onCancel?: () => void;
  onBack?: () => void;
  onSubmit: () => void;
  submitText: string;
  disabled?: boolean;
  loading?: boolean;
  showBack?: boolean;
}

const ActionButtons = ({
  onCancel,
  onBack,
  onSubmit,
  submitText,
  disabled = false,
  loading = false,
  showBack = false,
}: Props) => {
  return (
    <div className="flex justify-end gap-4 pt-4">
      {(onCancel || onBack) && (
        <Button
          variant="outline"
          size="md"
          onClick={onBack || onCancel}
          fullWidth
          disabled={loading}
        >
          {showBack ? 'Back' : 'Cancel'}
        </Button>
      )}

      <Button
        variant="solid"
        size="md"
        onClick={onSubmit}
        fullWidth
        disabled={disabled || loading}
      >
        {loading ? 'Saving...' : submitText}
      </Button>
    </div>
  );
};

export default ActionButtons;
