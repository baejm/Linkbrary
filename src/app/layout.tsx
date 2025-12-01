import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

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
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
