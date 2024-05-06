const template = (songList) => {
  return `<html lang="en">
<head>
<link rel="stylesheet" href="index.css">
</head>
<body>

<div class="songs-page">
${songList}
</div>

</body>
</html>`
}


export default template;