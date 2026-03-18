import ConceptCard from '@features/concept/components/ConceptCard';

interface Concept {
  id: number;
  title: string;
  category: string;
  date: string;
  packages: number;
  images: string[];
}

interface Props {
  data: Concept[];
}

const ConceptGrid = ({ data }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {data.map((item) => (
        <ConceptCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ConceptGrid;
