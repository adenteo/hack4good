import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import { useRouter } from 'next/router';

interface ActivitiesProps {}

const Activities: React.FC<ActivitiesProps> = async () => {
  const router = useRouter();
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl">All Activities</h1>
      <div className="mt-6">
        <DataTable columns={columns} />
      </div>
    </div>
  );
};

export default Activities;
