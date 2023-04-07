const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const tabs = $$(".tab-item");
const panes = $$(".tab-pane");

const tabActive = $(".tab-item.active");
const line = $(".tabs .tabs-line");
let quantity = $("#quantity")
let result;
let modal = $(".modal-cart")
let addItemCart = $(".add-item-cart")

let arrItems = JSON.parse(window.localStorage.getItem("itemCart")) || []

let arrAvailable = [
    {
        id: 1,
        image: "http://127.0.0.1:5500/trongnam01.github.io-wibsite-ban-hang/matoa/src/image%2041.png",
        nameProduct: "product9999",
        content: "Way Kambas Mini Ebony",
        SaleOff: "2.000.000",
        PriceProduct: "1.264.000",
        qty: 1
    },
    {
        id: 2,
        image: "http://127.0.0.1:5500/trongnam01.github.io-wibsite-ban-hang/matoa/src/img1.png",
        nameProduct: "product999",
        content: "Way Kambas Mini Ebony",
        SaleOff: "1.000.000",
        PriceProduct: "1.264.000",
        qty: 1
    }
]

// thêm object vào arr arrItems  khi length === 0 
if (arrItems.length === 0) {
    arrItems.push(...arrAvailable)
}


tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function () {
        $(".tab-item.active").classList.remove("active");
        $(".tab-pane.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
        pane.classList.add("active");
    };
});



//  chừ 
if ($("#reduction") || $("#more")) {
    $("#reduction").onclick = function () {
        result = +(quantity.textContent) - 1
        if (result <= 0) {
            quantity.textContent = 0
        } else {
            quantity.textContent = result
        }
    }
    $("#more").onclick = function () {
        result = +(quantity.textContent) + 1
        quantity.textContent = result
    }
}

// click vào cart
$(".cart-border").onclick = function () {
    modal.classList.add("open")
    render()
    clearItem()
    qtyItem()
}

//  ẩn modal
$(".incon-delete-modal").onclick = function () {
    modal.classList.remove("open")
}
//                             ?????????????????????????????
modal.onclick = function () {
    modal.classList.remove("open")
}
//  bỏ click đến thẻ a
// $(".cart-add").onclick = function (e) {
//     // e.preventDefault()
// }

//  bỏ click vào modal-cantai
$(".modal-cantainer").onclick = function (e) {
    e.stopPropagation()
}
// đk có btn-add-cart  --> " Product"
if ($(".btn-add-cart")) {
    $(".btn-add-cart").onclick = function () {
        let textCart = $("#cart-quantity").innerText   // get số lượng cart hiện tại 

        let PriceProduct = $(".js-price-product span").innerText   // get giá hiện tại
        let SaleOff = $(".js-sale-off").innerText          //get giá sp cũ
        let slideText = $(".slide-text").innerText              // get title
        let revewImg = $(".revew-img").getAttribute("src")         // get img 
        let nameProduct = $(".js-revew-product").getAttribute("id-data") // get id-data
        let numqty = +(quantity.innerText)
        //khi quantity > 0 thì mới add
        if (result) {

            let objProduct = {
                id: arrItems.length + 1,
                image: revewImg,
                nameProduct: nameProduct,
                content: slideText,
                SaleOff: SaleOff,
                PriceProduct: PriceProduct,
                qty: numqty
            }

            checkItem(objProduct, numqty)
        }

        result = undefined
        quantity.textContent = 0

    }
}
// đk có thì set quantity không thì add 
function checkItem(objProduct, numqty) {
    if (arrItems.findIndex(arrItem => arrItem.nameProduct === objProduct.nameProduct) == -1) {
        objProduct.qty = numqty
        arrItems.push(objProduct)
        $("#cart-quantity").textContent = arrItems.length
        window.localStorage.setItem("itemCart", JSON.stringify(arrItems))
    } else {
        arrItems.find((arrItem, index) => {
            if (arrItem.nameProduct === objProduct.nameProduct) {
                arrItem.qty = arrItem.qty + numqty
            }
            // return arrItem.nameProduct === objProduct.nameProduct ? arrItem.qty = arrItem.qty + numqty : undefined
        })
        window.localStorage.setItem("itemCart", JSON.stringify(arrItems))
    }
    // render()
    totalCart()
}

