"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { FormSectionHeader } from "@/components/form/FormSectionHeader"
import { InputField } from "@/components/form/InputField"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { getAllProviders } from "@/services"
import { useEffect, useState } from "react"
import IconSearch from "@/components/IconSearch"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type FormValues = {
  businessName?: string
  commercialName?: string
}

interface ProviderData {
  id: string
  businessName: string
  commercialName: string
}

const Page = () => {
  const form = useForm(
    {
      defaultValues: {
        businessName: "",
        commercialName: "",
      }
    }
  )
  const { handleSubmit } = form
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getAllProviders()
        if(!response.ok) throw new Error("No se pudieron obtener los proveedores")
        const providers = response.data
        
        setProviders(providers)
      } catch (error: any) {
        toast({
          title: "Error",
          description: "No se pudieron obtener los proveedores",
          variant: "destructive",
        })
      }
    }
    fetchProviders()
  } , [])
  
  return (
    <div className="pb-10">
      <Form {...form}>
        <form className="py-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <FormSectionHeader title="Búsqueda de proveedor" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 justify-center items-end">
                  <div className="col-span-1">
                    <Label>Proveedor</Label>
                    <Select>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {
                            providers.map((provider: ProviderData) => (
                              <SelectItem key={provider.id} value={provider.id}>{provider.businessName}</SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-1">
                    <InputField form={form} name="businessName" label="Razon Social" />
                  </div>
                  <div className="col-span-1">
                    <InputField form={form} name="commercialName" label="Nombre Comercial" />
                  </div>
                  <div className="col-span-1">
                    <Button 
                      type="submit"
                      className="col-span-1 w-full gap-4" 
                      variant='radius'
                      disabled={loading}
                    >
                      {
                        loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        :
                        <>
                          <IconSearch />
                          Buscar
                        </>
                      }
                    </Button>
                  </div>
                </div>
                
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Page