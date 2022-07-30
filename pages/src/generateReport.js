import { readFileSync, writeFile } from "node:fs";
import { fileOutputName } from "./shared.js";

const rawDataFile = readFileSync(fileOutputName, "utf8");
const rawData = JSON.parse(rawDataFile);

const categoriesFile = readFileSync("src/categories.json", "utf8");
const categories = JSON.parse(categoriesFile);

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
];

let output = "";
let otherText = "";

rawData.forEach((order) => {
  let orderType = null;

  categories.forEach((category) => {
    for (const [key, product] of Object.entries(category.products)) {
      if (product.label === order.Lineitemname) {
        category.categoryCount += parseInt(order.Lineitemquantity);
        category.products[key].productCount += parseInt(order.Lineitemquantity);
        orderType = "known";
      } else {
        orderType = "unknown";
      }
    }
  });

  if (!others.includes(order.OrderID) && orderType === null) {
    otherText += "\n needs review:";
    otherText += "\n " + order.OrderID;
    otherText += "\n " + order.Email;
    otherText += "\n " + order.Lineitemname;
  }
});

categories.forEach((category) => {
  for (const [key, product] of Object.entries(category.products)) {
    output += `<h4><span>${product.label}</span> <span>${product.productCount}</span></h4>\n`;
  }
  output += `<h2><span>Total ${category.type}</span> <span>${category.categoryCount}</span></h4>\n`;
});

const timeStamp = new Date().toLocaleDateString("en-US", {
  dateStyle: "medium",
  timeStyle: "medium",
});

output += otherText;

const template = `<html>
<head>
<style>
* {
font-family: sans-serif;
}

h2,
h4 {
display: grid;
grid-template-columns: 1fr 100px;
max-width: 600px;
}
span:nth-child(2) {
  text-align: right;
}

h2 {
background-color: #0A2141;
color: #FFFFFF;
padding: 10px;
}
</style>
</head>
<body>

<div class="chart">
${output}
</div>
<div>
${timeStamp}
</div>

</body>
</html>`;

writeFile("sirens-merch.html", template, (error) => {});
