import { decode } from "@/util/jwt";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import Button from "./Button";

const NavSignIn = async () => {
  let cookie = cookies().get("user");
  let user: User | null = null;
  if (cookie) {
    user = decode(cookie!.value).payload as User;
  }

  return (
    <>
      {cookie && user ? (
        <Link href={"/profile"} className="text-2xl">
          <FaUserAlt />
        </Link>
      ) : (
        <Button text="Sign in" type="dashed">
          <Link href={"/auth/signin"}>Sign in</Link>
        </Button>
      )}
    </>
  );
};

export default NavSignIn;
