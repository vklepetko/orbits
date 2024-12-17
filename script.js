
var element_memory = [
["-0.0797","0","0.387","0.3787","#9E9E9E"],
["-0.0051","0","0.7233","0.7232","#FFD700"],
["-0.017","0","1","0.9999","#4682B4"],
["-0.1433","0","1.5241","1.5173","#B22222"],
["-0.255","0","5.2039","5.1976","#D2691E"],
["-0.4978","0","9.5722","9.5592","#F4A460"],
["-0.9007","0","19.1644","19.1433","#40E0D0"],
["-0.3018","0","30.1805","30.179","#4169E1"],
["-9.6328","0","39.4786","38.2854","#D8DEE9"]
];
var color_array = ["#D8DEE9","#4169E1", "#40E0D0", "#F4A460","#D2691E", "#B22222", "#4682B4", "#FFD700", "#9E9E9E"   ];

var svg = document.getElementById('svg');
svg.innerHTML = "";
svg.setAttribute('viewBox',getViewBoxString(150));

var anim = document.createElementNS("http://www.w3.org/2000/svg","animate");
anim.setAttribute('attributeName','viewBox');
anim.setAttribute('to',getViewBoxString(20));
anim.setAttribute('dur','1s');
//anim.setAttribute('fill','freeze');
anim.setAttribute('onend','zoom(21)');
svg.appendChild(anim);


function drawMemory(){
    
  for (var i = 0; i < element_memory.length; i++) {
    var cx = Number(element_memory[i][0]);
    var cy = Number(element_memory[i][1]);
    var rx = Number(element_memory[i][2]);
    var ry = Number(element_memory[i][3]);
    var color = element_memory[i][4];
    
    drawEllipse(rx,ry,cx,cy,color);
  };
};

function getViewBoxString(fov){
	var slope = window.innerHeight/window.innerWidth;
	var viewbox_string = String(-fov/2) + " " + String(slope *-fov/2) + " " + String(fov) +" "+ String(slope * fov);
	return viewbox_string;
};

function zoom(fov){
	var svg = document.getElementById('svg');
    	svg.setAttribute('viewBox', getViewBoxString(fov));
	document.getElementById('fov_descr').innerHTML = Number(fov).toFixed(2);
 };

function refresh(){
  svg.innerHTML = "";
  
  var a = Number(document.getElementById('slider_a').value);
  var e = Number(document.getElementById('slider_e').value)/100;
  var b = getSemiMinor(a,e);
  //var w = window.innerWidth;
  //var h = window.innerHeight;
  //var c = ((Number(document.getElementById('checkbox_center_focus').checked) ==1) ?  w*0.618 - e*a : w*0.618);
  var cx = -a*e;
  var cy = 0;
    
  document.getElementById('a_descr').innerHTML = a.toFixed(2);
  document.getElementById('e_descr').innerHTML = e.toFixed(2);
  document.getElementById('b_descr').innerHTML = b.toFixed(2);
  document.getElementById('peri_descr').innerHTML = (a-e*a).toFixed(2);
  document.getElementById('aphe_descr').innerHTML = (a+e*a).toFixed(2);
  document.getElementById('epsi_descr').innerHTML = (e*a).toFixed(2);
  document.getElementById('period_descr').innerHTML = Math.sqrt(a**3).toFixed(2);

  drawMemory();
  embellish=((Number(document.getElementById('checkbox_ellipse_lines').checked) ==1) ?  Boolean(1) : Boolean(0));
  drawEllipse(a,b,cx,cy,color_array[0],embellish);
  
};



function getSemiMinor(a,e){
  return Math.pow((Math.pow(a,2)-Math.pow(a*e,2)),1/2);
};

function drawEllipse(rx,ry,cx,cy,color,embellish=Boolean(0)){

if (ry==0){
	var eli = document.createElementNS("http://www.w3.org/2000/svg","line");
	eli.setAttribute("x1",-rx);
	eli.setAttribute("y1",0);
	eli.setAttribute("x2",rx);
	eli.setAttribute("y2",0);	
	eli.setAttribute("class","ellipse");
	eli.setAttribute("fill","none");
	eli.setAttribute("stroke",color);
	eli.setAttribute("stroke-width","0.05");	
}
else{
	
var eli = document.createElementNS("http://www.w3.org/2000/svg","ellipse");

eli.setAttribute("cx",cx);
eli.setAttribute("cy",cy);
eli.setAttribute("rx",rx);
eli.setAttribute("ry",ry);
eli.setAttribute("class","ellipse");
eli.setAttribute("fill","none");
eli.setAttribute("stroke",color);
eli.setAttribute("stroke-width","0.05");	
};
	


epsilon = Math.pow((Math.pow(rx,2)-Math.pow(ry,2)),1/2);
    
var focus1 = document.createElementNS("http://www.w3.org/2000/svg","circle");
focus1.setAttribute("cx",cx+epsilon);
focus1.setAttribute("cy",cy);
focus1.setAttribute("stroke","none");
focus1.setAttribute("stroke-width","0.1");
focus1.setAttribute("fill","gold");
focus1.setAttribute("r","0.05");
  
svg.appendChild(eli);
svg.appendChild(focus1);

if (embellish) {
var major =document.createElementNS("http://www.w3.org/2000/svg","line");
major.setAttribute("x1",cx-rx);
major.setAttribute("y1",cy);
major.setAttribute("x2",cx+rx);
major.setAttribute("y2",cy);
major.setAttribute("stroke-width","0.01");
major.setAttribute("stroke","grey");
major.setAttribute("stroke-dasharray","0.01");

  

var minor =document.createElementNS("http://www.w3.org/2000/svg","line");
minor.setAttribute("x1",cx);
minor.setAttribute("y1",cy-ry);
minor.setAttribute("x2",cx);
minor.setAttribute("y2",cy+ry);
minor.setAttribute("stroke-width","0.01");
minor.setAttribute("stroke","grey");
minor.setAttribute("stroke-dasharray","0.01");

var focus2 = document.createElementNS("http://www.w3.org/2000/svg","circle");
focus2.setAttribute("cx",cx-epsilon);
focus2.setAttribute("cy",cy);
focus2.setAttribute("stroke","grey");
focus2.setAttribute("fill","none");
focus2.setAttribute("stroke-width","0.005");
focus2.setAttribute("r","0.05");

svg.appendChild(major);
svg.appendChild(minor);
svg.appendChild(focus2);

}};

function save(){
  ellipses = document.getElementsByClassName('ellipse');
  for (var i = 0; i < ellipses.length; i++) {
    var rx = ellipses[i].getAttribute("rx");
    var ry = ellipses[i].getAttribute("ry");
    var cx = ellipses[i].getAttribute("cx");
    var cy = ellipses[i].getAttribute("cy");
    var color = ellipses[i].getAttribute("stroke");;
    element_memory.push([cx,cy,rx,ry,color]);
    var old_color = color_array.shift();
    color_array.push(old_color);
  }
    var a_slider = document.getElementById('slider_a')
    a_slider.value = Number(a_slider.value)*2;
    refresh();
  console.log(element_memory)
  //drawEllipse(1.5*rx,1.5*ry,cx,cy,"red",embellish=Boolean(1));
};

function erase(){
  element_memory = [];
  document.getElementById('slider_a').value = 1;
  document.getElementById('slider_e').value = 5;
  svg.innerHTML = "";
  refresh();
};

//drawEllipse(100,100);

//document.body.appendChild(svg);
//window.onresize = refresh();

drawMemory();
//zoom(5);

