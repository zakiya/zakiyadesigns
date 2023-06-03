// Start template.
const template = (output, timeStamp) => `<html>
<head>
<style>
* {
font-family: sans-serif;
}

h2,
h4 {
display: grid;
grid-template-columns: 1fr 30px;
max-width: 350px;
}
span:nth-child(2) {
  text-align: right;
}

h2 {
background-color: #0A2141;
color: #FFFFFF;
padding: 10px;
}

.updated {
  font-size: .85rem;
  color: darkgrey;
  padding: 10px 0;
  font-style: italic;
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
