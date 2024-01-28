                                                                                // HOME LOADER 
$(document).ready( function()  {
    nameSearch("").then( function() {
        $(".loadingScreen").fadeOut(500)
        $("body").css("overflow", "visible")
    })
})
                                                                                // NAV 
function openNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)
    $(".navToggleIcon").addClass(" fa-square-xmark");
    $(".navToggleIcon").removeClass("fa-bars");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeNav() {
    let navWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -navWidth }, 800)
    $(".navToggleIcon").addClass("fa-bars");
    $(".navToggleIcon").removeClass(" fa-square-xmark");
    $(".links li").animate({
        top: 500}, 500)
}
closeNav()
$(".side-nav-menu i.navToggleIcon").on('click' , function(){
    if ($(".side-nav-menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})
                                                                                // DISPLAY MEAL CARDS 
let displayData = document.getElementById("data");
function displayMeals(arr) {
    let display = "";
    for (let i = 0; i < arr.length; i++) {
        display += `<div class="col-md-6 col-lg-3">
                <div onclick="getDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="meal logo" srcset="">
                    <div class="cardLayer position-absolute d-flex justify-content-center align-items-center text-black">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>`;
    }
    displayData.innerHTML = display
}
                                                                                // SEARCH INPUTS 
let searchInputs = document.getElementById("searchInputs");
function search() {
    searchInputs.innerHTML = `<div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="nameSearch(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="letterSearch(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;
    displayData.innerHTML = ""
}
async function nameSearch(cat) {     //search by meal name
    closeNav();
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cat}`)
    response = await api.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".pathLoader").fadeOut(500)
}
async function letterSearch(cat) {    // search by meal first letter
    closeNav();
    cat == "" ? cat = "a" : "";
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${cat}`)
    response = await api.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".pathLoader").fadeOut(500)
}
                                                                                // MEALS CATEGORIES 
async function getCat() {
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    searchInputs.innerHTML = "";
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await api.json()
    displayCat(response.categories)
    $(".pathLoader").fadeOut(500)
}
async function getCategoryMeals(category) {
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await api.json()
    displayMeals(response.meals)
    $(".pathLoader").fadeOut(500)
}
function displayCat(arr) {
    let display = "";
    for (let i = 0; i < arr.length; i++) {
        display += `<div class="col-md-6 col-lg-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="cardLayer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}</p>
                    </div>
                </div>
        </div>`;
    }
    displayData.innerHTML = display
}
                                                                                // AREA 
async function getArea() {
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    searchInputs.innerHTML = "";
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await api.json();
    displayArea(respone.meals)
    $(".pathLoader").fadeOut(500)
}
async function getAreaMeals(area) {
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await api.json()
    displayMeals(response.meals)
    $(".pathLoader").fadeOut(500)
}
function displayArea(arr) {
    let display = "";
    for (let i = 0; i < arr.length; i++) {
        display += `<div class="col-md-6 col-lg-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-5x"></i>
                        <h3 class="pt-2">${arr[i].strArea}</h3>
                </div>
        </div>`;
    }
    displayData.innerHTML = display
}
                                                                                // Ingredients
async function getIngredients() {
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    searchInputs.innerHTML = "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await api.json();
    displayIngredients(respone.meals.slice(0, 20))
    $(".pathLoader").fadeOut(500)
}
async function getIngredientsMeals(ing) {
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    response = await api.json()
    displayMeals(response.meals.slice(0,20))
    $(".pathLoader").fadeOut(500)
}
function displayIngredients(arr) {
    let display = "";
    for (let i = 0; i < arr.length; i++) {
        display += `<div class="col-md-6 col-lg-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                        <h3 class="pt-2">${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split("").slice(0,20).join("")}</p>
                </div>
        </div>`;
    }
    displayData.innerHTML = display
}
                                                                                // DETAILS 
async function getDetails(Id) {
    closeNav()
    displayData.innerHTML = ""
    $(".pathLoader").fadeIn(500)
    searchInputs.innerHTML = "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Id}`);
    respone = await api.json();
    displayDetails(respone.meals[0])
    $(".pathLoader").fadeOut(500)
}
function displayDetails(meal) {
    searchInputs.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tag = ''
    for (let i = 0; i < tags.length; i++) {
        tag += `<li class="alert alert-danger px-3 m-2 p-1">${tags[i]}</li>`
    }
    let display = `<div class="col-md-4">
                <img class="w-100 img-fluid rounded-4" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="py-2">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 px-4">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3 class="pb-2 pt-2" ><span >Area: </span>${meal.strArea}</h3>
                <h3 class="pb-2" ><span >Category: </span>${meal.strCategory}</h3>
                <h3 class="title">Recipes: </h3>
                <ul class=" d-flex m-4 flex-wrap">
                    <li>${ingredients}</li>
                </ul>
                <h3 class="title" >Tags: </h3>
                <ul class=" d-flex flex-wrap"> 
                    <li>${tag}</li> 
                </ul>
                <a href="${meal.strSource}" class="btn mt-2 p-2 pe-3 ps-3 btn-success me-2" target="_blank"> Source </a>
                <a href="${meal.strYoutube}" class="btn mt-2 p-2 pe-3 ps-3 btn-danger" target="_blank"> Youtube </a>
            </div>`;
    displayData.innerHTML = display
}
                                                                            // CONTACT 
