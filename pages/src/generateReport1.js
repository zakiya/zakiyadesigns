import { readFileSync, writeFile } from "node:fs";
import { isDeepStrictEqual } from "node:util";
import { fileOutputName } from "./shared.js";

const rawDataFile = readFileSync(fileOutputName, "utf8");
const rawData = JSON.parse(rawDataFile);

const categoriesFile = readFileSync("src/categories.json", "utf8");
const categories = JSON.parse(categoriesFile);

const productLablesFile = readFileSync("src/productLabels.json", "utf8");
const labelList = JSON.parse(productLablesFile);

let labelsOnly = [];
let labelsObject = {};

labelList.forEach((item) => {
  labelsOnly.push(item.label);
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
  let itemcount = 0;
  const index = order.Lineitemname;

  if (typeof index === "string" && index !== "1") {
    if (isNaN(counter[index])) {
      console.log("typeof counter[index] 4");
      counter[index] = 0;
    } else {
      counter[index] += parseInt(order.Lineitemquantity);
    }
  }
};

const printUnlistedItems = (order) => {
  otherText += "\n needs review:";
  otherText += "\n " + order.OrderID;
  otherText += "\n " + order.Email;
  otherText += "\n " + order.Lineitemname;
  console.log(otherText);
};

let output = "";
let otherText = "";

// Loop through orders.json.
rawData.forEach((order) => {
  if (
    // Lineitemname is in our list of productLabels.json.
    labelsOnly.includes(order.Lineitemname) ||
    // OrderID is in our list of known Private Notes errors.
    // @todo The "Private Notes" column in order.csv gets pushed to a new OrderID.
    others.includes(order.OrderID)
  ) {
    // We've got a match so start counting.
    sortAndCount(order);
  } else {
    printUnlistedItems(order);
  }
});

console.log(counter);

for (const [key, value] of Object.entries(counter)) {
  output += `<h4><span>${key}</span> <span>${value}</span></h4>\n`;

  // output += `<h2><span>Total ${category.type}</span> <span>${category.categoryCount}</span></h4>\n`;
}

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
