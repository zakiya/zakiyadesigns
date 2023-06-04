const timeStamp = new Date().toLocaleDateString("en-US", {
  dateStyle: "medium",
  timeStyle: "medium",
});

// Start template.
const template = (output) => `<html>
<head>
<style>
* {
font-family: sans-serif;
}

h2,
h4 {
display: grid;
grid-template-columns: 1fr 50px;

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
column-count: 2;
margin: 0 auto;
max-width: 850px;
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
