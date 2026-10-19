import Shell, { pageMeta } from "@/components/Shell";
export const metadata = pageMeta("fr");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="fr">{children}</Shell>;
}
