var score = 0;
var highScore = 0;

var bSettings = {
  numEnemies: 20,
  svgWidth: 700,
  svgHeight: 500
};

var gameBoard = d3.select(".gameBoard")
  .append("svg")
  .attr("width", bSettings.svgWidth)
  .attr("height", bSettings.svgHeight);


var createPlayers = function(n) {
  var cx, cy;
  var r = 10;
  var color = 'black';

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
    return 'enemy ' + d;
  });

  var player = gameBoard.append("circle")
      .attr("cx", bSettings.svgWidth/2)
      .attr("cy", bSettings.svgHeight/2)
      .attr("r", r)
      .style("fill", 'blue')
      .attr('class', 'thePlayer')
      .call(d3.behavior.drag().on("drag", move));
};

function move(){
    var dragTarget = d3.select(this);
    dragTarget
        .attr("cx", function(){
          if ((d3.event.dx + parseInt(dragTarget.attr("cx"))) > 695) {
            return 690;
          } else if ((d3.event.dx + parseInt(dragTarget.attr("cx"))) < 5){
            return 10;
          } else {
          return (d3.event.dx + parseInt(dragTarget.attr("cx")));
          }
        })
        .attr("cy", function(){
          if ((d3.event.dy + parseInt(dragTarget.attr("cy"))) > 495) {
            return 490;
          } else if ((d3.event.dy + parseInt(dragTarget.attr("cy"))) < 5){
            return 10;
          } else {
          return d3.event.dy + parseInt(dragTarget.attr("cy"));
          }
        });
};

createPlayers(bSettings.numEnemies);

var moveEnemies = function() {
  d3.select('body').selectAll('.enemy').each(function(){
    d3.select(this).transition().duration(2000).attr('cx', Math.max(Math.floor(Math.random()*(bSettings.svgWidth-10)),10))
    .attr('cy', Math.max(Math.floor(Math.random()*(bSettings.svgHeight-10)),10));
  });

};

setInterval(function(){
   score++;
   d3.selectAll('.enemy').each(function() {
     d3.select('.scoreboard').html('High Score: ' + highScore.toString() + '</br> Current Score: ' +score.toString());
     if (Math.abs((d3.select(this).attr('cy') - d3.select('.thePlayer').attr('cy')) < 10)
       && Math.abs((d3.select(this).attr('cx') - d3.select('.thePlayer').attr('cx'))) < 10) {
       if (score > highScore) {
        highScore = score;
       }
       score = 0;
      }
   });
}, 10);

setInterval(moveEnemies, 2000);