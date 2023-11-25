import Link from "next/link";
import { cn } from "@/lib/utils";
import { Medal } from "lucide-react";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          headingFont.className
        )}
      >
        <div className="bg-amber-100 flex items-center p-4 mb-4 text-amber-700 uppercase shadow-sm border rounded-full">
          <Medal className="w-6 h-6 mr-2" />
          No. 1 task managment
        </div>

        <h1 className="mb-6 text-3xl md:text-6xl text-center text-neutral-800">
          TaskFlow helps team move
        </h1>

        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 w-fit px-4 pt-2 pb-4 text-white text-3xl md:text-6xl rounded-md">
          work forward.
        </div>
      </div>

      <div
        className={cn(
          "max-w-xs md:max-w-2xl mx-auto mt-4 text-sm md:text-xl text-neutral-400 text-center",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with TaskFlow.
      </div>

      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get TaskFlow for free</Link>
      </Button>
    </div>
  );
}
