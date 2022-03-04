console.log("hello3");

let $price_total    = 0;
let $price_package  = 0;
let $price_account  = 0;
let $price_terminal = 0;
let $cnt_products   = 0;
let $cnt_orders     = 0;

// const $btn_group = document.querySelector(".btn-group");
// const $btn_all_ingridients = $btn_group.children[0];
// const $btn_clr_ingridients = $btn_group.children[1];
// const $form = document.querySelector('form');
// const $ingridients = $form.querySelectorAll(".form-check-input");


const $inp_products     = document.querySelector("#products");
const $inp_orders       = document.querySelector("#orders");
const $chk_accounting   = document.querySelector("#accounting");
const $chk_terminal     = document.querySelector("#terminal");
const $package          = document.querySelector("#package");
const $summary__total   = document.getElementById("total-price");
const $total_price      = document.getElementById("total-price").querySelector(".total__price");


function calcPrice(event){
    console.log("calcPrice()");
    $price_total = 0;
    $price_total += $cnt_products * 0.5;
    $price_total += $cnt_orders * 0.25;
    $price_total += $price_package;
    $price_total += $price_account;
    $price_total += $price_terminal;
}

function calc_show_total(event){
    console.log("calc_show_total()");
    $summary__total.style.display   = "block";
    calcPrice();
    
    $total_price.innerText = "$" + $price_total;
}

// $ingridients.forEach(function(item) {
//     item.addEventListener('change', calcPrice);
// });




function handle_chk_accounting(event){
    console.log("handle_chk_accounting()");
    console.log(event);

    $price_account = 0;
    if ($chk_accounting.checked) $price_account = 35;
    calc_show_total();    
}

function handle_chk_terminal(event){
    console.log("handle_chk_terminal()");
    console.log(event);
    $price_terminal = 0;
    console.log($chk_terminal.checked);
    if ($chk_terminal.checked) $price_terminal = 5;
    console.log($price_terminal);
    calc_show_total();
}

function handle_inp_products(event){
    console.log("VALUE:",event.target.value);
    $cnt_products = Number(event.target.value);
    calc_show_total();
}

function handle_inp_orders(event){
    console.log("VALUE:",event.target.value);
    $cnt_orders = Number(event.target.value);
    calc_show_total();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

function handle_package(event){
    console.log("handle_package()");
    // console.log(event);
    // console.log(event.target);

    const $select__dropdown = $package.querySelector(".select__dropdown");
    const $select__input    = $package.querySelector(".select__input");
    
    

    $package_type = event.target.getAttribute("data-value");
    // console.log("ATTRIBUTE:", $package_type);

    switch ($package_type) {
        case 'basic':
            console.log('set basic');
            $price_package = 20;
            $select__input.innerText = capitalizeFirstLetter($package_type);
            break;
        case 'professional':
            console.log('set professional');
            $price_package = 40;
            $select__input.innerText = capitalizeFirstLetter($package_type);
            break;
        case 'premium':
            console.log('set premium');
            $price_package = 60;
            $select__input.innerText = capitalizeFirstLetter($package_type);
            break;
      }



    // console.log($select__dropdown.style.display);
    if ($select__dropdown.style.display   == "block") {
        $select__dropdown.style.display   = "none";
    } else {
        $select__dropdown.style.display   = "block";
    }
    // console.log($select__dropdown.style.display);

    console.log("price_package:" + $price_package)

    calc_show_total();
    
}



// function hide_all(){
//     console.log("hide_all()");
//     const $total_price    = document.getElementById("total-price");
//     $total_price.style.display   = "none";
// }


// hide_all();
calc_show_total();

$chk_accounting.addEventListener('click', handle_chk_accounting);
$chk_terminal.addEventListener('click', handle_chk_terminal);
$inp_products.addEventListener('input', handle_inp_products);
$inp_orders.addEventListener('input', handle_inp_orders);
$package.addEventListener('click', handle_package);