"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/AppIcon";
import { useAuth } from "@/context/AuthContext";
import { getDashboardRoute } from "@/lib/api/auth";

const ROLE_LABELS: Record<string, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  admin: "Admin",
  superadmin: "Super Admin",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleDropdownItemClick = () => {
    setActiveDropdown(null);
  };

  const navLinks = [
    { href: "/homepage", label: "Home" },
    { href: "/property-listings", label: "Properties" },
    {
      label: "How It Works",
      href: "/how-it-works",
      dropdown: [
        { href: "/how-it-works", label: "Overview" },
        { href: "/safety-and-trust", label: "Safety & Trust" },
        { href: "/credit-score", label: "Credit Score" },
        { href: "/about", label: "About RentTrust" },
      ],
    },
    {
      label: "Services",
      dropdown: [
        { href: "/tenant/dashboard", label: "For Tenants" },
        { href: "/landlord/dashboard", label: "For Landlords" },
        { href: "/property-details/1", label: "Property Details" },
        { href: "/support", label: "Support" },
        { href: "/help-center", label: "Help Center" },
      ],
    },
    {
      label: "Legal",
      dropdown: [
        { href: "/legal/terms", label: "Terms & Conditions" },
        { href: "/legal/privacy", label: "Privacy Policy" },
        { href: "/admin/dashboard", label: "Admin Panel" },
      ],
    },
  ];

  // Derive user initials for avatar fallback
  const userInitials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const dashboardLink = user ? getDashboardRoute(user.role) : "/auth/login";

  const handleLogout = async () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    await logout();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon
                name="HomeModernIcon"
                variant="solid"
                size={24}
                className="text-white"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground">
              Nivaas<span className="text-primary">Cred</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks?.map((link) => (
              <div key={link?.label} className="relative dropdown-container">
                {link?.dropdown ? (
                  <div>
                    <button
                      onClick={() => handleDropdownToggle(link.label)}
                      className={`text-sm font-medium transition-colors relative flex items-center space-x-1 ${
                        link.dropdown?.some((item) => pathname === item.href)
                          ? "text-primary font-bold"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      <span>{link?.label}</span>
                      <Icon
                        name="ChevronDownIcon"
                        size={16}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl shadow-lg border border-border z-50">
                        <div className="py-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={handleDropdownItemClick}
                              className={`block px-4 py-2 text-sm transition-colors hover:bg-muted ${
                                pathname === item.href
                                  ? "text-primary font-semibold"
                                  : "text-foreground"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link?.href!}
                    className={`text-sm font-medium transition-colors relative ${
                      pathname === link?.href
                        ? "text-primary font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link?.label}
                    {pathname === link?.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA — auth-aware */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              // Skeleton to prevent layout shift
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              // Authenticated — user dropdown
              <div className="relative dropdown-container">
                <button
                  onClick={() => handleDropdownToggle("user-menu")}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                      {userInitials}
                    </div>
                  )}
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {user.fullName.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {ROLE_LABELS[user.role] ?? user.role}
                    </p>
                  </div>
                  <Icon
                    name="ChevronDownIcon"
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${
                      activeDropdown === "user-menu" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {activeDropdown === "user-menu" && (
                  <div className="absolute top-full right-0 mt-2 w-56 glass rounded-xl shadow-lg border border-border z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full capitalize">
                        {ROLE_LABELS[user.role] ?? user.role}
                      </span>
                    </div>

                    <div className="py-2">
                      <Link
                        href={dashboardLink}
                        onClick={handleDropdownItemClick}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Icon
                          name="SquaresFourIcon"
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/user-profiles"
                        onClick={handleDropdownItemClick}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Icon
                          name="UserCircleIcon"
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span>Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-border py-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Icon name="ArrowRightOnRectangleIcon" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Unauthenticated
              <>
                <Link
                  href="/onboarding"
                  className="text-sm font-medium text-primary hover:text-secondary transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "XMarkIcon" : "Bars3Icon"} size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-border">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            {navLinks?.map((link) => (
              <div key={link?.label}>
                {link?.dropdown ? (
                  <div>
                    <div className="text-base font-medium text-foreground mb-2">
                      {link.label}
                    </div>
                    <div className="ml-4 space-y-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block text-sm transition-colors ${
                            pathname === item.href
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link?.href!}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium transition-colors ${
                      pathname === link?.href
                        ? "text-primary font-bold"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link?.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="pt-4 space-y-3 border-t border-border">
              {isLoading ? (
                <div className="h-10 bg-muted animate-pulse rounded-xl" />
              ) : isAuthenticated && user ? (
                <>
                  {/* Mobile user info */}
                  <div className="flex items-center space-x-3 px-2 pb-3 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {userInitials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {ROLE_LABELS[user.role] ?? user.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={dashboardLink}
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
                  >
                    Go to Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-6 py-3 border border-destructive text-destructive rounded-xl font-semibold hover:bg-destructive/10 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/onboarding"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 border border-primary text-primary rounded-xl font-semibold hover:bg-primary/10 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-secondary transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
