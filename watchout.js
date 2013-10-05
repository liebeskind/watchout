var bSettings = {
  numEnemies: 30,
  svgWidth: 0.6*(window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth),
  svgHeight: 0.6*(window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight)
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
    cx = Math.max(Math.floor(Math.random()*(bSettings.svgWidth-r)),r);
    cy = Math.max(Math.floor(Math.random()*(bSettings.svgHeight-r)), r);

    var enemy = gameBoard.append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", r)
      .style("fill", color);
  }

  var range = _.range(0,bSettings.numEnemies);
  d3.select('body').selectAll('circle').data(range);
  d3.select('body').selectAll('circle').attr('class',function(d){
    return d;
  });
};

createEnemies(bSettings.numEnemies);
