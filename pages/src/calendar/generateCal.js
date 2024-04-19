// Imports
import {writeFile} from "node:fs";
import {template} from "./template.js";

const vars = {
    "height": 600,
    "srcOldSirens": "Y2FsZW5kYXJAc2FuZGllZ29zaXJlbnMuY29t",
    "srcUSWNT": "Y2FsZW5kYXJAc2FuZGllZ29zaXJlbnMuY29t",
    "srcNewSirens": "Y2FsZW5kYXJAc2FuZGllZ29zaXJlbnMuY29t",
    "color1": "3F51B5",
    "color2": "039BE5",
    "color3": "8B03E5",
}

const buildiFrames = (device) => {

    const agenda = (device == "phone") ? `&mode=AGENDA` : ``;
    const css = (device == "phone") ? `visible` : `hidden`;

    const output = `
    <div class="phone-${css} responsive-iframe-container">
        <iframe src="https://calendar.google.com/calendar/embed?height=${vars.height}&wkst=1&bgcolor=%23ffffff${agenda}&ctz=America%2FLos_Angeles&showDate=1&showPrint=0&src=${vars.srcOldSirens}&src=${vars.srcNewSirens}&src=${vars.srcUSWNT}&color=%23${vars.color2}&color=%23${vars.color2}&color=%23${vars.color2}" style="border-width:0" width="800" height="${vars.height}" frameborder="0" scrolling="no"></iframe>
    </div>
    `

    return output;
};

const outputDesktop = buildiFrames();
const outputPhone = buildiFrames("phone")

writeFile("./src/calendar/calendar.html", template(outputDesktop, outputPhone), (error) => {
});
