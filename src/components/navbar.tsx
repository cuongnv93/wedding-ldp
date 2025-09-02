"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import AuthModal from "./auth-modal";
import CheckoutModal from "./checkout-modal";
import { useIsMobile } from "@/hooks/use-mobile"
// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SwitchFlag } from "./ui/switchFlag";
import { useTranslations, useLocale } from "next-intl";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function Logo() {
  const currentLocale = useLocale();

  return (
    <Link href={`/${currentLocale}`} className="font-bold text-2xl">
      <span className="text-primary">u</span>Wedding
    </Link>
  );
}

// Component con: Navigation Links
function NavigationLinks() {
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(true);
  const t = useTranslations("");
  const currentLocale = useLocale();

  useEffect(() => {
    setIsHomePage(window.location.pathname === "/");
  }, []);

  const links = [
    {
      name: t("about"),
      href: "#about",
    },
    {
      name: t("product"),
      href: "#product",
    },
    {
      name: t("faq_menu"),
      href: "#faq",
    },
    {
      name: t("contact"),
      href: "#footer",
    },
  ];

  const handleClick = (href: string) => {
    if (isHomePage) {
      // Scroll to element if on homepage
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          // block: "start",
        });
      }
    } else {
      // Navigate to homepage with hash, browser will handle scrolling
      router.push(`/${currentLocale}/#${href.substring(1)}`);
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleClick(link.href);
          }}
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}

// Component con: CartButton
// function CartButton({ onClick }: { onClick: () => void }) {
//   const { items } = useCart();

//   return (
//     <Button variant="ghost" size="icon" onClick={onClick} className="relative">
//       <ShoppingCart className="h-5 w-5" />
//       <span className="sr-only">Giỏ hàng</span>
//       {items.length > 0 && (
//         <Badge
//           variant="destructive"
//           className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
//         >
//           {items.length}
//         </Badge>
//       )}
//     </Button>
//   );
// }

// Component con: AuthButtons
// function CreatCard() {
//   return (
//     <Link href="/create-invitation">
//       <Button className="hidden md:flex">Tạo thiệp cưới ngay</Button>
//     </Link>
//   );
// }

// Component con: MobileMenuButton
function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("");
  const currentLocale = useLocale();

  const links = [
    { name: t("about"), href: "#about" },
    { name: t("product"), href: "#product" },
    { name: t("faq_menu"), href: "#faq" },
    { name: t("contact"), href: "#footer" },
  ];

  return (
    <>
      <button
        type="button"
        className="md:hidden flex items-center justify-center p-2 ml-8"
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
        size={260}
      >
        <div className="p-6 flex flex-col gap-6 h-full bg-white">
          <button
            type="button"
            className="self-end mb-4"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={`/${currentLocale}/#${link.href.replace("#", "")}`}
              className="text-lg font-medium py-2"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </>
  );
}

// Main Component: Navbar
export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const isMobile = useIsMobile()

  return (
    <>
      <header className="sticky top-0 z-[1000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <NavigationLinks />

          {/* Action Buttons */}
          <div className="flex items-center">
            {/* <CreatCard /> */}
            <SwitchFlag />
            {isMobile && <MobileMenuButton />}
          </div>
        </div>
      </header>
      {/* Modals */}
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
