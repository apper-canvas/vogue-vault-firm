import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import productService from "@/services/api/productService";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ProductGrid from "@/components/organisms/ProductGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
const data = await productService.getById(id);
      setProduct(data);
      
      const sizes = data.sizes_c ? data.sizes_c.split(',') : [];
      const colors = data.colors_c ? data.colors_c.split(',') : [];
      
      setSelectedSize(sizes[0] || "");
      setSelectedColor(colors[0] || "");

      const related = await productService.getByCategory(data.category_c);
      setRelatedProducts(related.filter((p) => p.Id !== data.Id).slice(0, 4));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast.success("Added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    navigate("/cart");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProduct} />;
  if (!product) return null;

  const inWishlist = isInWishlist(product.Id);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-primary/60 mb-8">
          <button onClick={() => navigate("/")} className="hover:text-accent">
            Home
          </button>
          <ApperIcon name="ChevronRight" size={16} />
<button
            onClick={() => navigate(`/category/${product.category_c}`)}
            className="hover:text-accent capitalize"
          >
            {product.category_c}
          </button>
          <ApperIcon name="ChevronRight" size={16} />
          <span className="text-primary">{product.name_c || product.Name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
<div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-white rounded-lg overflow-hidden"
            >
              <img
                src={(product.images_c ? product.images_c.split(',') : [])[selectedImage] || ''}
                alt={product.name_c || product.Name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex gap-4">
              {(product.images_c ? product.images_c.split(',') : []).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                    selectedImage === index
                      ? "border-accent"
                      : "border-secondary hover:border-accent/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name_c || product.Name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
<h1 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-2">
                {product.name_c || product.Name}
              </h1>
              <p className="text-lg text-primary/60 capitalize">
                {product.category_c}
              </p>
            </div>

            <p className="text-4xl font-display font-bold text-accent">
              ${product.price_c ? product.price_c.toFixed(2) : '0.00'}
            </p>

<p className="text-primary/80 leading-relaxed">
              {product.description_c}
            </p>

            <div className="space-y-4">
              <Select
                label="Size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
{(product.sizes_c ? product.sizes_c.split(',') : []).map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>

              <Select
                label="Color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
{(product.colors_c ? product.colors_c.split(',') : []).map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </Select>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border-2 border-secondary rounded hover:border-accent transition-colors duration-200 flex items-center justify-center"
                  >
                    <ApperIcon name="Minus" size={18} />
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border-2 border-secondary rounded hover:border-accent transition-colors duration-200 flex items-center justify-center"
                  >
                    <ApperIcon name="Plus" size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleAddToCart}
disabled={!product.inStock_c}
              >
                <ApperIcon name="ShoppingCart" size={20} />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={() => toggleWishlist(product.Id)}
              >
                <ApperIcon
                  name="Heart"
                  size={20}
                  className={inWishlist ? "fill-accent text-accent" : ""}
                />
              </Button>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={handleBuyNow}
disabled={!product.inStock_c}
            >
              Buy Now
            </Button>

{!product.inStock_c && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-center gap-3">
                <ApperIcon name="AlertCircle" size={20} className="text-error" />
                <span className="text-error font-medium">
                  Currently out of stock
                </span>
              </div>
            )}

            <div className="border-t border-secondary pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <ApperIcon name="Truck" size={20} className="text-accent mt-1" />
                <div>
                  <h4 className="font-medium text-primary mb-1">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-primary/60">
                    On orders over $100
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="RefreshCw" size={20} className="text-accent mt-1" />
                <div>
                  <h4 className="font-medium text-primary mb-1">
                    Easy Returns
                  </h4>
                  <p className="text-sm text-primary/60">
                    30-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ApperIcon name="Shield" size={20} className="text-accent mt-1" />
                <div>
                  <h4 className="font-medium text-primary mb-1">
                    Secure Checkout
                  </h4>
                  <p className="text-sm text-primary/60">
                    Your information is protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-display font-bold text-primary mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;