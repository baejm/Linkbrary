import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";

const mainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default mainLayout;
