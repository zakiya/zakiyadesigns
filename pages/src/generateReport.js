// To debug, open /pages in VS Code and turn on autoattach always.

// Imports
import { readFileSync, writeFile } from "node:fs";
import { productsJSON, ordersJSON } from "./report/shared.js";
import { idsToOmit } from "./report/idsToOmit.js";
import { template } from "./report/template.js";

// JSON to array.
const ordersFile = readFileSync(ordersJSON, "utf8");
const orders = JSON.parse(ordersFile);
const productFile = readFileSync(productsJSON, "utf8");
const products = JSON.parse(productFile);

let skusOnly = [];
Object.values(products).forEach((product) => {
  Object.values(product).forEach((productDetails) => {
    productDetails.sku.forEach((sku) => skusOnly.push(sku));
  });
});

/// SORT AND COUNT!!
const counter = {};
const sortAndCount = (order) => {
  const ordersku = order.Lineitemsku;

  Object.values(products).forEach((product) => {
    // IF THE order sku is is in the product's skulist

    Object.values(product).forEach((productDetails) => {
      if (productDetails.sku.includes(ordersku)) {
        const thislabel = productDetails.label;

        if (isNaN(counter[thislabel])) {
          counter[thislabel] = parseInt(order.Lineitemquantity);
        } else {
          counter[thislabel] += parseInt(order.Lineitemquantity);
        }
      }
    });
  });
};

const printUnlistedItems = (order) => {
  otherText += "\n needs review:";
  otherText += "\n " + order.OrderID;
  otherText += "\n " + order.Email;
  otherText += "\n " + order.FinancialStatus;
  otherText += "\n " + order.Lineitemname;
  otherText += "\n " + order.Lineitemsku;
};

let output = "";
let otherText = "";

// Filter to get the orders for the report
const ordersToCount = orders
  .filter((order) => order.FinancialStatus !== "refunded")
  .filter((order) => !idsToOmit.includes(order.OrderID))
  .filter((order) => skusOnly.includes(order.Lineitemsku));

ordersToCount.forEach((order) => {
  sortAndCount(order);
});

// Sort the final data and print it.
const sortedCounterArray = Object.keys(counter).sort();
sortedCounterArray.forEach((line) => {
  output += `<h4><span>${line}</span> <span>${counter[line]}</span></h4>\n`;
});

const timeStamp = new Date().toLocaleDateString("en-US", {
  dateStyle: "medium",
  timeStyle: "medium",
});

output += otherText;

writeFile("sirens-merch.html", template(output, timeStamp), (error) => {});