let submitBtn;
let inName=false;
let inEmail=false;
let inTel =false;
let inAge=false;
let inPassword=false;
let inRepassword=false;
function displayContacts(){
    displayData.innerHTML=`<div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="container text-center">
        <div class="row">
            <div class="col-md-6">
                <input id="name" onkeyup="inputIsValid()" type="text" class="inputs form-control bg-transparent mb-4 text-white" placeholder="Enter Your Name">
                <div id="nameNotValid" class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="inputIsValid()" type="email" class="inputs form-control bg-transparent mb-4 text-white" placeholder="Enter Your Email">
                <div id="emailNotValid" class="alert alert-danger w-100 mt-2 d-none">Email not valid *exemple@yyy.zzz</div>
            </div>
            <div class="col-md-6">
                <input id="tel" onkeyup="inputIsValid()" type="tel" class="inputs form-control bg-transparent mb-4 text-white" placeholder="Enter Your Phone">
                <div id="telNotValid" class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number</div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="inputIsValid()" type="number" class="inputs form-control bg-transparent text-white" placeholder="Enter Your Age">
                <div id="ageNotValid" class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>
            </div>
            <div class="col-md-6">
                <input id="password" onkeyup="inputIsValid()" type="password" class="inputs form-control bg-transparent text-white" placeholder="Enter Your Password">
                <div id="passwordNotValid" class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
            </div>
            <div class="col-md-6">
                <input id="repassword" onkeyup="inputIsValid()" type="password" class="inputs form-control bg-transparent text-white" placeholder="Repassword">
                <div id="repasswordNotValid" class="alert alert-danger w-100 mt-2 d-none">Enter valid repassword </div>
            </div>
        </div>
        <button id="submitBtn"  class="btn btn-danger px-3 mt-3">Submit</button>
    </div>
</div>`;
$("#name").on("focus", function(){
    inName=true
})
$("#email").on("focus", function(){
    inEmail=true
})
$("#tel").on("focus", function(){
    inTel=true
})
$("#age").on("focus", function(){
    inAge=true
})
$("#password").on("focus", function(){
    inPassword=true
})
$("#repassword").on("focus", function(){
    inRepassword=true
})
}
                                                                    // REGEX 
function validateName() {
    const pattern = /^[a-zA-Z]+$/;
    return pattern.test(document.getElementById("name").value);
}
function validateEmail() {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(document.getElementById("email").value);
}
function validateTel() {
    const pattern = /^\d{11}$/;
    return pattern.test(document.getElementById("tel").value);
}
function validateAge() {
    const pattern = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    return pattern.test(document.getElementById("age").value);
}
function validatePassword() {
    const pattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return pattern.test(document.getElementById("password").value);
}
function validateRePassword(){
    return document.getElementById("repassword").value == document.getElementById("password").value
}
                                                                // CHECK IF VALID 
