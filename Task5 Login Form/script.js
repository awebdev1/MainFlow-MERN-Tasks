document.body=document.createElement("body");

const formBox=document.createElement("div");
document.body.appendChild(formBox);
formBox.className="formBox";

//form
const form=document.createElement("form");
form.setAttribute("method","post");

const formName=document.createElement("h3");
formName.textContent="Login";

const emailInput=document.createElement("input");
emailInput.className="email-input";
emailInput.setAttribute("type","email");
emailInput.setAttribute("placeholder","Email");
emailInput.required=true;

const passInput=document.createElement("input");
passInput.setAttribute("type","password");
passInput.setAttribute("placeholder","Password");
passInput.required=true;


const button=document.createElement("button");
button.setAttribute("email","Submit");
button.textContent="Login";

formBox.appendChild(form);
form.appendChild(formName);
form.appendChild(emailInput);
form.appendChild(passInput);
form.appendChild(button);

form.addEventListener("submit",()=>{
    alert("Email:"+`${emailInput.value}`+`\n`+"Password:"+`${passInput.value}`);
});
