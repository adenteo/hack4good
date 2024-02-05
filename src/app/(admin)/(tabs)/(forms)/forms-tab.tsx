import { getForms } from '@/lib/actions/get-forms';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface FormTabPageProps {}

const FormTabPage: React.FC<FormTabPageProps> = async () => {
  return (
    <div className="p-6">
      <h1 className=" text-2xl font-bold">All Forms</h1>
      <div className="mt-6">
        <DataTable columns={columns} />
      </div>
    </div>
  );
};

export default FormTabPage;
