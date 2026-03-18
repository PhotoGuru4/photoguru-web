import {
  ConceptGrid,
  ConceptStats,
  ConceptHeader,
} from '@features/concept/components';
import { PaginationControl } from '@shared/components/common/PaginationControl';
import { useConcepts } from '@features/concept/hooks/useConcepts';

const Concept = () => {
  const {
    concepts,
    stats,
    page,
    totalPages,
    setPage,
    isLoading,
  } = useConcepts();

  return (
    <div className="p-6 space-y-6">
      <ConceptHeader />

      {isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        stats && (
          <ConceptStats
            stats={[
              { label: 'Total concepts', value: stats.totalConcepts },
              { label: 'This month', value: stats.thisMonth },
              { label: 'Categories', value: stats.categories },
            ]}
          />
        )
      )}

      {isLoading ? (
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <ConceptGrid data={concepts} />
      )}

      {!isLoading && (
        <div className="flex justify-center pt-4">
          <PaginationControl
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Concept;
