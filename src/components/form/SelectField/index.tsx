import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FormControl,
  FormItem,
  FormField,
} from "@/components/ui/form"

interface SelectFieldProps {
  form: any;
  name: string;
  label: string;
  [key: string]: any;
}

export const SelectField: FC<SelectFieldProps> = ({ form, name, label, ...props }) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  </div>
);
