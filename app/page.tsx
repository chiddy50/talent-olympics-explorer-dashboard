import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-5 justify-center w-full">
      <div className="flex items-center justify-center gap-5">
        <Link href="/transaction">
          <div className="bg-gray-900 text-gray-200 w-40 p-4  rounded-xl flex items-center justify-center">
              Transaction
          </div>
        </Link>
        <Link href="/token">
          <div className="bg-gray-900 text-gray-200 w-40 p-4 rounded-xl flex items-center justify-center">
            Token
          </div>
        </Link>
      </div>
    </div>
  );
}
