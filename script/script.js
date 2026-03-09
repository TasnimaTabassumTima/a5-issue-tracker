document.getElementById("btn-signin").addEventListener('click', function(){
    const inputUsername = document.getElementById("input-username");
    const username = inputUsername.value;

    const inputPassword = document.getElementById("input-password");
    const password = inputPassword.value;
    
    if(username === "admin" && password === "admin123")
    {
        alert("Login Successfull");
        window.location.assign("https://tasnimatabassumtima.github.io/a5-issue-tracker/home.html");        
        // window.location.assign("../home.html");        

    }
    else{
        alert("Login Faild");
        return;
    }
});