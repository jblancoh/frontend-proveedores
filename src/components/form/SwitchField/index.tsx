import { FC } from 'react';
import { Switch } from "@/components/ui/switch"
import {
  FormControl,
  FormItem,
  FormField,
} from "@/components/ui/form"
import { Label } from '@/components/ui/label';

interface SwitchFieldProps {
  form: any;
  name: string;
  label: string;
}

export const SwitchField: FC<SwitchFieldProps> = ({ form, name, label}) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return <FormItem>
          <FormControl>
            <div className='flex md:justify-center items-center gap-2'>
            <Switch id={name}
              onClick={() => {
                form.setValue(name, !field.value)
              }}
            />
            <Label htmlFor={name}>{label}</Label>
            </div>
          </FormControl>
        </FormItem>
      }}
    />
  </div>
);
