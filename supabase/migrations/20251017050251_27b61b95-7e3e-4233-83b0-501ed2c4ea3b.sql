-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  inventory INTEGER NOT NULL DEFAULT 0,
  sku TEXT NOT NULL UNIQUE,
  rating DECIMAL(2, 1) DEFAULT 4.5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can view products)
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products
INSERT INTO public.products (name, description, price, image_url, category, inventory, sku, rating) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation and 30-hour battery life', 99.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', 'electronics', 50, 'WH-001', 4.8),
('Smart Watch', 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and GPS', 249.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', 'electronics', 35, 'SW-001', 4.6),
('Cotton T-Shirt', 'Premium cotton t-shirt available in multiple colors and sizes', 24.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', 'clothing', 100, 'TS-001', 4.5),
('Denim Jeans', 'Classic fit denim jeans made from durable, comfortable fabric', 59.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop', 'clothing', 75, 'DJ-001', 4.7),
('Garden Tools Set', 'Complete 10-piece garden tools set with ergonomic handles', 79.99, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop', 'home', 40, 'GT-001', 4.4),
('LED Desk Lamp', 'Adjustable LED desk lamp with touch controls and USB charging port', 39.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop', 'home', 60, 'DL-001', 4.6),
('Running Shoes', 'Lightweight running shoes with excellent cushioning and support', 89.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', 'sports', 45, 'RS-001', 4.9),
('Yoga Mat', 'Non-slip yoga mat with extra cushioning for comfortable practice', 34.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop', 'sports', 80, 'YM-001', 4.7);