// To debug, open /pages in VS Code and turn on autoattach always.

// Imports
import { writeFile } from "node:fs";
import { products, skusOnly, years } from "./report/shared.js";
import { orders } from "./generateJson.js";
import { idsToOmit } from "./report/idsToOmit.js";
import { template } from "./report/template.js";
import { misc } from "./report/templateMisc.js";

//// 1. Build the template.
// Get all the category names.
const buildCategoryTemplate = () => {
  let categoryTemplate = {};

  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      const thisCategory = productDetails.parent;

      categoryTemplate[thisCategory] = {
        count: 0,
        products: {},
      };
    });
  });
  return categoryTemplate;
};

// Get all the product names.
const addProductsToCategoryTemplate = () => {
  let categoryTemplate = buildCategoryTemplate();
  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      const thisLabel = productDetails.label;
      const thisCategory = productDetails.parent;
      const add = { [thisLabel]: { count: 0 } };

      Object.entries(add).forEach(([key, value]) => {
        categoryTemplate[thisCategory].products[key] = value;
      });
    });
  });
  return categoryTemplate;
};

// Get the years.
const buildYearTemplate = () => {
  let yearTemplate = {};
  years.forEach((year) => {
    yearTemplate[year] = addProductsToCategoryTemplate();
  });
  return yearTemplate;
};

// Now we have our counter object to fill in.
const counter = buildYearTemplate();
// Sort the counter.
const sortedCounterArray = Object.keys(counter).sort();

// 2. Match the orders to the template.
// But first, we filter out the orders we don't want.
const ordersToCount = orders
  .filter((order) => order.FinancialStatus !== "refunded")
  .filter((order) => !idsToOmit.includes(order.OrderID))
  .filter((order) => skusOnly.includes(order.Lineitemsku));

// Now fill in the template with counts by iterating through the orders.
const countOrders = (order) => {
  const ordersku = order.Lineitemsku;

  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      if (productDetails.sku.includes(ordersku)) {
        const thisParent = productDetails.parent;
        const thislabel = productDetails.label;
        const matchingOrder = orders.find(
          (item) => item.OrderID === order.OrderID
        );

        const thisYear =
          order.Createdat === ""
            ? matchingOrder.Createdat.substring(0, 4)
            : order.Createdat.substring(0, 4);

        const startParentcount = counter[thisYear][thisParent].count;
        const startLabelcount =
          counter[thisYear][thisParent].products[thislabel].count;

        counter[thisYear][thisParent].products[thislabel].count =
          startLabelcount + parseInt(order.Lineitemquantity);

        counter[thisYear][thisParent].count =
          startParentcount + parseInt(order.Lineitemquantity);
      }
    });
  });
};

ordersToCount.forEach((order) => {
  countOrders(order);
});

// 3. Print Report.
// Start with an empty string.
let output = "";

// Add HTML markup with values.
const printProductsAndCategories = (yearsObject, year) => {
  const yearsArray = Object.keys(yearsObject).sort();
  yearsArray.forEach((category) => {
    if (counter[year][category].count !== 0) {
      output += `<h2><span>${category}</span> <span>${counter[year][category].count}</span></h2>\n`;
    }

    Object.entries(counter[year][category].products).forEach((product) => {
      if (product[1].count !== 0) {
        output += `<p><span>${product[0]}</span> <span>${product[1].count}</span></p>\n`;
      }
    });
  });
};

// Group by year.
sortedCounterArray.forEach((year) => {
  output += `<div class="year"><h1><span>${year}</span></h1>\n`;
  printProductsAndCategories(counter[year], year);

  output += `</div>`;
});

// Get the content from templateMisc.js
output += misc;

// Write the report.
writeFile("sirens-merch.html", template(output), (error) => {});
