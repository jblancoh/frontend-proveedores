'use client'
import { InputField } from "@/components/form/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { handleLogin } from "@/app/actions/auth";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Usuario debe tener al menos 2 caracteres.",
  }),
  password: z.string().min(8, {
    message: "Contraseña debe tener al menos 8 caracteres.",
  }),
})

const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    setTimeout(() => {
      router.push('/home');
      setUser({
        username: values.username,
      });
      // set localStorage
      window.localStorage.setItem("username", values.username);
      
      const token = "123456";
      handleLogin(token);
      setLoading(false);
    }, 1500)
  }

  return (
    <Form {...form}>
      <div className="w-1/3">
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <Card className="py-8 ">
            <CardContent className="flex flex-col gap-6">
              <div className="flex justify-center">
                <h1 className="font-bold">Login</h1>
              </div>
              <div className="w-full">
                <InputField
                  name="username"
                  label="Usuario"
                  form={form}
                />
              </div>
              <div className="w-full">
                <InputField
                  name="password"
                  label="Contraseña"
                  form={form}
                  type="password"
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  variant="radius"
                  className="font-normal"
                  type="submit"
                  disabled={loading}
                >
                  {
                    loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  }
                  Entrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </Form>
  );
}

export default LoginForm;
