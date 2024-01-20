import { readFileSync } from "node:fs";

// Get file names.

const productsJSONileName = "./src/data/products.json";

// Read the files.
const productFile = readFileSync(productsJSONileName, "utf8");

// Convert to Json data.
const products = JSON.parse(productFile);

// @todo move years to separate file.
const years = ["2022", "2023", "2024"];

// @todo move skus to separate file.
let skusOnly = [];
Object.values(products).forEach((product) => {
  Object.values(product).forEach((productDetails) => {
    productDetails.sku.forEach((sku) => skusOnly.push(sku));
  });
});

export { products, skusOnly, years };
