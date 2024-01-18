
import { FC } from 'react';

interface FormSectionHeaderProps {
  title: string;
}

export const FormSectionHeader: FC<FormSectionHeaderProps> = ({ title }) => (
  <div className="col-span-4">
    <h2 className="font-semibold text-base">{title}</h2>
  </div>
);