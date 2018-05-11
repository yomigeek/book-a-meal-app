
var consumerForm = document.getElementById("consumerForm");
var merchantForm = document.getElementById("merchantForm");
var previousButton = document.getElementById("previousButton");
var categoryPanel = document.getElementById("categoryPanel");

merchantForm.style.display = "none";
consumerForm.style.display = "none";
previousButton.style.display = "none";


function merchantFormSelect() {

    merchantForm.style.display = "block";
    categoryPanel.style.display = "none";
    previousButton.style.display = "block";


}
function consumerFormSelect() {

    consumerForm.style.display = "block";
    categoryPanel.style.display = "none";
    previousButton.style.display = "block";


}

function goToMenu() {

    merchantForm.style.display = "none";
    consumerForm.style.display = "none";
    categoryPanel.style.display = "block";
    previousButton.style.display = "none";


}