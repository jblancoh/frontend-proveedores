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
import { getAllProviders, getProviderById } from "@/services"
import { Suspense, useEffect, useState } from "react"
import IconSearch from "@/components/IconSearch"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SelectField } from "@/components/form/SelectField"
import { useRouter } from "next/navigation"
import EditForm from "@/components/EditForm"

type FormValues = {
  businessName?: string
  commercialName?: string
  provider?: string
}


interface ProviderData {
  id: string
  nomraz: string
  nomcomm: string
  website?: URL,
  rfc?: string
  p_curp?: string
  obj_social?: string
  act_econom?: string
  especialidad?: string
  tel1?: string
  tel2?: string
  domicilio?: string
  delmpo?: string
  estado?: string
  cp?: string
  nacional?: string
  r_curp?: string
  num_escritura?: string
  fec_alta?: string
  fec_baja?: string
  fec_react?: string
  estatus?: number
  contact?: Array<any>
  coverage?: Array<any>

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
  const [data, setData] = useState<ProviderData>()
  const { toast } = useToast()
  const router = useRouter()
  
  const onSubmit: SubmitHandler<FormValues> = async ({provider}) => {
    setLoading(true)
    setData(undefined)
    try {
      const response = await getProviderById(provider)
      const { data } = response
      setData(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron obtener los datos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getAllProviders()
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
                  <SelectField form={form} name="provider" label="Proveedor" data={providers} />
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
        {
        loading && <Card><div className="flex justify-center items-center h-20">
            <Loader2 className="h-10 w-10 animate-spin" />
        </div></Card>
        }
        {data && 
          <Card>
            <CardHeader>
              <CardTitle>
                <FormSectionHeader title="Proveedor" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EditForm provider={data} />
            </CardContent>
          </Card>
        }
    </div>
  )
}

export default Page