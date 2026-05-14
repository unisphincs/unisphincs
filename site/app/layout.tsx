import type { Metadata } from "next";
import "./globals.css";

const TITLE = "UniSphincs";
const DESCRIPTION =
  "post-quantum signatures for the next ethereum. uniswap-ready toolkit around sphincs-.";
const SITE_URL = "https://unisphincs.xyz";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "unisphincs",
    images: [
      {
        url: "/og.png",
        width: 2171,
        height: 724,
        alt: "unisphincs · post-quantum signatures for the next ethereum",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@UniSphincs",
    creator: "@UniSphincs",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