let itemProducts = document.querySelectorAll(".item-products")
//  lặp qua và event đến từng item producs khi click vào các add các sản phẩm khác 
let cartBtn = $$(".cart-btn")
for (let i = 0; i < cartBtn.length; i++) {
    cartBtn[i].onclick = (e) => {
        let parse = itemProducts[i]

        let PriceProduct = parse.querySelector(".card-body div span").innerText // get giá hiện tại
        //  đk có giá sale thì get
        let SaleOff = '';
        if (parse.querySelector(".card-body .old-price")) {
            SaleOff = parse.querySelector(".card-body .old-price").innerText  // get giá ban đầu 
        }

        let slideText = parse.querySelector(".card-title").innerText   // title   
        let revewImg = parse.querySelector("img").getAttribute("src") //   get img
        let nameProduct = parse.getAttribute("id-data") // gét id-data
        let numqty = 1

        let objProduct = {
            id: arrItems.length + 1,
            image: revewImg,
            nameProduct: nameProduct,
            content: slideText,
            SaleOff: SaleOff,
            PriceProduct: PriceProduct,
            qty: numqty,
        }
        checkItem(objProduct, numqty)

    }
}











// hàm load lại các item trong modal
function render() {

    if (arrItems.length >= 1) {

        let itemCart = arrItems.map(function (arrItem) {
            return `
                <div class="item-product-cart" id-item-cart="${arrItem.nameProduct}">
                <div class="item-product-left">
                    <div >
                        <img class="item-product-img" src="${arrItem.image}" alt="">
                    </div>
                    <div class="item-product-text" style="margin-left: 20px;">
                        
                        <p>${arrItem.content}</p>
                        <p style="margin-bottom: 0;" class="old-price"> ${arrItem.SaleOff}</p>
                        <div style="font-size: 20px; font-weight: 600;">Rp <span>${arrItem.PriceProduct}</span></div>
                        <p style="font-size: 16px;">Custom Engrave</p>
                        <p style="font-size: 16px;font-weight: 300;">“Happy | Birthday | from”
                        </p>
                    </div>
                </div>
                <div class="item-product-right">
                    <div> 
                    <p>Select Packaging</p>
                    <div class="input-cart">
                    <input type="text" placeholder="Wooden Packaging (Rp 50.000)">
                    </div>
                    <i class="bi bi-chevron-down icon-input-cart"></i>
                    </div>
                    <div class="d-flex justify-content-end ">
                        <div>
                            <button class="reduction2" style="width: 30px;">-</button>
                            <span class="quantity2">${arrItem.qty}</span>
                            <button class="more2">+</button>
                        </div>
                        <div class="d-flex">
                            <div  style="font-size: 20px; font-weight: 600; margin: 0 10px;">
                                Rp <span class="js-price-product-cart">${arrItem.PriceProduct}</span> </div>
                            <div class="icon-trash-cart">
                                <i class="bi bi-trash"></i>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                `
        })
        addItemCart.innerHTML = itemCart.join('')
    }
    clearItem()

}

