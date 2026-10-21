canvas=document.getElementById("canvas");
canvas2=document.getElementById("canvas2")

const ctx=canvas.getContext("2d");
const ctx2=canvas2.getContext("2d");

const inpimage=new Image();

inpimage.src="image.png"

inpimage.onload=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(inpimage,0,0,canvas.width,canvas.height)
    const uarray=ctx.getImageData(0,0,canvas.width,canvas.height).data;
    const array=Array.from(uarray)
    let ravg=0,gavg=0,bavg=0
    for(let i=0;i<array.length;i+=4){
        ravg+=array[i]/(Math.floor(array.length/4))
        gavg+=array[i+1]/(Math.floor(array.length/4))
        bavg+=array[i+2]/(Math.floor(array.length/4))
    }
    for(let i=0;i<array.length;i+=4){
        array[i]=ravg
        array[i+1]=gavg
        array[i+2]=bavg
    }

    const final=ctx2.createImageData(canvas.width,canvas.height)
    final.data.set(array)
    ctx2.clearRect(0,0,canvas.width,canvas.height)
    ctx2.putImageData(final,0,0)




}