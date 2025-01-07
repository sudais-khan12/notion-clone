import LiveBlocksProvider from "@/components/LiveBlocksProvider";

const pageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
};
export default pageLayout;
