import { Heading, Text } from '@shared/components/common';

interface Stat {
  label: string;
  value: number;
}

interface Props {
  stats: Stat[];
}

const ConceptStats = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((item) => {
        const isThisMonth = item.label === 'This month';

        return (
          <div
            key={item.label}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <Text variant="caption" color="muted">
              {item.label}
            </Text>

            <Heading
              level={4}
              className={`mt-2 ${isThisMonth ? 'text-pink-500' : ''}`}
            >
              {item.value}
            </Heading>
          </div>
        );
      })}
    </div>
  );
};

export default ConceptStats;
