import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldType } from '@/types/formTypes';

export function SelectFieldType() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Types</SelectLabel>
          {Object.values(FieldType).map((type) => (
            <SelectItem value={type}>{type}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
