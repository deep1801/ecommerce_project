// ===========================================================
// Frontend-only display helpers (no backend / API involvement).
// Used to render premium ecommerce UI details such as MRP,
// discount badges and a "recently viewed" list.
// ===========================================================

// Stable, deterministic discount derived from a product id so the
// same product always shows the same "MRP" and discount percentage.
export const deriveDiscount = (id = "") => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 100000;
  }
  // Discount between 12% and 45%
  const percent = 12 + (hash % 34);
  return percent;
};

// Given a selling price + percent, compute the original ("MRP") price.
export const getOriginalPrice = (price = 0, percent = 0) => {
  if (!price || !percent) return price;
  return Math.round(price / (1 - percent / 100));
};

// Convenience: returns { percent, original, savings } for a product.
export const getPricing = (product = {}) => {
  const price = product.price || 0;
  const percent = deriveDiscount(product._id);
  const original = getOriginalPrice(price, percent);
  return { price, percent, original, savings: original - price };
};

export const formatINR = (value = 0) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

// ---- Recently viewed (localStorage, UI-only) ----

const RECENT_KEY = "recentlyViewed";
const RECENT_LIMIT = 8;

export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (product) => {
  if (!product || !product._id) return;
  try {
    const existing = getRecentlyViewed().filter((p) => p._id !== product._id);
    const next = [
      {
        _id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
      },
      ...existing,
    ].slice(0, RECENT_LIMIT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
};
