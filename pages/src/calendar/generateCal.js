// Imports
import {writeFile} from "node:fs";
import {template} from "./template.js";

const vars = {
    "height": 600,
    "srcNewSirens": "Y2FsZW5kYXJAc2FuZGllZ29zaXJlbnMuY29t",
    "srcUSWNT": "jsrdpoh8m3n0ktnignum3ckfpc1mu5k1%40import.calendar.google.com",
    "color1": "230B8043",
    "color2": "233F51B5",
}

const buildiFrames = (device) => {

    const agenda = (device == "phone") ? `&mode=AGENDA` : ``;
    const css = (device == "phone") ? `visible` : `hidden`;

    let output = `
    <div class="phone-${css} responsive-iframe-container">
        <iframe src="https://calendar.google.com/calendar/embed?height=${vars.height}&wkst=1&bgcolor=%23ffffff${agenda}&ctz=America%2FLos_Angeles&showDate=1&showPrint=0`
    output += ``;
    output += ``;
    output += `&src=${vars.srcNewSirens}`;
    output += `&src=${vars.srcUSWNT}`;
    output += `&color=%${vars.color1}`;
    output += `&color=%${vars.color2}`;
    output += `" style="border-width:0" width="800" height="${vars.height}" frameborder="0" scrolling="no"></iframe>`;
    output += `</div>`;

    return output;
};

const outputDesktop = buildiFrames();
const outputPhone = buildiFrames("phone")

writeFile("./pages/calendar.html", template(outputDesktop, outputPhone), (error) => {
});
