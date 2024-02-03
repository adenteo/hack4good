import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { GripVertical } from 'lucide-react';

interface FormBuilderAreaProps {}

const FormBuilderArea: React.FC<FormBuilderAreaProps> = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl">Form Builder</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold">Save</span>
                <GripVertical size={16} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormBuilderArea;
