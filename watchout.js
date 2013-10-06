var score = 0;
var highScore = 0;
var w = 700;
var h = 500;
var n = 20;
var r = 10;
var enemyCoord = [];
var mouseCoord = [];
var player;


var svg = d3.select("svg")
    .attr("width", w)
    .attr("height", h)
    .on('mousemove',mousemove)
;

var update = function(data){

  var circle = svg.selectAll('.enemy')
    .data(data);

  circle.enter().append('circle')
    .attr('class','enemy')
    .attr('r',r)
    .attr('fill','white')
    .attr('cx',function(d) { return d.x; })
    .attr('cy',function(d) { return d.y; });

  circle
    .transition()
    .duration(2000)
    .attr('cx',function(d) { return d.x; })
    .attr('cy',function(d) { return d.y; });
};

var createPlayer = function() {
  player = svg.append('circle')
  .attr('class', 'player')
  .attr('fill', 'orange')
  .attr('r', r)
  .attr('cx', w/2)
  .attr('cy', h/2)
}();

function mousemove(d,i) {
  mouseCoord = d3.mouse(this);
  player.attr('cx', mouseCoord[0])
  .attr('cy', mouseCoord[1]);

}


var start = function() {
  setInterval(function(){
    for (var i = 0; i < n; i++) {
      enemyCoord.push(
        {x: Math.max((Math.random()*(w-r)),r),
         y: Math.max((Math.random()*(h-r)),r)});
    }
    update(enemyCoord);
    enemyCoord = [];
  }, 2000);
}();



// function move(){
//     var dragTarget = d3.select(this);
//     dragTarget
//         .attr("cx", function(){
//           if ((d3.event.dx + parseInt(dragTarget.attr("cx"))) > 695) {
//             return 690;
//           } else if ((d3.event.dx + parseInt(dragTarget.attr("cx"))) < 5){
//             return 10;
//           } else {
//           return (d3.event.dx + parseInt(dragTarget.attr("cx")));
//           }
//         })
//         .attr("cy", function(){
//           if ((d3.event.dy + parseInt(dragTarget.attr("cy"))) > 495) {
//             return 490;
//           } else if ((d3.event.dy + parseInt(dragTarget.attr("cy"))) < 5){
//             return 10;
//           } else {
//           return d3.event.dy + parseInt(dragTarget.attr("cy"));
//           }
//         });
// };

// createPlayers(bSettings.numEnemies);


// // var detectCollisions function() {
//   setInterval(function(){
//      score++;
//      d3.selectAll('.enemy').each(function() {
//        d3.select('.scoreboard').html('High Score: ' + highScore.toString() + '</br> Current Score: ' +score.toString());
//        if (Math.abs((d3.select(this).attr('cy') - d3.select('.thePlayer').attr('cy')) < 10)
//          && Math.abs((d3.select(this).attr('cx') - d3.select('.thePlayer').attr('cx'))) < 10) {
//          if (score > highScore) {
//           highScore = score;
//          }
//          score = 0;
//          d3.select('.thePlayer').attr('r', 0);
//          setTimeout(function(){
//          d3.select('.thePlayer').attr('r', 10);
//          },200)
//          }
//      });
//   }, 10);
// // };


// function startForce() {
// alert('hello')
// var nodes = d3.selectAll('enemy').map(function(i) {
//   return {index: i}
// });

// var links = d3.selectAll('enemy').map(function(i) {
//   return {index: i.cy}
// })



// var force = d3.layout.force()
//     .nodes(nodes)
//     .charge(-300)
//     .on('tick', tick)
//     .start()

// function tick(e) {
//   var k = 6 * e.alpha;
//   nodes.forEach(function(o, i) {
//     o.y += i & 1 ? k : -k;
//     o.x += i & 2 ? k : -k;
//   });
// }
// }



// // var startForce = function() {
// //   d3.selectAll('.enemy')
// //   .call(force.drag)


// // }

// setInterval(function() {
//   startForce();
//   moveEnemies();

// }, 2000);
