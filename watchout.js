var score = 0;
var highScore = 0;
var w = 700;
var h = 500;
var n = 25;
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
  var enemies = svg.selectAll('.enemy')
    .data(data);

  enemies.enter().append('circle')
    .attr('class','enemy')
    .attr('r',r)
    .attr('fill','white')
    .attr('cx',function(d) { return d.x; })
    .attr('cy',function(d) { return d.y; });

  var checkCollision = function(enemyNextPos,playerX,playerY) {
    console.log(Math.sqrt(Math.pow(enemyNextPos.x-playerX, 2) + Math.pow(enemyNextPos.y-playerY, 2)));
//pythagorean theorem for checking distance between player and enemy
    if (Math.sqrt(Math.pow(enemyNextPos.x-playerX, 2) + Math.pow(enemyNextPos.y-playerY, 2)) < (2*r)) {
      console.log('x');
      if (highScore < score) {
        highScore = score;
      }
      score = 0;

      //flashes when player has been hit
      d3.select('.player').attr('r', 0);
      setTimeout(function(){
        d3.select('.player').attr('r', 10);
         },200);
         }
  };

  tweenWithCollisionDetection = function(d) {
    score++;
    var endPos, enemy, startPos;
    enemy = d3.select(this);
    startPos = {
      x: parseFloat(enemy.attr('cx')),
      y: parseFloat(enemy.attr('cy'))
    };
    endPos = {
      x: d.x,
      y: d.y
    };

    return function(t) {
      var playerX = parseFloat(player.attr('cx'));
      var playerY = parseFloat(player.attr('cy'));
      var enemyNextPos = {
        x: startPos.x + (endPos.x - startPos.x) * t,
        y: startPos.y + (endPos.y - startPos.y) * t
      };

      checkCollision(enemyNextPos,playerX,playerY);

      return enemy.attr('cx', enemyNextPos.x).attr('cy', enemyNextPos.y);
    };
  };


  enemies
  .transition()
  .duration(2000)
  .tween('custom', tweenWithCollisionDetection);
};


var createPlayer = function() {
  player = svg.append('circle')
  .attr('class', 'player')
  .attr('fill', 'orange')
  .attr('r', r)
  .attr('cx', w/2)
  .attr('cy', h/2);
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

  setInterval(
    function(){
    score++;
  d3.select('.scoreboard').html('High Score: ' + highScore.toString() 
    + '</br> Current Score: ' +score.toString());
  },100);
}();
