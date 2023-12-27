"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { user, isLoaded } = useUser();
  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Link href="/">
              <Image
                src={`/images/logo.jpg`}
                alt="Kelompok 3"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "50%", height: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li>
                <Link
                  href="/"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              {isLoaded && user && (
                <>
                  <li>
                    <Link
                      href="/formulir"
                      className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                    >
                      Tugas
                    </Link>
                  </li>
                  <UserButton afterSignOutUrl="/" />
                </>
              )}
              <li>
                <Link
                  className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                  href="https://github.com/rizkifac2204/unm_spk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Source Code</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
