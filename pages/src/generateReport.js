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

  let pretemplate = [];
  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      // const thisLabel = productDetails.label;
      const thisParent = productDetails.parent;

      counttemplat[thisParent] = {
        count: 0,
        products: {},
      };
    });
  });

  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      const thisLabel = productDetails.label;
      const thisParent = productDetails.parent;
      const add = { [thisLabel]: { count: 0 } };

      Object.entries(add).forEach(([key, value]) => {
        counttemplat[thisParent].products[key] = value;
      });

      // counttemplat[thisParent].products[thisLabel] = {
      //   count: 0,
      // };
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
        const startLabelcount = counter[thisParent].products[thislabel].count;

        counter[thisParent].products[thislabel].count =
          startLabelcount + parseInt(order.Lineitemquantity);

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

  Object.entries(counter[key].products).forEach((key) => {
    line1 += `<p><span>${key[0]}</span> <span>${key[1].count}</span></p>\n`;
  });

  output += line1;
});

output += misc;

writeFile("sirens-merch.html", template(output), (error) => {});
