// Imports
import {writeFile} from "node:fs";
import {template} from "./template.js";

const oldURL = {
    "height": 600,
    "srcOldSirens": "dnBzZWMuc2lyZW5zQGdtYWlsLmNvbQ",
    "srcUSWNT": "M2FiOGxsZXRqNjB2MTF1OGNyYzIwNnJhbXNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
    "srcNewSirens": "Y2FsZW5kYXJAc2FuZGllZ29zaXJlbnMuY29t",
    "color1": "3F51B5",
    "color2": "039BE5",
    "color3": "8B03E5",

}

let output = `<iframe src="https://calendar.google.com/calendar/embed?height=${oldURL.height}&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&showDate=1&showPrint=0&src=${oldURL.srcOldSirens}&src=${oldURL.srcNewSirens}&src=${oldURL.srcUSWNT}&color=%23${oldURL.color2}&color=%23${oldURL.color2}&color=%23${oldURL.color2}" style="border-width:0" width="800" height="${oldURL.height}" frameborder="0" scrolling="no"></iframe>
`;
output += `<iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&src=emFraXlhQHNhbmRpZWdvc2lyZW5zLmNvbQ&src=Y2FsZW5kYXJAc2FuZGllZ29zaXJlbnMuY29t&color=%23039BE5&color=%23AD1457" style="border:solid 1px #777" width="800" height="600" frameborder="0" scrolling="no"></iframe>`

writeFile("./src/calendar/calendar.html", template(output), (error) => {
});
