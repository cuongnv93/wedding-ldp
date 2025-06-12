"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import AuthModal from "./auth-modal";
import CheckoutModal from "./checkout-modal";
import { motion } from "framer-motion"; // Import framer-motion

function Logo() {
  return (
    <Link href="/" className="font-bold text-xl">
      <span className="text-primary">U</span>Wedding
    </Link>
  );
}

// Component con: Navigation Links
function NavigationLinks() {
  const links = [
    {
      name: "Giới thiệu",
      href: "#about",
    },
    {
      name: "Thiệp mời",
      href: "#product",
    },
    {
      name: "Câu hỏi thường gặp",
      href: "#faq",
    },
    {
      name: "Liên hệ",
      href: "#footer",
    },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
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
function CreatCard() {
  return (
    <>
      <Button className="hidden md:flex">
        Tạo thiệp cưới
        <motion.div
          style={{ display: "inline-block" }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      </Button>
    </>
  );
}

// Component con: MobileMenuButton
function MobileMenuButton() {
  return (
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Menu</span>
    </Button>
  );
}

// Main Component: Navbar
export default function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[1000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <NavigationLinks />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button> */}
            {/* <CartButton onClick={() => setIsCheckoutModalOpen(true)} /> */}
            <CreatCard />
            <MobileMenuButton />
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
