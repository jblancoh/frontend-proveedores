
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProvidersLayoutProps {
  children: React.ReactNode;
}

const ProvidersLayout: React.FC<ProvidersLayoutProps> = ({ children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proveedores</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

export default ProvidersLayout