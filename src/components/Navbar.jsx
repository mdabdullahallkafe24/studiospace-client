
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  User,
  LayoutDashboard,
  CalendarDays,
  Building2,
  LogOut,
  ChevronDown,
} from "lucide-react";

import ThemeToggle from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) return false;

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      closeMenu();
      toast.success("Logged out successfully!");
      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const ProfileMenu = ({ mobile = false }) => (
    <div className={mobile ? "w-full" : "relative"}>
      <button
        type="button"
        onClick={() => setProfileOpen((prev) => !prev)}
        className={`flex items-center gap-2 rounded-xl border border-[#E9E6DE] p-2 ${
          mobile ? "w-full" : ""
        }`}
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user.name || "User"}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C66B45] text-white">
            <User size={19} />
          </span>
        )}

        <span className="max-w-32 truncate text-sm font-semibold text-[#252724]">
          {user?.name || "My Account"}
        </span>

        <ChevronDown
          size={16}
          className={`text-[#555] transition-transform ${
            profileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {profileOpen && (
        <div
          className={`z-50 mt-2 rounded-xl border border-[#E9E6DE] bg-white p-2 shadow-xl ${
            mobile ? "w-full" : "absolute right-0 top-full w-56"
          }`}
        >
          {/* User Information */}
          <div className="border-b border-[#E9E6DE] px-3 py-3">
            <p className="truncate text-sm font-semibold text-[#252724]">
              {user?.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

          {/* My Profile */}
          <Link
            href="/profile"
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#555] hover:bg-[#F0EEE8] hover:text-[#C66B45]"
          >
            <User size={17} />
            My Profile
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#555] hover:bg-[#F0EEE8] hover:text-[#C66B45]"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>

          {/* Add New Studio */}
          <Link
            href="/add-studio"
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#555] hover:bg-[#F0EEE8] hover:text-[#C66B45]"
          >
            <Building2 size={17} />
            Add New Studio
          </Link>

          {/* My Bookings */}
          <Link
            href="/my-bookings"
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#555] hover:bg-[#F0EEE8] hover:text-[#C66B45]"
          >
            <CalendarDays size={17} />
            My Bookings
          </Link>

          {/* My Listings */}
          <Link
            href="/my-listings"
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#555] hover:bg-[#F0EEE8] hover:text-[#C66B45]"
          >
            <Building2 size={17} />
            My Listings
          </Link>

          {/* Host Bookings */}
          <Link
            href="/host-bookings"
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#555] hover:bg-[#F0EEE8] hover:text-[#C66B45]"
          >
            <CalendarDays size={17} />
            Host Bookings
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut size={17} />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E6DE] bg-[#FAF9F6]/95 backdrop-blur-md">
      <nav className="studio-container flex h-20 items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C66B45] text-xl font-bold text-white">
            S
          </span>

          <span className="text-xl font-bold tracking-tight text-[#252724]">
            Studio<span className="text-[#C66B45]">Space.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`premium-link text-sm font-medium ${
                isActive(link.href)
                  ? "text-[#C66B45]"
                  : "text-[#555]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {!isPending &&
            (user ? (
              <ProfileMenu />
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#252724] hover:text-[#C66B45]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="btn rounded-xl border-0 bg-[#C66B45] px-5 text-white hover:bg-[#ad5937]"
                >
                  Get Started
                  <ArrowUpRight size={16} />
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="btn btn-circle btn-ghost"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#E9E6DE] bg-[#FAF9F6] px-5 py-6 lg:hidden">
          <div className="studio-container flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`text-sm font-medium ${
                  isActive(link.href)
                    ? "text-[#C66B45]"
                    : "text-[#555]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Profile / Authentication */}
            <div className="border-t border-[#E9E6DE] pt-5">
              {isPending ? null : user ? (
                <ProfileMenu mobile />
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="btn flex-1 rounded-xl border border-[#E9E6DE] bg-white text-[#252724]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="btn flex-1 rounded-xl border-0 bg-[#C66B45] text-white hover:bg-[#ad5937]"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
