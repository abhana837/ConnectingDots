var xcord=[];
var ycord=[];
function draw()
{
    var canvas=document.getElementById('canvas');
    if(canvas.getContext)
    {
		
        for(var x=0;x<500;x+=50)
            {
				xcord.push(x);
                context.moveTo(x,0);
                context.lineTo(x,500);
            }

            for(var y=0;y<500;y+=50)
            {
				ycord.push(y)
                context.moveTo(0,y);
                context.lineTo(500,y);
            }
            context.strokeStyle='grey';
            context.stroke();
			
    }
}
function getMousePosition(canvas, event) { 
            let rect = canvas.getBoundingClientRect(); 
            let x = event.clientX - rect.left; 
            let y = event.clientY - rect.top; 
            
			drawTick(x,y)
			
        }

function drawTick(mouseX,mouseY){
	console.log(xcord);
	console.log(ycord);
	//write you logic below, this is just test, you can see running main html
	let beginX=0;
	let beginY=0;
	let endX=0;
	let endY=0;
	for (i = 0; i < xcord.length; i++) {
		if(mouseX<=xcord[i]){
			beginX=xcord[i-1];
			endX=xcord[i];
			break;
		}
		else{
			logInfo('something wrong')
			logInfo("Coordinate x: " + mouseX+ " Coordinate y: " + mouseY); 
		}
			
			//context.fill();
		
		//text += cars[i] + "<br>";
	}
	for (i = 0; i < ycord.length; i++) {
		if(mouseY<=ycord[i]){
			beginY=ycord[i-1];
			endY=ycord[i]
			break;
		}
		else{
			logInfo('something wrong')
			logInfo("Coordinate x: " + mouseX+ " Coordinate y: " + mouseY); 
		}
			
			//context.fill();
		
		//text += cars[i] + "<br>";
	}
	context.beginPath();
			//context.fillStyle = "#FF0000";
			context.strokeStyle='red';
            
			context.moveTo(beginX,beginY);//0.0
            context.lineTo(endX,beginY);//0.50
			
			//context.strokeStyle='red';
            context.stroke();
	//context.fillStyle = "#000000";
    //context.beginPath();
    //context.arc(mouseX, mouseY, 50, 0, 2*Math.PI);
    //context.fill();
}

function logInfo(msg){
	console.log(msg)
}		

      
         



/*function createline(x1,x2,y1,y2,lineId)
{
    distance=Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)));
    xMid=(x1+x2)/2
    yMid=(y1+y2)/2

    slopeinRadian=Math.atan2(y1-y2,x1-x2)
    slopeinDegree=(slopeinRadian*180)/Math.PI;

    line.style.width=distance;
    line.style.top=yMid;
    line.style.left=xMid-(distance/2);
    line.style.tranxform="rotate("+slopeinDegree+"deg)";
}*/



/*function getCanvasCoordinate(event)
{
    var x1=event.clientX-canvas.getBoundingClientRect().left,
    y1=event.clientY-canvas.getBoundingClientRect().top;
    return(x1:X,Y:y1);
}
function dragStart(event)
{
    console.log(getCanvasCoordinate(event));

}
function drag(event)
{
    console.log(getCanvasCoordinate(event));

}
function dragStop(event)
{
    console.log(getCanvasCoordinate(event));
}

function init()
{

context.strokeStyle='purple';
context.lineWiidth=6;
context.lineCap='round';

canvas.addEventListener('mousedown','dragStart',false);
canvas.addEventListener('mousemove','drag',false);
canvas.addEventListener('mouseup','dragStop',false);


}
 window.addEventListener('load','init','false');*/