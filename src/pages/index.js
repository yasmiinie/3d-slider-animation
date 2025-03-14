import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AutomaticImageSlider from "@/components/normal-slider";
import ThreeDCarousel from "@/components/3d-rounded-slider";
import CurvedSlider from "@/components/curved-slider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const images = [
    


    '/wilayas/alger.png',
    '/wilayas/alger.png',
    '/wilayas/alger.png',
    '/wilayas/alger.png',
    '/wilayas/alger.png',
    '/wilayas/alger.png',
    '/wilayas/alger.png',
    '/wilayas/alger.png',


  ];

  return (
<>
<div>
  <h1>Rounded 3d  slider </h1>
  <div className="min-h-screen   ">
  <ThreeDCarousel images={images} />

</div>
 </div> 
 <div>
  <h1>Curved 3d  slider </h1>
  <div className="min-h-screen   ">
  <CurvedSlider images={images} />

</div>
 </div> 
 <div>
  <h1>Normal slider </h1>
  <div className="min-h-screen">

  <AutomaticImageSlider images={images} />
</div>
 </div> 
 


</>
  );
}
