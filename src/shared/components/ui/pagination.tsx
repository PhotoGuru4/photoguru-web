import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button, Text } from '@shared/components/common';
import clsx from 'clsx';

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={clsx('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={clsx('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={clsx(className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const PaginationLink = ({
  isActive,
  children,
  onClick,
  disabled,
  className,
}: PaginationLinkProps) => {
  return (
    <Button
      unstyled
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors',
        isActive
          ? 'border-pink-500 text-pink-500'
          : 'border-input bg-background hover:bg-accent hover:text-accent-foreground',
        className,
      )}
    >
      {children}
    </Button>
  );
};

const PaginationPrevious = (props: PaginationLinkProps) => (
  <PaginationLink {...props}>
    <ChevronLeft className="h-4 w-4" />
  </PaginationLink>
);

const PaginationNext = (props: PaginationLinkProps) => (
  <PaginationLink {...props}>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);

const PaginationEllipsis = ({ className }: { className?: string }) => (
  <Text
    className={clsx(
      'flex h-9 w-9 items-center justify-center text-muted-foreground',
      className,
    )}
  >
    <MoreHorizontal className="h-4 w-4" />
  </Text>
);

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
