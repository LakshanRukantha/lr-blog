"use client";
import Link from "next/link";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ImSpinner8 } from "react-icons/im";
import { getUserData } from "@/utils/User";

type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

const NavBar = () => {
  const session = useSession();
  const [user, setUser] = useState<UserProps>({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const AVATAR_BASE_URL = "https://ui-avatars.com/api/?name=";

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      if (session.status === "authenticated") {
        await getUserData(session.data?.user?.email as string)
          .then((data: UserProps) => {
            setUser(data);
          })
          .catch((error) => {
            console.error("Error in getUserData:", error);
          });
      }
    };

    fetchUser();
  }, [session]);

  return (
    <nav className="flex items-center bg-violet-100 shadow-md py-2 px-3 mb-5 fixed min-h-[60px] min-w-[350px] w-full z-10">
      <div className="max-w-5xl w-full m-auto flex justify-between items-center">
        <Link href={"/"} className="font-bold text-3xl text-violet-500">
          <span className="bg-violet-500 rounded px-2 text-white">LR</span> Blog
        </Link>
        <div>
          {session.status === "loading" ? (
            <ImSpinner8 className="animate-spin text-violet-500 h-11 w-11" />
          ) : session.status === "authenticated" ? (
            <div className="flex gap-3 items-center">
              <Link href={"/profile"}>
                <div className="relative flex items-center transition-all active:scale-95 justify-center rounded-full">
                  <Image
                    src={
                      session.data.user?.image ||
                      (user.avatar
                        ? user.avatar
                        : (`${AVATAR_BASE_URL}${"%20"}+` as string))
                    }
                    className="inline-flex h-11 w-11 border-2 border-violet-500 rounded-full"
                    width={40}
                    height={40}
                    alt={`profile ${user.firstName}`}
                  />
                  <span className="absolute md:hover:animate-spin duration-1000 h-11 w-11 rounded-full mx-auto border-2 border-transparent md:hover:border-x-white"></span>
                </div>
              </Link>
            </div>
          ) : (
            <Link
              className="text-violet-800 hover:text-violet-500"
              href={"/signup"}
            >
              <Button title={"Sign Up"} priority="primary" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