function inputIsValid(){
    if(inName){
        if(validateName()){
            document.getElementById("nameNotValid").classList.replace("d-block" , "d-none")
            document.querySelector("#name").style.borderColor = "green";
            document.querySelector("#name").style.boxShadow = " 0 0 10px #71ce71";
        }else{
            document.getElementById("nameNotValid").classList.replace("d-none", "d-block" )
            document.querySelector("#name").style.borderColor = "red";
            document.querySelector("#name").style.boxShadow = "0 0 10px #fa2727";
        }
    }
    if(inEmail){
        if(validateEmail()){
            document.getElementById("emailNotValid").classList.replace("d-block", "d-none")
            document.querySelector("#email").style.borderColor = "green";
            document.querySelector("#email").style.boxShadow = " 0 0 10px #71ce71";
        }else{
            document.getElementById("emailNotValid").classList.replace("d-none" , "d-block")
            document.querySelector("#email").style.borderColor = "red";
            document.querySelector("#email").style.boxShadow = "0 0 10px #fa2727";
        }
    }
    if(inTel){
        if(validateTel()){
            document.getElementById("telNotValid").classList.replace("d-block", "d-none")
            document.querySelector("#tel").style.borderColor = "green";
            document.querySelector("#tel").style.boxShadow = " 0 0 10px #71ce71";
        }else{
            document.getElementById("telNotValid").classList.replace("d-none" , "d-block")
            document.querySelector("#tel").style.borderColor = "red";
            document.querySelector("#tel").style.boxShadow = "0 0 10px #fa2727";
        }
    }
    if(inAge){
        if(validateAge()){
            document.getElementById("ageNotValid").classList.replace("d-block", "d-none")
            document.querySelector("#age").style.borderColor = "green";
            document.querySelector("#age").style.boxShadow = " 0 0 10px #71ce71";
        }else{
            document.getElementById("ageNotValid").classList.replace("d-none" , "d-block")
            document.querySelector("#age").style.borderColor = "red";
            document.querySelector("#age").style.boxShadow = "0 0 10px #fa2727";
        }
    }
    if(inPassword){
        if(validatePassword()){
            document.getElementById("passwordNotValid").classList.replace("d-block", "d-none")
            document.querySelector("#password").style.borderColor = "green";
            document.querySelector("#password").style.boxShadow = " 0 0 10px #71ce71";
        }else{
            document.getElementById("passwordNotValid").classList.replace("d-none" , "d-block")
            document.querySelector("#password").style.borderColor = "red";
            document.querySelector("#password").style.boxShadow = "0 0 10px #fa2727";
        }
    }
    if(inRepassword){
        if(validateRePassword()){
            document.getElementById("repasswordNotValid").classList.replace("d-block", "d-none")
            document.querySelector("#repassword").style.borderColor = "green";
            document.querySelector("#repassword").style.boxShadow = " 0 0 10px #71ce71";
        }else{
            document.getElementById("repasswordNotValid").classList.replace("d-none" , "d-block")
            document.querySelector("#repassword").style.borderColor = "red";
            document.querySelector("#repassword").style.boxShadow = "0 0 10px #fa2727";
        }
    }
    let submitBtn = document.getElementById("submitBtn")
    if(validateName() && validateEmail() && validateTel() && validateAge() && validatePassword() && validateRePassword()){
        submitBtn.removeAttribute("disabled")
    }else{
        submitBtn.setAttribute("disabled", true)
    }
    let name = document.getElementById("name")
    let email = document.getElementById("email")
    let tell = document.getElementById("tel")
    let age = document.getElementById("age")
    let password = document.getElementById("password")
    let repassword = document.getElementById("repassword")
submitBtn.addEventListener("click" , function(){
    name.value = ""
    email.value = ""
    tell.value = ""
    age.value = ""
    password.value = ""
    repassword.value = ""
    submitBtn.setAttribute("disabled", true)
    document.querySelector("#name").style.borderColor=("white")
    document.querySelector("#name").style.boxShadow = "0 0 0 transparent";
    document.querySelector("#email").style.borderColor=("white")
    document.querySelector("#email").style.boxShadow = "0 0 0 transparent";
    document.querySelector("#tel").style.borderColor=("white")
    document.querySelector("#tel").style.boxShadow = "0 0 0 transparent";
    document.querySelector("#age").style.borderColor=("white")
    document.querySelector("#age").style.boxShadow = "0 0 0 transparent";
    document.querySelector("#password").style.borderColor=("white")
    document.querySelector("#password").style.boxShadow = "0 0 0 transparent";
    document.querySelector("#repassword").style.borderColor=("white")
    document.querySelector("#repassword").style.boxShadow = "0 0 0 transparent";
})
}