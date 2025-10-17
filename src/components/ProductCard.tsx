import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  sku: string;
  description: string;
}

const ProductCard = ({ id, name, price, imageUrl, rating, sku, description }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer border-border">
      <div onClick={() => navigate(`/product/${id}`)} className="overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4" onClick={() => navigate(`/product/${id}`)}>
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(rating)
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({rating})</span>
        </div>
        <p className="text-2xl font-bold text-foreground">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full snipcart-add-item bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow"
          data-item-id={sku}
          data-item-price={price}
          data-item-url={`/product/${id}`}
          data-item-description={description}
          data-item-image={imageUrl}
          data-item-name={name}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
