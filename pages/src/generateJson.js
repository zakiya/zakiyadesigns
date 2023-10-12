// Go to site, download Orders.csv
// Open file in Numbers
// Export to .. CSV; don't include table names; Save as orders.csv
// npm run json

import { createRequire } from "module";
import { ordersJSONFileName } from "./report/shared.js";

const require = createRequire(import.meta.url);

const csvToJson = require("convert-csv-to-json");
const ordersCSVFileName = "./src/data/orders.csv";
csvToJson
  .fieldDelimiter(",")
  .generateJsonFileFromCsv(ordersCSVFileName, ordersJSONFileName);
