
import IconHome from "@/components/IconHome";
import Menu from "@/components/Menu";

interface ProvidersLayoutProps {
  children: React.ReactNode;
}

const ProvidersLayout: React.FC<ProvidersLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between pb-2">
        <IconHome />
        <div className="">
          <Menu />
        </div>
      </div>
      {children}
    </div>
  )
}

export default ProvidersLayout