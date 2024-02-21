import { Button } from '@/components/ui/button';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { fetchVolunteersActivityHistory } from '@/lib/actions/get-volunteer-report';
import { useState } from 'react';
import { unparse } from 'papaparse';

interface VolunteersProps {}

const Volunteers: React.FC<VolunteersProps> = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Volunteers</h1>
        <Button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            const data = await fetchVolunteersActivityHistory();
            console.log(data);
            setLoading(false);
            const csvData = unparse(data);
            const blob = new Blob([csvData], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `volunteer_lifetime_data_report.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            window.URL.revokeObjectURL(downloadUrl);
          }}
        >
          {loading ? (
            <span className="loading loading-dots loading-xs"></span>
          ) : (
            'Download Volunteer Lifetime Report'
          )}
        </Button>
      </div>
      <DataTable columns={columns} />
    </div>
  );
};

export default Volunteers;
