import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl mb-6">Admin</h1>
      <DataTable columns={columns} />
    </div>
  );
};

export default Admin;
