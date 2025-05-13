import SignInButton from "@/components/SignInButton";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <h1 className="text-4xl underline">Welcome</h1>
      <SignInButton />
    </div>
  );
}
