"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/exercises", label: "Exercises" },
  { href: "/days", label: "Days" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-neutral-800 border-b border-neutral-700">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                active
                  ? "text-white"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
