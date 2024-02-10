import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import { ArrowUpFromDot } from 'lucide-react';

export const statuses = [
  {
    value: 'Upcoming',
    label: 'Upcoming',
    icon: ArrowUpFromDot,
  },
  {
    value: 'Ongoing',
    label: 'Ongoing',
    icon: StopwatchIcon,
  },
  {
    value: 'Completed',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'Cancelled',
    label: 'Cancelled',
    icon: CrossCircledIcon,
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
