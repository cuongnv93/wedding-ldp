"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import AuthModal from "./auth-modal";
import CheckoutModal from "./checkout-modal";
import { useCart } from "../contexts/cart-context";

function Logo() {
  return (
    <Link href="/" className="font-bold text-xl">
      SPRINT<span className="text-primary">X</span>
    </Link>
  );
}

// Component con: Navigation Links
function NavigationLinks() {
  const links = ["Nam", "Nữ", "Trẻ em", "Bộ sưu tập", "Khuyến mãi"];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {links.map((link, index) => (
        <Link
          key={index}
          href="#"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          {link}
        </Link>
      ))}
    </nav>
  );
}

// Component con: CartButton
function CartButton({ onClick }: { onClick: () => void }) {
  const { items } = useCart();

  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="relative">
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Giỏ hàng</span>
      {items.length > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
        >
          {items.length}
        </Badge>
      )}
    </Button>
  );
}

// Component con: AuthButtons
function AuthButtons({
  onLoginClick,
  onRegisterClick,
}: {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}) {
  return (
    <>
      <Button
        variant="outline"
        className="hidden md:flex"
        onClick={onLoginClick}
      >
        Đăng nhập
      </Button>
      <Button className="hidden md:flex" onClick={onRegisterClick}>
        Đăng ký
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <NavigationLinks />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>
            <CartButton onClick={() => setIsCheckoutModalOpen(true)} />
            <AuthButtons
              onLoginClick={() => setIsAuthModalOpen(true)}
              onRegisterClick={() => setIsAuthModalOpen(true)}
            />
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
