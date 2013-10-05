var bSettings = {
  numEnemies: 30,
  svgWidth: 1000,
  svgHeight: 1000
};

var gameBoard = d3.select(".gameBoard")
  .append("svg")
  .attr("width", bSettings.svgWidth)
  .attr("height", bSettings.svgHeight);


var createEnemies = function(n) {
  var cx, cy;
  var r = 10;
  var color = 'red';

  for (var i = 0; i < n; i++) {
    cx = Math.floor(Math.random()*bSettings.svgWidth);
    cy = Math.floor(Math.random()*bSettings.svgHeight);

    var enemy = gameBoard.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .style("fill", color);
  }
};

createEnemies(bSettings.numEnemies);


