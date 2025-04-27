// Go to site, download Orders.csv
// Open file in Numbers
// Export to .. CSV; don't include table names; Save as orders.csv
// npm run json

import { writeFileSync } from "node:fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const csvToJson = require("convert-csv-to-json");

// Define file names.
const ordersCSVFileName = "./pages/src/data/orders.csv";
const ordersJSONFileName = "./pages/src/data/orders.json";

// Convert CSV file to a JSON object.
const orders = csvToJson.fieldDelimiter(",").getJsonFromCsv(ordersCSVFileName);

// Remove sensitive information.
for (let i = 0; i < orders.length; i++) {
  const order = orders[i];
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

// Write the file and make data available to other apps.
// @todo - only write file in debug mode.
writeFileSync(ordersJSONFileName, JSON.stringify(orders));
export { orders };
