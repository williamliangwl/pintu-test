import { Text } from '../Text';

export function TableEmptyState() {
  return (
    <div className="w-full py-20">
      <Text className="text-center text-gray-500" variant="sm">
        No Data Available
      </Text>
    </div>
  );
}
