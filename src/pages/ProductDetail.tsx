import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  inventory: number;
  sku: string;
  rating: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      toast({
        title: "Error loading product",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-96 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <p className="text-center text-xl text-muted-foreground">Product not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 bg-card shadow-elegant rounded-lg p-6">
          <div className="rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.rating} stars)</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-4xl font-bold text-foreground mb-2">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {product.inventory > 0 ? `In Stock (${product.inventory} available)` : "Out of Stock"}
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <h2 className="text-xl font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>SKU:</strong> {product.sku}
              </p>
            </div>

            <Button
              className="w-full snipcart-add-item bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 shadow-glow"
              disabled={product.inventory === 0}
              data-item-id={product.sku}
              data-item-price={product.price}
              data-item-url={`/product/${product.id}`}
              data-item-description={product.description}
              data-item-image={product.image_url}
              data-item-name={product.name}
            >
              {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
