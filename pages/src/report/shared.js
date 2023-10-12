import { readFileSync } from "node:fs";

// Get file names.
const ordersJSONFileName = "./src/data/output.json";
const productsJSONileName = "./src/data/products.json";

// Read the files.
const ordersFile = readFileSync(ordersJSONFileName, "utf8");
const productFile = readFileSync(productsJSONileName, "utf8");

// Convert to Json data.
const orders = JSON.parse(ordersFile);
const products = JSON.parse(productFile);

// @todo move years to separate file.
const years = ["2022", "2023"];

// @todo move skus to separate file.
let skusOnly = [];
Object.values(products).forEach((product) => {
  Object.values(product).forEach((productDetails) => {
    productDetails.sku.forEach((sku) => skusOnly.push(sku));
  });
});

export { ordersJSONFileName, products, orders, skusOnly, years };
