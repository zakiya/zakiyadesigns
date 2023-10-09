// To debug, open /pages in VS Code and turn on autoattach always.

// Imports
import { writeFile } from "node:fs";
import { products, orders, skusOnly, years } from "./report/shared.js";
import { idsToOmit } from "./report/idsToOmit.js";
import { template } from "./report/template.js";
import { misc } from "./report/templateMisc.js";

/// SORT AND COUNT!!

const buildCounter = () => {
  let counttemplat = {};

  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
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
    });
  });
  return counttemplat;
};

const groupByYear = () => {
  let groupCountTemplate = {};
  years.forEach((year) => {
    groupCountTemplate[year] = buildCounter();
  });
  return groupCountTemplate;
};

const counter = groupByYear();

const sortAndCount = (order) => {
  const ordersku = order.Lineitemsku;

  Object.values(products).forEach((product) => {
    Object.values(product).forEach((productDetails) => {
      if (productDetails.sku.includes(ordersku)) {
        // Back to normal looping.
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
  // });
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

const printTheRest = (yearsObject, year) => {
  const yearsArry = Object.keys(yearsObject).sort();
  yearsArry.forEach((key) => {
    let line1 = "";
    if (counter[year][key].count !== 0) {
      line1 += `<h2><span>${key}</span> <span>${counter[year][key].count}</span></h2>\n`;
    }

    Object.entries(counter[year][key].products).forEach((key) => {
      if (key[1].count !== 0) {
        line1 += `<p><span>${key[0]}</span> <span>${key[1].count}</span></p>\n`;
      }
    });
    output += line1;
  });
};

sortedCounterArray.forEach((year) => {
  output += `<div class="year"><h1><span>${year}</span></h1>\n`;
  printTheRest(counter[year], year);

  output += `</div>`;
});

output += misc;

writeFile("sirens-merch.html", template(output), (error) => {});
