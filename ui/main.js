function loadLoginForm () {
    var loginHtml = `
        <h2 style="margin-top: 0px;">Login/Register</h2>
        <input type="text" id="username" placeholder="username" /><br/>
        <input type="password" id="password" placeholder="password" />
        <br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
var logreg=document.getElementById('login/register');
logreg.onclick=function(){
document.getElementById('login_area').innerHTML = loginHtml;
          var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
        };
       
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
         if (username.trim() === '' || password.trim() === '') {
        alert("Username/Password field can't be left empty");
        return;
    }
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
    };
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
         
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (username.trim() === '' || password.trim() === '') {
        alert("Username/Password field can't be left empty");
        return;
    }
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    };

}
};

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}
function loadLogin () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
                }
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}
function loadArticles () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}
function loadArticleForm() {
	//added form tag and required attributes
    var articleHtml = `
        <h2>Write an Article</h2>
	<form id="article_form">
        <input type="text" id="heading" placeholder="Heading-The Heading of your article (e.g) Article One" required/><br/>
        <input type="text" id="title" placeholder="Title-The title of your article (e.g)article-one" onChange="this.value=RWS(this.value)" required/><br/>
        <textarea rows="4" cols="50" id="content" placeholder="Content-Enter the content of your article" required></textarea><br/>
        <input type="submit" id="save_btn" value="Create Article" />
 	</form>
        `;
        document.getElementById('article_area').innerHTML = articleHtml;
        var store = document.getElementById('save_btn');
	//handling onsubmit event of form
 	var article_form=document.getElementById('article_form');
         article_form.onsubmit = function (e) {
 	e.preventDefault();//prevent default form submission
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                  alert('Article created successfully');
		  //location.reload(true);
		  //reset the form
		  article_form.reset();
		  //now, load the articles dynamically
		  loadArticles();
              }else if(request.status === 403){ //for alerting users to register/login to create article
                alert('You must Register/Login to create new Article');
	      }else {
		  //use this alert message
                  alert('Article could not be created or Article already exist!');
              }
		  //use this once here
		  store.value = 'Create Article';
          }
        };
	var heading = document.getElementById('heading').value;
	var title = document.getElementById('title').value;
	var content = document.getElementById('content').value;
        request.open('POST', '/create-article', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({heading:heading, title:title , content:content}));  
        store.value = 'Creating...';
    };
}
loadLogin();
loadArticles();
loadArticleForm();
function openlink(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += "active";
}
document.getElementById("defaultOpen").click();