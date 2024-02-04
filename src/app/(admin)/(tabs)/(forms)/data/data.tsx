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
import { ArrowUpFromDot, BookCheck, Pencil, XCircle } from 'lucide-react';

export const statuses = [
  {
    value: 'closed',
    label: 'Closed',
    icon: XCircle,
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: Pencil,
  },
  {
    value: 'published',
    label: 'Published',
    icon: BookCheck,
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
