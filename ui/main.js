var submit=document.getElementById("submit_btn");
submit.onlick=function(){
  var request=new XMLHttpRequest();
  
  request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE)
      {
          if(request.status===200){
          alert("Logged In Successfully");
          }else if(request.status===403){
              alert("Incorrect Username/Password");
          }else if(request.status===500){
              alert("Something Went wrong");
          }
          
      }
};

var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST',"http://aniruth-raman.imad.hasura-app.io/login",true);
request.setRequestHeader("Content-type","application/json");
request.send(JSON.stringify({username:username,password:password}));
};