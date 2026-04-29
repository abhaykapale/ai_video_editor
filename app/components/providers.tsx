"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";


const URL_ENDPOINT = process.env.URL_END_POINT || "https://ik.imagekit.io/your_imagekit_id/";
// const PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "your_public_key";    

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider refetchInterval={5*60} >
        <ImageKitProvider urlEndpoint={URL_ENDPOINT} >
        {children}
        </ImageKitProvider>
      </SessionProvider>
    </>
  );
}