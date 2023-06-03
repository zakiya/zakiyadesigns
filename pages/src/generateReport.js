// To debug, open /pages in VS Code and turn on autoattach always.

// Imports
import { writeFile } from "node:fs";
import { products, orders, skusOnly } from "./report/shared.js";
import { idsToOmit } from "./report/idsToOmit.js";
import { template } from "./report/template.js";
import { misc } from "./report/templateMisc.js";

/// SORT AND COUNT!!
const counter = {};
const sortAndCount = (order) => {
  const ordersku = order.Lineitemsku;

  Object.values(products).forEach((product) => {
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

// Filter to get the orders for the report
const ordersToCount = orders
  .filter((order) => order.FinancialStatus !== "refunded")
  .filter((order) => !idsToOmit.includes(order.OrderID))
  .filter((order) => skusOnly.includes(order.Lineitemsku));

ordersToCount.forEach((order) => {
  sortAndCount(order);
});

// Sort the final data and print it.
let output = "";
const sortedCounterArray = Object.keys(counter).sort();
sortedCounterArray.forEach((line) => {
  output += `<h4><span>${line}</span> <span>${counter[line]}</span></h4>\n`;
});

output += misc;

writeFile("sirens-merch.html", template(output), (error) => {});
