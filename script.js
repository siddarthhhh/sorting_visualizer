const n=10;
const arr=[];

for(let i=0;i<n;i++){
    arr[i]=Math.random();
}

for(let i=0;i<arr.length;i++){
    const bar=document.createElement("div");
    bar.style.height=arr[i]*100+"%";
    bar.style.width="10px";
    bar.style.backgroundColor="black";
    container.appendChild(bar);
}
