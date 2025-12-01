import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ModalProvider } from "@/components/modal/ModalProvider";
import React, { ReactNode } from "react";
import { Providers } from "@/app/providers";
import { Toaster } from "react-hot-toast";

const mainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Providers>
        <ModalProvider>
          <Header />
          {children}
          <Footer />
        </ModalProvider>
      </Providers>
    </>
  );
};

export default mainLayout;
