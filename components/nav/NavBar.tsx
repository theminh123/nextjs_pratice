import Link from "next/link";

export function NavBar() {
  return (
    <nav className="flex bg-white shadow-sm border-b p-4">
      <h1 className="flex flex-start font-bold text-xl text-blue-600">
        Student Management
      </h1>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        <Link
          href="/student"
          className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
        >
          Students
        </Link>
        <Link
          href="/class"
          className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
        >
          Classes
        </Link>
      </div>
    </nav>
  );
}
