import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

export const metadata = {
  title: "⭐ 즐겨찾기 리스트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="layouts">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
