canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth
canvas.height=window.innerHeight

function renderchunk(chunk){
    for(let i=0; i<64; i++){
        let y=Math.floor((i)/8)
        let x=i-(y*8);
        console.log(x,y);
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
    for (let i=1;i<64;i++){
    chunk[i-1]=0;
    chunk[i]=1
    renderchunk(chunk)
    await sleep(100)
}
}

main()

