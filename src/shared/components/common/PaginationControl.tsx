import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@shared/components/ui/pagination';

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGE_WINDOW = 3;

export const PaginationControl = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages === 1) return null;

  if (totalPages <= 4) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              onClick={() => page > 1 && onPageChange(page - 1)}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              disabled={page === totalPages}
              onClick={() => page < totalPages && onPageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  let startPage = page - 1;

  if (startPage < 1) startPage = 1;
  if (startPage + PAGE_WINDOW > totalPages) {
    startPage = totalPages - PAGE_WINDOW;
  }

  const pages = Array.from({ length: PAGE_WINDOW }).map(
    (_, i) => startPage + i,
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => page > 1 && onPageChange(page - 1)}
          />
        </PaginationItem>

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={page === p}
              onClick={() => onPageChange(p)}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            isActive={page === totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            disabled={page === totalPages}
            onClick={() => page < totalPages && onPageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
