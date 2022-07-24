import { createRequire } from "module";
import { readFileSync, writeFile } from "node:fs";
const require = createRequire(import.meta.url);
import { fileOutputName } from "./shared.js";

const file = readFileSync(fileOutputName, "utf8");
const rawData = JSON.parse(file);

const memberships = [
  "2022 Epic Membership",
  "2022 Mythic Membership",
  "Manual Epic Membership",
];
const bandanas = ["Classic Sirens Bandana (Ready to Ship)"];
const tshirts = [
  "Classic Sirens T-shirt (Pre-Order)",
  "2022 Exclusive: OH WAVE T-shirt (Pre-Order)",
];
const stickers = ["Sirens Sticker Pack (Ready to Ship)"];
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
let membershipCount = 0;
let bandanaCount = 0;
let tshirtCount = 0;
let stickerCount = 0;
let otherText = "";

rawData.forEach((element) => {
  if (memberships.includes(element.Lineitemname)) {
    membershipCount = membershipCount + parseInt(element.Lineitemquantity);
  } else if (bandanas.includes(element.Lineitemname)) {
    bandanaCount = bandanaCount + parseInt(element.Lineitemquantity);
  } else if (tshirts.includes(element.Lineitemname)) {
    tshirtCount = tshirtCount + parseInt(element.Lineitemquantity);
  } else if (stickers.includes(element.Lineitemname)) {
    stickerCount = stickerCount + parseInt(element.Lineitemquantity);
  } else if (others.includes(element.OrderID)) {
    // Known efemera. Do not print.
  } else {
    otherText += "\n needs review:";
    otherText += "\n " + element.OrderID;
    otherText += "\n " + element.Email;
    otherText += "\n " + element.Lineitemname;
  }
});

const timeStamp = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

output += "<h4>Memberships</h4> ";
output += membershipCount;
output += "<h4>Bandanas</h4> ";
output += bandanaCount;
output += "<h4>Tshirts </h4>";
output += tshirtCount;
output += "<h4>Stickers </h4>";
output += stickerCount;
output += otherText;

const template = `<html>
<head>
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

writeFile("index.html", template, (error) => {});
