console.log('Loaded!');
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
};