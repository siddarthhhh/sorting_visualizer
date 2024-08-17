const n=10;
const arr=[];

init();


function init(){
    for(let i=0;i<n;i++){
        arr[i]=Math.random();
    }
    showbars();
}

function play(){
    bubblesort(arr);
    showbars;
}


function bubblesort(arr){
    
    do{
        var swapped=false;

        for(let i=1;i<arr.length;i++){
            if(arr[i-1]>arr[i]){
                swapped=true;
                [arr[i-1],arr[i]]=[arr[i],arr[i-1]];

            }
        }
    }while(swapped);


}

function showbars(){
    container.innerHTML="";
    for(let i=0;i<arr.length;i++){
        const bar=document.createElement("div");
        bar.style.height=arr[i]*100+"%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
    
}
