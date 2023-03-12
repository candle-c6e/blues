import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="font-inter">
      <Navbar />
      <div className="container mx-auto py-8">{children}</div>
    </div>
  );
};
export default Layout;
