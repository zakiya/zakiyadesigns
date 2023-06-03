// To debug, open /pages in VS Code and turn on autoattach always.

// Imports
import { writeFile } from "node:fs";
import { products, orders, skusOnly } from "./report/shared.js";
import { idsToOmit } from "./report/idsToOmit.js";
import { template } from "./report/template.js";
import { misc } from "./report/templateMisc.js";

/// SORT AND COUNT!!
// const counter = {};

const buildCounter = () => {
  let counttemplat = {};

  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {});
  });

  let pretemplate = [];
  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      const thisLabel = productDetails.label;
      const thisParent = productDetails.parent;

      pretemplate.push([thisLabel, 0]);

      counttemplat[thisParent] = {
        count: 0,
        products: pretemplate,
      };
    });
  });

  return counttemplat;
};

const counter = buildCounter();

const sortAndCount = (order) => {
  const ordersku = order.Lineitemsku;
  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      if (productDetails.sku.includes(ordersku)) {
        const thisParent = productDetails.parent;
        const thislabel = productDetails.label;
        const startParentcount = counter[thisParent].count;

        counter[thisParent].count =
          startParentcount + parseInt(order.Lineitemquantity);
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

// const counter = {
//   category1: {
//     count: 6,
//     products: [
//       ["product1", 1],
//       ["product2", 3],
//     ],
//   },
//   category2: {
//     count: 6,
//     products: [
//       ["product21", 5],
//       ["product22", 3],
//     ],
//   },
// };
// const counter = {
//   category1: {
//     count: 6,
//     products: [
//       { product1: 1 },
//       { product3: 2 },
//       { product4: 5 },
//       { product5: 2 },
//       { product6: 2 },
//     ],
//   },
//   category2: {
//     count: 6,
//     products: [
//       [product1, 1],
//       { product3: 2 },
//       { product4: 5 },
//       { product5: 14 },
//       { product6: 2 },
//     ],
//   },
// };
const sortedCounterArray = Object.keys(counter).sort();
sortedCounterArray.forEach((key) => {
  let line1 = `<h2><span>${key}</span> <span>${counter[key].count}</span></h2>\n`;
  counter[key].products.forEach((item) => {
    line1 += `<p><span>${item[0]}</span> <span>${item[1]}</span></p>\n`;
  });
  output += line1;
});

output += misc;

writeFile("sirens-merch.html", template(output), (error) => {});
