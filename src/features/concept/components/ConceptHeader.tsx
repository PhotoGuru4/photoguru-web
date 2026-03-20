import { useState } from 'react';
import { Heading, Text, Button } from '@shared/components/common';
import { BackButton } from '@shared/components/common/BackButton';
import { Plus } from 'lucide-react';
import CreateConceptModal from '@features/concept/components/CreateConceptModal';

const ConceptHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
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

        <Button
          icon={<Plus size={16} />}
          onClick={() => setOpen(true)}
        >
          Add New Concept
        </Button>
      </div>

      <CreateConceptModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ConceptHeader;
