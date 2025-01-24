import { CountProvider } from "./state";
export default function NewGoalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CountProvider>{children}</CountProvider>;
}
