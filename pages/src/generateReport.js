// To debug, open /pages in VS Code and turn on autoattach always.

import { readFileSync, writeFile } from "node:fs";
import { fileOutputName } from "./shared.js";

const rawDataFile = readFileSync(fileOutputName, "utf8");
const rawData = JSON.parse(rawDataFile);

const productFile = readFileSync("src/products.json", "utf8");
const products = JSON.parse(productFile);

let skusOnly = [];
Object.values(products).forEach((product) => {
  Object.values(product).forEach((productDetails) => {
    productDetails.sku.forEach((sku) => skusOnly.push(sku));
  });
});

const others = [
  'Free; Fulfilled @ Jeralyn"',
  'Cash to Zakiya then venmo @ Home & Away"',
  'venmo @ home & away June 4"',
  'venmo @ Home & away 4 June"',
  'venmo @ home & away 4 June"',
  'venmo @ home & away 4 June"',
  'venmo @ home & away 4 Jun"',
  'venmo @ Jeralyn"',
  'Zelle @ Jeralyn"',
  "86", // zoochia+free
  'owe stickers; Last name should be Sorhman"',
  'I owe them a beer at the next watch party because I forgot to give them the free shipping code..."',
  "Jeralyn - leadership; collected in person; pay back from Googie's list\"",
];

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
rawData.forEach((order) => {
  if (order.FinancialStatus === "refunded") {
    // printRefunds(order);
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
    others.includes(order.OrderID)
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

// Start template.
const template = `<html>
<head>
<style>
* {
font-family: sans-serif;
}

h2,
h4 {
display: grid;
grid-template-columns: 1fr 30px;
max-width: 350px;
}
span:nth-child(2) {
  text-align: right;
}

h2 {
background-color: #0A2141;
color: #FFFFFF;
padding: 10px;
}

.updated {
  font-size: .85rem;
  color: darkgrey;
  padding: 10px 0;
  font-style: italic;
}

</style>
</head>
<body>

<div class="chart">
${output}
</div>

<div class="updated"> Updated: ${timeStamp} <br>
These numbers do not include refunds and test memberships. Squarespace
analytics do.</div>


</body>
</html>`;

writeFile("sirens-merch.html", template, (error) => {});
