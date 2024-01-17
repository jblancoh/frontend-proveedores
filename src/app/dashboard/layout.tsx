import NavBar from "@/components/NavBar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="h-screen mx-auto px-4 py-4 bg-accent">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
            <CardFooter>Card Footer</CardFooter>
          </Card>
        </div>
      </main>
    </>
    )
  }
 
export default HomeLayout
  