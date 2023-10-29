"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">Home</Link>
      <ul className="flex space-x-6">
        <li className="flex space-x-6">
          <Link href="/form">Form</Link>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Sign Out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
