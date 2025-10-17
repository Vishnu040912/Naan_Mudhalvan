import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ShoppingBag, Truck, Shield, CreditCard } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-hero text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices
          </p>
          <Button
            onClick={() => navigate("/products")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-glow"
          >
            Start Shopping
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Wide Selection</h3>
            <p className="text-sm text-muted-foreground">Thousands of products to choose from</p>
          </div>
          <div className="text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">Quick delivery to your doorstep</p>
          </div>
          <div className="text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Secure Shopping</h3>
            <p className="text-sm text-muted-foreground">Your data is safe with us</p>
          </div>
          <div className="text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Easy Payments</h3>
            <p className="text-sm text-muted-foreground">Multiple payment options</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card shadow-elegant rounded-lg container mx-auto px-4 py-12 my-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Browse our extensive collection of products and find exactly what you need
          </p>
          <Button
            onClick={() => navigate("/products")}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow"
          >
            View All Products
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
