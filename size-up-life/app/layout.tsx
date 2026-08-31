import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const diatype = localFont({
  src: [
    {
      path: "../public/fonts/Diatype/ABC Diatype/ABCDiatypeTrial-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Diatype/ABC Diatype/ABCDiatypeTrial-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Diatype/ABC Diatype/ABCDiatypeTrial-Medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Diatype/ABC Diatype/ABCDiatypeTrial-MediumItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/Diatype/ABC Diatype/ABCDiatypeTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Diatype/ABC Diatype/ABCDiatypeTrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Size Up Life",
  description:
    "Ever wanted to know how big a t-rex is compared to a blue whale, now you can in this fun engaging daily game!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body
        className={`h-full flex flex-col overflow-hidden ${diatype.className}`}
      >
        {children}
      </body>
    </html>
  );
}
