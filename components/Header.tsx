"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import { LogInIcon } from "lucide-react";
import Greeting from "@/components/Greeting";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-5 border-b">
      <Greeting /> 
      <Breadcrumbs />
      <div>
        <SignedOut>
          <SignInButton>
            <div className="flex items-center gap-2 cursor-pointer">
              Sign In <LogInIcon />{" "}
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
