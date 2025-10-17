import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity"
          >
            <ShoppingCart className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:inline">ShopHub</span>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 bg-background text-foreground border-none"
              />
              <Button 
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none bg-accent hover:bg-accent/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="snipcart-checkout text-primary-foreground hover:bg-primary-glow relative"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="snipcart-items-count absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"></span>
          </Button>
        </div>

        {/* Category Menu */}
        <nav className="flex gap-6 py-2 overflow-x-auto text-sm">
          <button 
            onClick={() => navigate("/products")}
            className="text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap transition-colors"
          >
            All Products
          </button>
          <button 
            onClick={() => navigate("/products?category=electronics")}
            className="text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap transition-colors"
          >
            Electronics
          </button>
          <button 
            onClick={() => navigate("/products?category=clothing")}
            className="text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap transition-colors"
          >
            Clothing
          </button>
          <button 
            onClick={() => navigate("/products?category=home")}
            className="text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap transition-colors"
          >
            Home & Garden
          </button>
          <button 
            onClick={() => navigate("/products?category=sports")}
            className="text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap transition-colors"
          >
            Sports
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
