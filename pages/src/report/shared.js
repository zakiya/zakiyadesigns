import { readFileSync } from "node:fs";

const ordersJSON = "orders.json";
const productsJSON = "./src/report/products.json";

const ordersFile = readFileSync(ordersJSON, "utf8");
const orders = JSON.parse(ordersFile);
const productFile = readFileSync(productsJSON, "utf8");
const products = JSON.parse(productFile);

const years = ["2022", "2023"];

let skusOnly = [];
Object.values(products).forEach((product) => {
  Object.values(product).forEach((productDetails) => {
    productDetails.sku.forEach((sku) => skusOnly.push(sku));
  });
});

export { ordersJSON, products, orders, skusOnly, years };
