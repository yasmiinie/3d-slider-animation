import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import AutomaticImageSlider from "@/components/normal-slider";

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
    '/wilayas/alger.png',
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
 <div>
  <h1>Normal slider </h1>
  <div className="min-h-screen   my-20">

  <AutomaticImageSlider images={images} />
</div>
 </div>
  );
}
