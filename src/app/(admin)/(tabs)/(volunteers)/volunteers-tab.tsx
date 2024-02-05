import { columns } from './components/columns';
import { DataTable } from './components/data-table';

interface VolunteersProps {}

const Volunteers: React.FC<VolunteersProps> = async () => {
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">Volunteers</h1>
      <DataTable columns={columns} />
    </div>
  );
};

export default Volunteers;
