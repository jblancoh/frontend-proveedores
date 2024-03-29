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
import { Button } from "@/components/ui/button"
import { deleteProviderById, getAllProviders, getProviderById, activeProviderById } from "@/services"
import { useEffect, useState } from "react"
import IconSearch from "@/components/IconSearch"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { SelectField } from "@/components/form/SelectField"
import EditForm from "@/components/EditForm"
import { Input } from "@/components/ui/input"
import { ToastAction } from "@/components/ui/toast"

type FormValues = {
  businessName?: string
  commercialName?: string
  provider?: string
}


interface ProviderData {
  id: string
  nomraz: string
  nomcomm: string
  website?: URL | string,
  rfc?: string
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
  num_escritura?: string
  estatus?: number
  contact?: Array<any>
  coverage?: Array<any>
  fec_const?: string
}

const Page = () => {
  const [showEmpty, setShowEmpty] = useState(false)
  const form = useForm(
    {
      defaultValues: {
        businessName: "",
        commercialName: "",
        provider: "",
      }
    }
  )
  const { handleSubmit, watch } = form
  const watchBusinessName = watch('businessName')
  const watchCommercialName = watch('commercialName')
  
  useEffect(() => {
    if (watchBusinessName?.length > 0 || watchCommercialName?.length > 0) {
      form.setValue('provider', "0")
    }
  }, [watchBusinessName, watchCommercialName])
  
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ProviderData>()
  const [loadingAction, setLoadingAction] = useState(false)
  const [filterData, setFilterData] = useState<ProviderData[] | undefined>([])
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>()

  const { toast } = useToast()
  
  const onSubmit: SubmitHandler<FormValues> = async ({ provider, businessName, commercialName }) => {
    setLoading(true)
    setData(undefined)
    if((!provider || provider === "0") && !businessName && !commercialName) {
      toast({
        title: "Error",
        description: "Debes ingresar al menos un campo",
        variant: "destructive",
      })
      setLoading(false)
      return
    }
    try {
      onFilter({businessName, commercialName, provider})
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
  
  const onFilter = async ({businessName, commercialName, provider}: FormValues) => {
    setLoading(true)
    setData(undefined)
    if (provider && provider !== "0") {
      const FilterProviders = providers.find((item: ProviderData) => item.id == provider)
      setShowEmpty(false)
      form.setValue('businessName', '')
      form.setValue('commercialName', '')
      setFilterData([])
      setData(FilterProviders)
      return 
    }
    try {
      const dataFilter = providers.filter((provider: ProviderData) => {
        if (provider.nomraz.toLowerCase().includes(businessName?.toLowerCase() || "") && provider.nomcomm.toLowerCase().includes(commercialName?.toLowerCase() || "")) {
          return provider
        }
      })
      if (dataFilter.length === 0) {
        setShowEmpty(true)
      } else {
        setShowEmpty(false)
      }
      setFilterData(dataFilter)
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
        const emptyProvider = {
          id: 0,
          nomcomm: "Selecciona un proveedor",
          nomraz: "",
        }
        
        providers.unshift(emptyProvider)
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
  
  const handleAction = async () => {
    setLoadingAction(true)
    const isDelete = data?.estatus === 1
    try {
      setProviders([])
      isDelete ? await deleteProviderById(data?.id) : await activeProviderById(data?.id)
      toast({
        title: isDelete ? "Proveedor dado de baja" : "Proveedor dado de alta",
        description: isDelete ? "El proveedor ha sido dado de baja exitosamente" : "El proveedor ha sido dado de alta exitosamente",
        variant: "success",
        action: <ToastAction className="bg-radius text-white hover:bg-slate-500" altText="Ok">Ok</ToastAction>
      })
      data && setData({...data, estatus: !isDelete ? 1 : 0 })
      const response = await getAllProviders()
      const providers = response.data

      setProviders(providers)
    } catch (error) {
      toast({
        title: "Error",
        description: isDelete ? "No se pudo dar de baja al proveedor" : "No se pudo dar de alta al proveedor",
        variant: "destructive",
      })
    } finally {
      setLoadingAction(false)
      
    }
    
  }
  
  const handleFilter = async (provider: ProviderData) => {
    setData(provider)
    setSelectedProvider(provider?.id)
  }
  
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
                    <InputField form={form} name="businessName" label="Razón social" />
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
                {
                  filterData && filterData.length > 0 ?
                    <div className="grid grid-cols-7 mt-4 gap-4 grid-flow-row">
                      {
                        filterData.map((provider: ProviderData) => (
                          <Card key={provider.id} className={`col-span-1 justify-center items-center flex h-14 cursor-pointer hover:bg-radius hover:text-white ${selectedProvider === provider.id ? 'bg-radius text-white' : 'bg-white'}`} onClick={() => handleFilter(provider)}>
                            <CardTitle className="text-center text-sm mx-2">
                              <Label className="text-ellipsis cursor-pointer">
                                {provider.nomraz}
                              </Label>
                            </CardTitle>
                          </Card>
                        ))
                      }
                    </div>
                  :
                    showEmpty &&
                    <div className="flex justify-center items-center h-20 mt-10">
                      <Label className="font-normal text-lg">No se encontraron resultados</Label>
                    </div>
                }
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
          <>
            <Card className="bg-gray-300">
              <CardContent className="pt-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex justify-start items-center">
                    <FormSectionHeader title="Proveedor" />
                  </div>
                  <div className="flex justify-center flex-col gap-2 ">
                    <Label className="font-normal">No. Proveedor</Label>
                    <Input disabled={true} value={data.id} />
                  </div>
                  <div className="flex justify-center flex-col gap-2 ">
                    <Label className="font-normal">Nombre Comercial</Label>
                    <Input disabled={true} value={data.nomcomm} />
                  </div>
                  <div className="flex justify-center flex-col">
                    <div className="flex justify-center flex-col gap-2 items-center">
                      <Label className="font-normal">Estado</Label>
                      <Label className="font-normal text-radius text-lg">{data.estatus === 1 ? "Activo" : "Inactivo"}</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <EditForm provider={data} />
            <Card className="bg-transparent border border-gray-300 mt-10">
              <CardHeader>
                <CardTitle>
                  <FormSectionHeader title={data.estatus === 1 ? "Baja" : "Alta"} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="flex justify-between items-center">
                    <Label className="font-normal">{data.estatus === 1 ? 'Dar de baja al proveedor. La información no se borra. Se mostrará inactivo.' : 'Activar al proveedor'}</Label>
                    <Button
                      onClick={handleAction}
                      variant={data.estatus === 1 ? "radius" : "success"}
                      disabled={loadingAction}
                      >
                      {
                        loadingAction ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        :
                          data.estatus === 1 ? "Dar de baja al proveedor" : "Activar este proveedor"
                      }
                    </Button>
                  </div>
              </CardContent>
            </Card>
          </>
        }
    </div>
  )
}

export default Page