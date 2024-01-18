import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";

interface InputFieldProps {
  form: any;
  name: string;
  label: string;
  [key: string]: any;
}

export const InputField: FC<InputFieldProps> = ({ form, name, label, ...props }) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

