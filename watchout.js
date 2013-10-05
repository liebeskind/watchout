var bSettings = {
  numEnemies: 5,
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


var createPlayers = function(n) {
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

  // this is somehow triggering movement
  d3.select('body').selectAll('circle').attr('class',function(d){
    return 'enemy ' + d;
  });

  var player = gameBoard.append("circle")
      .attr("cx", bSettings.svgWidth/2)
      .attr("cy", bSettings.svgHeight/2)
      .attr("r", r)
      .style("fill", 'blue');
};

createPlayers(bSettings.numEnemies);


// var moveEnemies = function() {
//   d3.select('body').selectAll('.enemy').each(function(){
//     d3.select(this).transition().duration(2100).attr('cx', Math.max(Math.floor(Math.random()*(bSettings.svgWidth-10)),10))
//     .attr('cy', Math.max(Math.floor(Math.random()*(bSettings.svgHeight-10)),10));
//   });
// };



// moveEnemies();
// setInterval(moveEnemies, 4000);