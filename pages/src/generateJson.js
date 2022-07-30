// Go to site, download Orders.csv
// Open file in Numbers
// Export to .. CSV; don't include table names; Save as orders.csv
// npm run json

import { createRequire } from "module";
import { fileOutputName } from "./shared.js";

const require = createRequire(import.meta.url);

const csvToJson = require("convert-csv-to-json");
const fileInputName = "orders.csv";
csvToJson
  .fieldDelimiter(",")
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
