import { FC } from 'react';
import { Switch } from "@/components/ui/switch"
import {
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface SelectFieldProps {
  form: any;
  name: string;
  label: string;
  data: Array<any>;
}

export const SelectField: FC<SelectFieldProps> = ({ form, name, label, data}) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un proveedor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
               {
                  data.map((provider, index) => {
                    return (
                      <SelectItem key={index} value={provider.id.toString()}>{`${provider.nomcomm} - ${provider.rfc || ""} - ${provider.nomraz || ""}`}</SelectItem>
                    )
                  })
               }
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  </div>
);
