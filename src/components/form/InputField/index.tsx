import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FC } from "react";

interface InputFieldProps {
  form: any;
  name: string;
  label?: string;
  multiple?: boolean;
  placeholder?: string;
  [key: string]: any;
}

export const InputField: FC<InputFieldProps> = ({ form, name, label, multiple=false, ...props }) => (
  <div>
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {
              multiple ?
              <Textarea {...field} {...props} />
              :
              <Input {...field} {...props} />
            }
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);

