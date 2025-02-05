const timeStamp = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "medium",
}).format(new Date());

// Start template.
const template = (output) => `<html>
<head>
<style>
* {
font-family: sans-serif;
}
.year:first-child {
  grid-area: year1;
}
.year:nth-child(2) {
  grid-area: year2;
}

.year:nth-child(3) {
  grid-area: year3;
}

h2,
h4 {
;

}
span:nth-child(2) {
  text-align: right;
}

h2 {
background-color: #0A2141;
color: #FFFFFF;
padding: 10px;
font-size: 16px;
}

.updated {
  font-size: .85rem;
  color: darkgrey;
  padding: 10px 0;
  font-style: italic;
  margin: 0 auto;
  max-width: 550px;
}

.chart {
  margin: 0 auto;
  max-width: 1050px;
}

@media (min-width: 680px) {
  .chart {
  display: grid;
  grid-template-areas: "year1 year2 year3";
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 50px;
  }
}

</style>
</head>
<body>

<div class="chart">
${output}
</div>

<div class="updated"> Updated: ${timeStamp} <br>
These numbers do not include refunds and test memberships. Squarespace
analytics do.</div>


</body>
</html>`;

export { template };
