import React from "react";
import Button from "./Button";
import clsx from "clsx";
import style from "./header.module.css";
import img1 from "./images/contents-02.png";
import Image from "next/image";
import "./landing.css";

const Landing = () => {
  return (
    <div className="landing_wrap">
      <section>
        <Image
          src="/images/contents-02.png"
          width={1440}
          height={550}
          alt="이미지1"
          unoptimized
        />
      </section>
      <section>
        <Image
          src="/images/contents-03.png"
          width={1440}
          height={550}
          alt="이미지1"
          unoptimized
        />
      </section>
      <section>
        <Image
          src="/images/contents-04.png"
          width={1440}
          height={550}
          alt="이미지1"
          unoptimized
        />
      </section>
      <section>
        <Image
          src="/images/contents-05.png"
          width={1440}
          height={550}
          alt="이미지1"
          unoptimized
        />
      </section>
    </div>
  );
};

export default Landing;
