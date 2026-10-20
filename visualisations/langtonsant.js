canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth
canvas.height=window.innerHeight


function getaddress(x,y){
    return y*8+x
}

function getxy(address){
    let y=Math.floor((address)/8)
    let x=address-(y*8);
    return [x,y]
}

function renderchunk(chunk){
    for(let i=0; i<64; i++){
        let [x,y]=getxy(i)
        if (chunk[i]==1){
            ctx.fillStyle="black";
        }else{
            ctx.fillStyle="white";
        }
        ctx.fillRect(10*x,10*y,10,10)
    }
}

let chunk= new Uint8Array(64);

const sleep = ms => new Promise(r=>setTimeout(r,ms));


async function main(){
    
    for (let caddr=0;caddr<64;caddr++){
        chunk[caddr]=1
        renderchunk(chunk)
    
        if (getxy(caddr)[0]>=8|| getxy(caddr)[1]>=8){
            return;
        }
        await sleep(100)
    
}

    //await sleep(100)

}

main()

