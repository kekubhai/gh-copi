import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home(){
  return (
    <div className="text-red-700">
      <Button>
   <Link href={'/dashboard'}>Click me</Link>
      </Button>
    </div>
  )
}