// import { ArrowLeftCircle } from "lucide-react";
// import Particles from "@/components/Particles";

// export default function Home() {
//   return (
//     <main className="flex space-x-2 items-center animate-pulse">
//       <ArrowLeftCircle className="w-12 h-12" />
//       <h1 className="font-bold">Get started by creating a new document</h1>
//       <div className="text-lg font-semibold absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] md:text-4xl">
//         <Greeting />
//         <Particles />
//       </div>
//     </main>
//   );
// }

import Spline from "@splinetool/react-spline/next";

export default function Home() {
  return (
    <main>
      <Spline scene="https://prod.spline.design/krLl8tRDt9E3oqrR/scene.splinecode" />
    </main>
  );
}
