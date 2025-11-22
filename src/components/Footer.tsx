import Image from "next/image";
import React from "react";
import facebook from "@/images/facebook.svg";
import twitter from "@/images/twitter.svg";
import youtube from "@/images/youtube.svg";
import instagram from "@/images/instagram.svg";
import "./footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer_wrap">
      <div className="footer_list  txt_16_r">
        <p className="txt">©codeit - 2025</p>
        <ul className="desc">
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
        </ul>
        <ul className="sns_list">
          <li>
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={facebook} alt="facebook" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={twitter} alt="트위터" />
            </a>
          </li>
          <li>
            {" "}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={youtube} alt="유튜브" />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={instagram} alt="인스타그램" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
