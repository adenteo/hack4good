import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { ArrowUpFromDot } from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses = [
  {
    value: 'Active',
    label: 'Active',
    icon: ArrowUpFromDot,
  },
  {
    value: 'Deleted',
    label: 'Deleted',
    icon: StopwatchIcon,
  },
  {
    value: 'Banned',
    label: 'Banned',
    icon: CheckCircledIcon,
  },
];

export const ratings = [
  {
    value: '1/5',
    label: '1/5',
  },
  {
    value: '2/5',
    label: '2/5',
  },
  {
    value: '3/5',
    label: '3/5',
  },
  {
    value: '4/5',
    label: '4/5',
  },
  {
    value: '5/5',
    label: '5/5',
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
