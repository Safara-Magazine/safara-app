import Link from "next/link";

export default function ComingSoon({ title }: { title?: string }) {
  return (
    <div className="flex flex-col  items-center justify-center py-20 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        {title || "Content Coming Soon"}
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We’re still crafting something great. Check back later.

      </p>

      <Link
        href="/"
        className="fade-in mt-8 px-6 py-3 border border-[#EAB353] text-[#EAB353] rounded-lg  bg-[#422746] transition-all"
      >
        Return Home
      </Link>
    </div>
  );
}
