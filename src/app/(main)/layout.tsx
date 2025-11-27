import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ModalProvider } from "@/components/modal/ModalProvider";
import React, { ReactNode } from "react";
import { Providers } from "@/app/providers";

const mainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
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