// xóa item product
function clearItem() {
    let idItemcart = $$(".item-product-cart")   // get tất cả các item-product
    let clearItemCart = $$(".icon-trash-cart") // get trash-cart

    if (clearItemCart.length > 0) {
        for (let i = 0; i < clearItemCart.length; i++) {
            clearItemCart[i].onclick = function (e) {
                let id = idItemcart[i].getAttribute("id-item-cart")
                idItemcart[i].remove() //Xóa trên HTML

                let idName = arrItems.findIndex((arrItem) => id === arrItem.nameProduct)  // lấy index 

                if (idName >= 0) {
                    arrItems.splice(idName, 1)
                    window.localStorage.setItem("itemCart", JSON.stringify(arrItems))
                }
                $("#cart-quantity").textContent = arrItems.length
                totalCart()
            }
        }
    }

}
// hàm hiện thị số lượng từng sản phẩm
function qtyItem() {
    let idItemcart = $$(".item-product-cart")   // get tất cả các item-product

    let quantity2 = $$(".quantity2")
    let reduction2 = $$(".reduction2")
    let more2 = $$(".more2")

    for (let i = 0; i < reduction2.length; i++) {

        // chừ quantity1
        reduction2[i].onclick = () => {
            const num = +(quantity2[i].textContent) - 1
            // đk khi dưới 1 sản phẩm thì remove
            if (num <= 0) {
                let id = idItemcart[i].getAttribute("id-item-cart")
                idItemcart[i].remove() //Xóa trên HTML

                let idName = arrItems.findIndex((arrItem) => id === arrItem.nameProduct)  // lấy index 

                console.log(idName);
                if (idName >= 0) {
                    arrItems.splice(idName, 1)
                    window.localStorage.setItem("itemCart", JSON.stringify(arrItems))
                }
                $("#cart-quantity").textContent = arrItems.length
                totalCart()

            } else {
                let id = idItemcart[i].getAttribute("id-item-cart")
                quantity2[i].textContent = num

                arrItems.find((arrItem) => {
                    if (arrItem.nameProduct === id) {
                        arrItem.qty = num
                    }
                })
                totalCart()
                window.localStorage.setItem("itemCart", JSON.stringify(arrItems))
            }

        }
        // cộng quantity2
        more2[i].onclick = () => {
            const num = +(quantity2[i].innerText) + 1
            let id = idItemcart[i].getAttribute("id-item-cart")
            quantity2[i].textContent = num

            arrItems.find((arrItem) => {
                if (arrItem.nameProduct === id) {
                    arrItem.qty = num
                }
            })
            totalCart()
            window.localStorage.setItem("itemCart", JSON.stringify(arrItems))
        }
    }
}

// hàm cộng tổng
function totalCart() {
    let resultTotalSale = 0

    let resultTotal = arrItems.reduce((total, arrItem) => {
        // đk khi không có giá sale 
        // tính tổng giá sale ở cart
        if (arrItem.SaleOff == '') {
            resultTotalSale += 0
        } else {
            resultTotalSale += Number.parseFloat(arrItem.SaleOff.replace(/Rp /g, '')) * arrItem.qty
        }
        // tổng giá hiện ở cart
        return total + (Number.parseFloat(arrItem.PriceProduct) * arrItem.qty)
    }, 0)


    resultTotalSale === 0 ? $(".js-old-price").textContent = '0VNĐ' : $(".js-old-price").textContent = 'Rp ' + resultTotalSale.toFixed(3) + '.000'

    resultTotal === 0 ? $(".total-cart span").textContent = '0VNĐ' : $(".total-cart span").textContent = resultTotal.toFixed(3) + '.000'

    // khi không có prosuct thì ẩn hiện img ko sản phẩm
    if (arrItems.length === 0) {
        $(".img-cart-no-product").style.display = "flex"
        $(".into-moneys").style.display = 'none'
        $(".footer-modal").style.display = "none"
    } else {
        $(".img-cart-no-product").style.display = "none"
        $(".into-moneys").style.display = "block"
        $(".footer-modal").style.display = "flex"
    }


}

/// ============================   ===========================

let orderApi = "https://6290441a27f4ba1c65b64525.mockapi.io/api/product"

let paneCheckout = $$(".tabs-pane-checkout")
let pane = $$(".pane2")
let dataLength
let comeBack = false

if ($(".play-order")) {
    $(".play-order").onclick = function () {

        comeBack = true

        paneCheckout[0].style.display = "none"
        paneCheckout[1].style.display = "block"

        $(".pane2.active").classList.remove("active")

        pane[1].classList.add("active")

        getList(rendenList)
    }
}

if ($(".proceed-payment button")) {
    $(".proceed-payment button").onclick = () => {
        paneCheckout[1].style.display = "none"
        paneCheckout[2].style.display = "block"

        $(".pane2.active").classList.remove("active")

        pane[2].classList.add("active")
    }
}

$(".continue-shopping").onclick = () => {
    $('.js-contents').classList.remove("open")
    $(".js-checkout").classList.add("open")

    handleDeleteobj()
}

$(".track-page").onclick = function () {
    window.location.href = './index.html'
}

