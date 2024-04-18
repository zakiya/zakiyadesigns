// Imports
import {writeFile} from "node:fs";
// import {products, skusOnly, years} from "./report/shared.js";
// import {orders} from "./generateJson.js";
// import {idsToOmit} from "./report/idsToOmit.js";
import {template} from "./template.js";
// import {misc} from "./report/templateMisc.js";

const oldURL = {
    "height": 700,
    "src1": "dnBzZWMuc2lyZW5zQGdtYWlsLmNvbQ",
    "src2": "M2FiOGxsZXRqNjB2MTF1OGNyYzIwNnJhbXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
    "color1": "3F51B5",
    "color2": "039BE5",
}

let output = `<iframe src="https://calendar.google.com/calendar/embed?height${oldURL.height}&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showDate=1&showPrint=0&src=${oldURL.src1}&src=${oldURL.src2}&color=%23${oldURL.color1}&color=%23${oldURL.color2}" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
`;

writeFile("./src/calendar/calendar.html", template(output), (error) => {
});
