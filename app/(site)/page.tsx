import Image from "next/image";
import AuthForm from "./components/AuthForm";
import Theme from "../components/Theme";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-8 lg:px-8 bg-base-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/images/logo.png"
          alt="logo"
          height={100}
          width={100}
          className="mx-auto w-auto"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
      <div className="flex justify-center">
        <Theme />
      </div>
    </div>
  );
}
