console.log("hello3");

const $pricelist = {
    'product'     : 0.5,
    'order'       : 0.25, 
    'accounting'  : 35, 
    'terminal'    : 5,
    package: {
        basic: 20,
        professional: 40,
        premium: 60
    }  
};

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
const $calc__summary    = document.querySelector(".calc__summary ul").children;

const $calc__summary_products   = $calc__summary[0];
const $calc__summary_orders     = $calc__summary[1];
const $calc__summary_package    = $calc__summary[2];
const $calc__summary_accounting = $calc__summary[3];
const $calc__summary_terminal   = $calc__summary[4];

// 'a[data-a="1"]'



function calcPrice(event){
    console.log("calcPrice()");
    $price_total = 0;
    $price_total += $cnt_products * 0.50;
    $price_total += $cnt_orders   * 0.25;
    $price_total += $price_package;
    $price_total += $price_account;
    $price_total += $price_terminal;
}

function calc_show_total(event){
    console.log("calc_show_total()");
    $summary__total.style.display   = "flex";
    calcPrice();
    
    $total_price.innerText = "$" + $price_total;
}

function round(num){
    let num2 = Math.round((num + Number.EPSILON) * 100) / 100;
    return num2.toFixed(2);
}


function display_list_item_values(p_list_item, p_calc, p_price) {
    console.log(p_calc);
    console.log(p_price);
    $calc  = p_list_item.querySelector(".item__calc");
    $price = p_list_item.querySelector(".item__price");
    p_list_item.style.display = "flex";
    if ($calc) $calc.innerText = p_calc;
    $price.innerText = "$" + p_price;
}


function handle_inp_products(event){
    console.log("VALUE:",event.target.value);
    $cnt_products = Number(event.target.value);
    $calc__summary_products.style.display = "none";
    if ($cnt_products>0) display_list_item_values($calc__summary_products, $cnt_products + " * $ "+ $pricelist.product , round($cnt_products * $pricelist.product));
    calc_show_total();
}

function handle_inp_orders(event){
    console.log("VALUE:",event.target.value);
    $cnt_orders = Number(event.target.value);
    $calc__summary_orders.style.display = "none";
    if ($cnt_orders>0) display_list_item_values($calc__summary_orders, $cnt_orders + " * $ " + $pricelist.order, round($cnt_orders * $pricelist.order));
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

    let $package_type = event.target.getAttribute("data-value");
    // console.log("ATTRIBUTE:", $package_type);

    // console.log($select__dropdown.style.display);
    if ($select__dropdown.style.display   == "block") {
        $select__dropdown.style.display   = "none";
    } else {
        $select__dropdown.style.display   = "block";
    }
    // console.log($select__dropdown.style.display);


    if ($package_type) {
        console.log($package_type);
        $price_package = $pricelist.package[$package_type];

        $package_type = capitalizeFirstLetter($package_type);
        $select__input.innerText = $package_type;

        display_list_item_values($calc__summary_package, $package_type, $price_package);
        $select__dropdown.style.display   = "none";
    }  else {
        console.log("Package not selected");
    }



    console.log("price_package:" + $price_package);

    calc_show_total();
    
}

function handle_chk_accounting(event){
    console.log("handle_chk_accounting()");
    console.log(event);

    $price_account = (($chk_accounting.checked) ? $pricelist.accounting : 0);
    $calc__summary_accounting.style.display = "none";
    display_list_item_values($calc__summary_accounting, "", $price_account);
    calc_show_total();    
}

function handle_chk_terminal(event){
    console.log("handle_chk_terminal()");
    console.log(event);
    // console.log($chk_terminal.checked);

    $price_terminal = 0;
    if ($chk_terminal.checked) $price_terminal = $pricelist.terminal;
    $calc__summary_terminal.style.display = "none";
    display_list_item_values($calc__summary_terminal, "", $price_terminal );

    calc_show_total();
}


// function hide_all(){
//     console.log("hide_all()");
//     const $total_price    = document.getElementById("total-price");
//     $total_price.style.display   = "none";
// }


// hide_all();
calc_show_total();

$inp_products.addEventListener('input', handle_inp_products);
$inp_orders.addEventListener('input', handle_inp_orders);
$package.addEventListener('click', handle_package);
$chk_accounting.addEventListener('click', handle_chk_accounting);
$chk_terminal.addEventListener('click', handle_chk_terminal);
