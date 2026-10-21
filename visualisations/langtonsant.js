canvas=document.getElementById("canvas");
const iterations=document.getElementById("iterations")
const ctx=canvas.getContext("2d");

canvas.width=500
canvas.height=500


function getaddress(x,y){
    return y*100+x
}

function getxy(address){
    let y=Math.floor((address)/100)
    let x=address-(y*100);
    return [x,y]
}

function w(address){
    return getaddress(getxy(address)[0],getxy(address)[1]-1)
}
function a(address){
    return address-1;
}
function d(address){
    return address+1;
}
function s(address){
    return address=getaddress(getxy(address)[0],getxy(address)[1]+1)

}

function renderchunk(chunk,caddr){
    
        let [x,y]=getxy(caddr)
        if (chunk[caddr]==1){
            ctx.fillStyle="black";
        }else{
            ctx.fillStyle="white";
        }
        ctx.fillRect(5*x,5*y,5,5)
}








function main(){
    let chunk= new Uint8Array(10000);
    let direction=0
    //0 north; 1 east; 2 south; 3 west
    let caddr=getaddress(50,50)
    let i=0;


    const stepsperframe=100;
    function frame(){
        for(let k=0;k<stepsperframe;k++){
            let old=caddr
        let loopotpt=loop(chunk,caddr,direction)
        renderchunk(loopotpt[0],old)
        caddr=loopotpt[1]
        direction=loopotpt[2]
        
        
        
        if (Math.abs(getxy(caddr)[0]-getxy(old)[0])>1||caddr<0||caddr>=10000){
            return;
        }
        
        i++

        }iterations.textContent=`${i}`
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)


    /*
    while (i<50000){
        let old=caddr
        loopotpt=loop(chunk,caddr,direction)
        renderchunk(loopotpt[0],old)
        caddr=loopotpt[1]
        direction=loopotpt[2]
        
        iterations.textContent=`${i}`
        
        if ((getxy(caddr)[0]-getxy(old)[0])>1||caddr<0||caddr>10000){
            break;
        }
        
        i++
    
}*/

    //await sleep(100)

}

function reset(){
    ctx.fillStyle="white"
   ctx.fillRect(0,0,500,500) 
}

function loop(chunk,caddr,direction){
    if(chunk[caddr]==0){
        chunk[caddr]=1
        if (direction==0){
            caddr=a(caddr);
            
        }else if (direction==1){
            caddr=w(caddr)
            
        }else if (direction==2){
            caddr=d(caddr)
            
        }else if (direction==3){
            caddr=s(caddr)
            
        }
        direction-=1
        if(direction==-1){
            direction=3
        }
    }
    else{
        chunk[caddr]=0
        if (direction==0){
            caddr=d(caddr);
            
        }else if (direction==1){
            caddr=s(caddr)
            
        }else if (direction==2){
            caddr=a(caddr)
            
        }else if (direction==3){
            caddr=w(caddr)
            
        }
        direction+=1
        if(direction==4){
            direction=0
        }
    }
    return [chunk,caddr,direction]
}



