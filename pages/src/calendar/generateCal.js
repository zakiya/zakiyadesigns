// Imports
import {writeFile} from "node:fs";
// import {products, skusOnly, years} from "./report/shared.js";
// import {orders} from "./generateJson.js";
// import {idsToOmit} from "./report/idsToOmit.js";
import {template} from "./template.js";
// import {misc} from "./report/templateMisc.js";

const oldURL = {
    "height": 700,
}

let output = `<iframe src="https://calendar.google.com/calendar/embed?height${oldURL.height}&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showDate=1&showPrint=0&src=dnBzZWMuc2lyZW5zQGdtYWlsLmNvbQ&src=M2FiOGxsZXRqNjB2MTF1OGNyYzIwNnJhbXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%233F51B5&color=%23039BE5" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
`;

writeFile("./src/calendar/calendar.html", template(output), (error) => {
});
