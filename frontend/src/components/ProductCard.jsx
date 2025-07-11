export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px" }}>
      <h3>{product.name}</h3>
      <p>Price: Rp{product.price}</p>
      <p>Stock: {product.stock}</p>
    </div>
  );
}
