import { Label } from "@/components/ui/label";

interface ProvidersLayoutProps {
  children: React.ReactNode;
}

const ProvidersLayout: React.FC<ProvidersLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="pb-2">
        <Label className="text-radius font-bold text-3xl">Reporte Ad hoc</Label>
      </div>
      {children}
    </>
  )
}

export default ProvidersLayout