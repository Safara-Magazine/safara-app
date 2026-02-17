import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={raleway.className}>
      {children}
    </section>
  );
}
