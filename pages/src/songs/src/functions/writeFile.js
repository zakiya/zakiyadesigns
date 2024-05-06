import {writeFile} from "node:fs";
import drupalSongData from '../data/songs.json' assert {type: 'json'};
import songList from '../classes/songList.js';
import template from "../classes/template.js";

const othertemp = songList(drupalSongData)
const temp = template(othertemp);

writeFile("src/songs/index.html", temp, (error) => {
});