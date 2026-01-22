"use client";
import Navbar from "../navbar";
import { usePathname } from "next/navigation";

export default function CommonLayout({ children }) {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/admin" ? <Navbar /> : null}
      {children}
    </>
  );
}