function getList(callback) {
    fetch(orderApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function rendenList(data) {
    let indexData = data.length - 1

    for (let i = 0; i < 3; i++) {
        $$(".subtotal span")[i].textContent = data[indexData].payment.total
        $$(".shipping-cost span")[i].textContent = data[indexData].payment.shippingCost
        $$(".packaging span")[i].textContent = data[indexData].payment.packaging
        $$(".grand-total span")[i].textContent = data[indexData].payment.totalPrice
    }

    $(".fullname span").textContent = data[indexData].address.fullname
    $(".email-address span").textContent = data[indexData].address.email
    $(".phone-number span").textContent = data[indexData].address.phone
    $(".shipping-address span").textContent = data[indexData].address.address
    $(".shipping-address2 p").textContent = data[indexData].address.address
    $(".shipping-address2 ~ p").textContent = data[indexData].address.address
    $('.phone span').textContent = data[indexData].address.phone
    $(".email p").textContent = data[indexData].address.email
    $(".payment-time").textContent = data[indexData].payment.str
    $(".dateDay").textContent = data[indexData].payment.str2
    $(".dateDay ~ p").textContent = data[indexData].payment.str + "s"


    let qtyItems = data[indexData].detai_oder.itemsCheckout
    let htmlqtyCheckout = qtyItems.map(function (item) {
        return `
        <div class="js-items-checkout">
            <p>${item.name}</p>
            <span>${item.qty} x IDR ${item.price}</span>
       </div>
        `
    })

    for (let j = 0; j < $$(".total-items-checkout").length; j++) {

        $$(".total-items-checkout")[j].innerHTML = htmlqtyCheckout.join('')
    }

}
function createFormCheckout(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(orderApi, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function handleDeleteobj() {

    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(orderApi + "/" + dataLength, options)
        .then(function (response) {
            return response.json()
        })

    dataLength = undefined
}

(function handlePosh() {
    $(".checkout-modal").onclick = () => {
        if (dataLength) {
            handleDeleteobj()
            dataLength = undefined
        }

        $('.js-contents').classList.add("open")
        if ($(".js-checkout.open")) {

            $(".js-checkout").classList.remove("open")
        }
        modal.classList.remove("open")

        let date = new Date();
        let seconds = date.getSeconds();
        let hours = date.getHours();
        let minnutes = date.getMinutes();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let str = `${hours}:${minnutes}:${seconds}`;
        let str2 = `${year}-${month}-${day} `;

        let subtotal = $(".total-cart span").innerText
        let shippingCost = "500.000"
        let country = $(".country").innerText
        let packaging = "50.000"
        let zipCode = Math.floor(Math.random() * 90000) + 10000;

        let numbertotal = Number.parseFloat(subtotal.replace(/\./, '')) + Number.parseFloat(packaging) + Number.parseFloat(shippingCost)
        let totalPrice = numbertotal.toLocaleString() + ".000"

        let address = {
            fullname: "Bơ Bé Bỏng",
            email: "bobebong00@gmail.com",
            address: "Xuân Thủy, Cầu Giấy, Hà Nội",
            phone: "113"
        }

        let itemsCheckout = []
        let detai_oder = {
            itemsCheckout
        }
        for (let key of arrItems) {
            let obj = {
                id: key.id,
                name: key.content,
                qty: key.qty,
                price: key.PriceProduct
            }
            itemsCheckout.push(obj)
        }

        let payment = {
            method: "credit card",
            total: subtotal,
            country,
            zipCode,
            packaging,
            shippingCost,
            totalPrice,
            str,
            str2
        }


        let formDate = {
            address,
            detai_oder,
            payment,

        }

        createFormCheckout(formDate, (dataform) => {
            getList(rendenList)
            dataLength = dataform.id
        })


        if (comeBack) {
            paneCheckout[0].style.display = "block"
            paneCheckout[1].style.display = "none"
            paneCheckout[2].style.display = "none"
            $(".pane2.active").classList.remove("active")

            pane[0].classList.add("active")
        }
    }
})()


























window.onload = function () {

    if (line) {
        line.style.left = tabs[0].offsetLeft + "px";
        line.style.width = tabs[0].offsetWidth + "px";
    }




    $("#cart-quantity").textContent = arrItems.length
    totalCart()
}