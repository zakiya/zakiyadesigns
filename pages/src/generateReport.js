// To debug, open /pages in VS Code and turn on autoattach always.

// Imports
import { readFileSync, writeFile } from "node:fs";
import { productsJSON, ordersJSON } from "./report/shared.js";
import { ordersToOmit } from "./report/ordersToOmit.js";
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

const printRefunds = (order) => {
  otherText += "\n Refund: ";
  otherText += order.Lineitemquantity;
  otherText += " " + order.Lineitemname;
};

let output = "";
let otherText = "";

// Loop through orders.json.
orders.forEach((order) => {
  if (order.FinancialStatus === "refunded") {
    printRefunds(order);
  } else if (
    // Lineitemname is in our list of products.json.
    skusOnly.includes(order.Lineitemsku)
    // @todo - why doesn't removing refunds change the numbers?
    // or removing my number
  ) {
    // We've got a match so start counting.
    sortAndCount(order);
  } else if (
    // OrderID is in our list of known Private Notes errors and other uncountables.
    // @todo The "Private Notes" column in order.csv gets pushed to a new OrderID.
    ordersToOmit.includes(order.OrderID)
  ) {
    /*do nothing*/
  } else {
    printUnlistedItems(order);
  }
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
