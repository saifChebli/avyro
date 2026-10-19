import Shell, { pageMeta } from "@/components/Shell";
export const metadata = pageMeta("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
