canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth
canvas.height=window.innerHeight


function getaddress(x,y){
    return y*16+x
}

function getxy(address){
    let y=Math.floor((address)/16)
    let x=address-(y*16);
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

function renderchunk(chunk){
    for(let i=0; i<256; i++){
        let [x,y]=getxy(i)
        if (chunk[i]==1){
            ctx.fillStyle="black";
        }else{
            ctx.fillStyle="white";
        }
        ctx.fillRect(10*x,10*y,10,10)
    }
}



const sleep = ms => new Promise(r=>setTimeout(r,ms));


async function main(){
    let chunk= new Uint8Array(256);
    let direction=0
    //0 north; 1 east; 2 south; 3 west
    let caddr=getaddress(4,4)
    for (let i=0;i<50000;i++){
        loopotpt=loop(chunk,caddr,direction)
        renderchunk(loopotpt[0])
        caddr=loopotpt[1]
        direction=loopotpt[2]
        
    
        if (getxy(caddr)[0]>=16|| getxy(caddr)[1]>=16){
            return;
        }
        await sleep(0)
    
}

    //await sleep(100)

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

main()

