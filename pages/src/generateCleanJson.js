import { readFileSync } from "node:fs";
import { writeFileSync } from "node:fs";

// Read the input JSON file
const inputJson = readFileSync("../orders.json");

// Parse the input JSON into a JavaScript object
const inputObj = JSON.parse(inputJson);

// Remove the Order.BillingAddress field from the object

for (let i = 0; i < inputObj.length; i++) {
  const order = inputObj[i];
  delete order.Email;
  delete order.BillingName;
  delete order.BillingAddress1;
  delete order.BillingAddress2;
  delete order.BillingPhone;
  delete order.ShippingName;
  delete order.ShippingAddress1;
  delete order.ShippingAddress2;
  delete order.ShippingPhone;
  delete order.PaymentMethod;
}

// Convert the modified object back to JSON
const outputJson = JSON.stringify(inputObj);

// Write the output JSON to a new file
writeFileSync("output.json", outputJson);
