/*console.log('Loaded!');
alert('Hi,I\'m Aniruth');
var element=document.getElementById('main-text');
element.innerHTML="newvalue";
var img=document.getElementById("madi");
var marginLeft=0;
function moveright(){
    marginLeft+=1;
    img.style.marginLeft=marginLeft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveright,50);
};*/
var button=document.getElementById('counter');
button.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
   span.innerHTML=counter.toString();   
            }
        }
    };
    
    request.open('GET','http://aniruth-raman.imad.hasura-app.io/counter',true);
    request.send(null);
};