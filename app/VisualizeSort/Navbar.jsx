import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold">
          <Link href="/">
            <span className="text-white hover:text-blue-200">
              Sorting Visualizer
            </span>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/VisualizeSort/Help">
            <span className="px-4 py-2 hover:bg-blue-700 rounded-md">Help</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
