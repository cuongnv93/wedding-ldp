"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthModal from "./auth-modal";
import CheckoutModal from "./checkout-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import { SwitchFlag } from "./ui/switchFlag";
import { useTranslations, useLocale } from "next-intl";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Button } from "./ui/button";

function Logo() {
  const currentLocale = useLocale();

  return (
    <Link
      href={`/${currentLocale}`}
      className="shrink-0 text-xl font-bold sm:text-2xl"
      title="uWedding - Nền tảng thiệp cưới online"
    >
      <span className="text-primary">u</span>Wedding
    </Link>
  );
}

// Component con: Navigation Links
function NavigationLinks() {
  const t = useTranslations("");
  const currentLocale = useLocale();

  const links = [
    {
      name: t("product"),
      href: `/${currentLocale}/products`,
    },
    {
      name: t("price_menu"),
      href: `/${currentLocale}/price`,
    },
    {
      name: t("create_menu"),
      href: `/${currentLocale}/create-invitation`,
    },
    {
      name: t("blog_menu"),
      href: `/${currentLocale}/blog`,
    },
    {
      name: t("about"),
      href: `/${currentLocale}#about`,
    },
    {
      name: t("faq_menu"),
      href: `/${currentLocale}#faq`,
    },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

// Component con: MobileMenuButton
function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("");
  const currentLocale = useLocale();

  const links = [
    { name: t("home"), href: `/${currentLocale}` },
    { name: t("product"), href: `/${currentLocale}/products` },
    { name: t("price_menu"), href: `/${currentLocale}/price` },
    { name: t("create_menu"), href: `/${currentLocale}/create-invitation` },
    { name: t("create_name_menu"), href: `/${currentLocale}/create-name-invitation` },
    { name: t("blog_menu"), href: `/${currentLocale}/blog` },
    { name: t("about"), href: `/${currentLocale}#about` },
    { name: t("faq_menu"), href: `/${currentLocale}#faq` },
  ];

  return (
    <>
      <button
        type="button"
        className="ml-2 flex items-center justify-center p-2 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        direction="left"
        className="drawer"
        size={270}
      >
        <div className="p-6 flex flex-col gap-4 h-full bg-white">
          <div className="flex items-center justify-between pb-2 border-b">
            <span className="font-bold text-lg"><span className="text-primary">u</span>Wedding</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1 text-gray-500 hover:text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-2 mt-2">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-base font-medium py-2 px-1 hover:text-primary transition-colors border-b border-gray-100"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-4">
            <Button asChild className="w-full">
              <Link href={`/${currentLocale}/create-invitation`} onClick={() => setOpen(false)}>
                {t("banner_create")}
              </Link>
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

// Main Component: Navbar
export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const currentLocale = useLocale();
  const t = useTranslations("");

  return (
    <>
      <header className="sticky top-0 z-[1000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-2 px-3 sm:px-6">
          <Logo />
          <NavigationLinks />
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden lg:inline-flex">
              <Link href={`/${currentLocale}/create-invitation`}>
                {t("banner_create")}
              </Link>
            </Button>
            <SwitchFlag />
            {isMobile && <MobileMenuButton />}
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
}
