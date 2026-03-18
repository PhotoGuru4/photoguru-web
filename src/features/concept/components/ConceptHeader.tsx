import { Heading, Text, Button } from '@shared/components/common';
import { BackButton } from '@shared/components/common/BackButton';
import { Plus } from 'lucide-react';

const ConceptHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <BackButton />
        <div>
          <Heading level={3}>Portfolio Management</Heading>
          <Text variant="caption" color="muted">
            Manage and showcase your photography work
          </Text>
        </div>
      </div>

      <Button icon={<Plus size={16} />}>
        Add New Concept
      </Button>
    </div>
  );
};

export default ConceptHeader;
