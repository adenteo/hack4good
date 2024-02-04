import { getForms } from '@/lib/actions/get-forms';
import { Suspense, useEffect, useState } from 'react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface FormTabPageProps {}

const FormTabPage: React.FC<FormTabPageProps> = async () => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    const fetchForms = async () => {
      const forms = await getForms();
      const formsJson = JSON.parse(forms);
      console.log(formsJson);
      setForms(formsJson);
    };
    fetchForms();
  }, []);

  return (
    <div className="p-6">
      <h1 className=" text-2xl font-bold">All Forms</h1>
      <div className="mt-6">
        <DataTable data={forms} columns={columns} />
      </div>
    </div>
  );
};

export default FormTabPage;
