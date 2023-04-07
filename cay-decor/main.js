

// 

let userlogin = false
let titleProducts = []
let arrPrice = []
let resultAll
let arrItems = JSON.parse(window.localStorage.getItem("itemCard")) || []
let users = JSON.parse(window.localStorage.getItem("information")) || {}



let arrTitlCard = Array.from(document.querySelectorAll(".card-title"))

let formProducts = Array.from(document.querySelectorAll(".card-title"))

let indexProduct = document.querySelectorAll(".products")               //  trang index
let cart = document.querySelector(".header-cart")                     // gio hang
let deleteCart = document.querySelector(".icon-delete-modal")         // xóa modal
let detaiContent = document.querySelector(".products-detai-content")   // xem thêm 
let seeMore = document.querySelector(".see-more")                       // xem thêm 
let methodBank = document.querySelector(".method-bank")                    // hình thức chuỷen
let payBank = document.querySelector("#bank")                               // stk 
let whenReceiving = document.querySelector("#when-receiving")               //        
let footerModal = document.querySelector(".footer-modal button")           //  
let modaproduct = document.querySelector(".modal-cantainer")
let modalogin = document.querySelector(".modal-login")
let login = document.querySelector("#login")
let informationUser = document.querySelector(".modal-information-user")
let btnNext = document.querySelector(".next")
let inputSearch = document.querySelector(".slider-input-search")

let formSearch = document.querySelector(".slider-content-ul")           // thẻ ul search
let ulSearch = document.querySelector(".slider-content-ul ul")           // thẻ ul search
let contaiProducts = document.querySelector("#products")           // id product
let prodCard                                                     // id product
let tabsproducts = document.querySelector("#products .product-item-tabs ")           // tabs product
let modalCart = document.querySelector(".modal-cart")               // gio hang
let btnOder = document.querySelector(".btn-pay-order")              // btn order payment
let btnHotline = document.querySelector(".btn-hotline")              // btn hot
let btnOderCard = document.querySelector(".btn-order")              // btn order
let indexProdDetai = document.querySelector(".js-products-detai")              // trang produc detai
let indexProducts = document.querySelector(".js-products")              // trang produc
let btntabs1 = document.querySelector("#btn-products1")  //          tabs  trang product
let btntabs2 = document.querySelector("#btn-products2")  //          tabs  trang product
let btntabs3 = document.querySelector("#btn-products3")  //          tabs  trang product
let allTabs = document.querySelectorAll(".btn-product-top")  //          alll tabs
let idProDetai = document.querySelector("#products-detai")  //          alll tabs
let reductionDetai = document.querySelector(".reduction")  //          -
let quantityDetai = document.querySelector(".quantity")  //          kết quả
let moreDetai = document.querySelector(".more")  //          +
let imgUser = document.querySelector(".header-img-user.active")
let userUse = document.querySelector(".user-use")
let loginOut = document.querySelector(".login-out")

let arrdistrict = {
    Hà_nội: ["Thanh Xuân", "Hà Đông", "Cầu Giấy", "Mỹ Đình", "Thường Tín", "Phú Xuyên"],
    Hồ_Chí_Minh: ["Quận Bình Thạnh", "Quận Thủ Đức", "Quận Phú Nhuận", "Quận Tân Bình", "Huyện Hóc Môn", "Huyện Củ Chi"],
    Quảng_Ninh: ["Thành Phố Đồng Hới", "Huyện Bố Trạch", "Thị xã Ba Đồn", "Huyện Lệ Thủy", "Thị xã Đông Triều"],
    Thanh_Hóa: ["Thành Phố Thanh Hóa", "Huyện Yên Định", "Huyện Thọ Xuân", "Huyện Thiệu Hóa", "Huyện Hậu Lộc"],
    Hà_Nam: ["Thành phố Phủ Lý", "Thị xã Duy Tiên", "	Huyện Kim Bảng", "Huyện Bình Lục", "Huyện Thanh Liêm"],
    Thái_Bình: ["Huyện Đông Hưng", "Huyện Hưng Hà", "Huyện Kiến Xương", "Huyện Tiền Hải", "Huyện Quỳnh Phụ"]

}


if (modalCart)
    modalCart.onclick = (e) => {
        document.querySelector(".modal-cart").style.display = "none"
        console.log(1);

        document.body.style.overflow = 'auto'
    }


// mở modal
if (cart) {
    cart.onclick = function () {
        document.querySelector(".modal-cart").style.display = "flex"
        informationUser.style.display = "none"
        modalogin.style.display = "none"
        modaproduct.style.display = "block"
         document.body.style.overflow = 'hidden'

        render()
        clearItem()
        qtyItem()
    }
}
let isPay = true
let loginHeder = document.querySelector(".login-user2")
if (loginHeder) {

    loginHeder.onclick = () => {
        isPay = false
        document.body.style.overflow = 'hidden'
        if (users.information?.name && users.login?.email) {

        } else {
            document.querySelector(".modal-cart").style.display = "flex"
            informationUser.style.display = "none"
            modalogin.style.display = "block"
            modaproduct.style.display = "none"
        }
    }
}


// đóng modal
if (deleteCart) {
    deleteCart.onclick = () => {
        document.querySelector(".modal-cart").style.display = "none"
        document.body.style.overflow = 'auto'
    }
}

// mở text producst detai
if (seeMore) {
    seeMore.onclick = () => {
        if (detaiContent.getAttribute("class") === "products-detai-content active") {
            detaiContent.classList.remove("active")
            seeMore.innerHTML = ' Xem thêm <i class="fa-solid fa-caret-down"></i> '
        } else {
            detaiContent.classList.add("active")
            seeMore.innerHTML = ' Thu gọn <i class="fa-solid fa-caret-up icon-up"></i> '
        }
        seeMore.classList.toggle("active")
    }
}

// phương thức mua hàng
if (payBank) {
    payBank.onclick = () => {
        methodBank.classList.add("active")
    }
}
if (whenReceiving) {
    whenReceiving.onclick = () => {
        methodBank.classList.remove("active")
    }
}

// if đk chuyến đến trang thanh toán

if (footerModal) {

    footerModal.onclick = () => {

        if (users.information?.name) {
            window.location = "payment.html";
        } else {
            modaproduct.style.display = "none"
            informationUser.style.display = "block"
        }
        isPay = true
    }
}


//  bỏ sự lan tỏa từ thẻ cha
if (modaproduct)
    modaproduct.onclick = (e) => {
        e.stopPropagation()
    }

if (modalogin)
    modalogin.onclick = (e) => {
        e.stopPropagation()
    }
if (informationUser)
    informationUser.onclick = (e) => {
        e.stopPropagation()
    }


// push titleproduct
formProducts.forEach((data) => {
    titleProducts.push(data.innerText)
})

// check li search
function checkLiSearch(liSearch) {
    // thẻ ul search
    for (let i = 5; i < liSearch.length; i++) {
        liSearch[i].style.display = "none"
    }

    for (let i = 0; i < liSearch.length; i++) {
        liSearch[i].setAttribute("onclick", `selectLi(this)`)
    }
}

let copyCard
// input search
if (inputSearch) {
    inputSearch.onkeyup = (e) => {

        let valueinput = e.target.value
        let keywCard = []
        let arrelement = []
        if (valueinput) {

            arrelement = titleProducts.filter(data => {
                return data.toLowerCase().replace(/ /g, '').startsWith(valueinput.toLowerCase().replace(/ /g, ''))
            })
            arrelement = arrelement.map((data) => {
                return `<li> ${data} </li> `
            })

            // if (document.querySelector(".js-index")) {
            //     inputSearch.style.borderRadius = "30px 30px 0 0"
            //     document.querySelector("#all-products").style.display = "none"
            //     document.querySelector(".js-search").style.display = "block"

            //     for (let i = 0; i < arrTitlCard.length; i++) {
            //         let keywtitlSearch = arrTitlCard[i].innerText

            //         if (keywtitlSearch.toLowerCase().replace(/ /g, '').startsWith(valueinput.toLowerCase().replace(/ /g, ''))) {
            //             let parenkeyw = arrTitlCard[i].parentElement.parentElement.parentElement
            //             let sale = ''

            //             if (parenkeyw.querySelector("span.sale-off")) {
            //                 sale = parenkeyw.querySelector(".sale-off").innerText
            //             }

            //             let objProdSearch = {
            //                 title: parenkeyw.querySelector(".card h5.card-title").innerText,
            //                 img: parenkeyw.querySelector("img").getAttribute("src"),
            //                 price: parenkeyw.querySelector(".price").innerText,
            //                 sale: sale,
            //                 id: parenkeyw.querySelector(".card").getAttribute("id-data")
            //             }
            //             keywCard.push(objProdSearch)
            //             document.querySelector(".js-search > p").innerHTML = ` <p>Kết quả được từ tìm thấy với từ khóa"<span class="keyword-search">${valueinput}</span>"</p>`

            //         }
            //     }
            //     showCard(keywCard)
            //     if (keywCard.length === 0) {
            //         document.querySelector(".js-search > p").innerHTML = ` <p> Không tìm thấy kết quả nào tìm thấy với từ khóa "<span class="keyword-search">${valueinput}</span>"</p>`
            //     }

            //     showLiSearch(arrelement)
            //     showCard(keywCard)
            // }


            // trang products
            if (contaiProducts) {
                // prodCard = document.querySelectorAll(" .card")           // id product
                tabsproducts.style.display = "none"
                for (let i = 0; i < prodCard.length; i++) {
                    let titleProd = prodCard[i].querySelector(".card h5.card-title").innerText
                    console.log(titleProd);
                    if (titleProd.toLowerCase().replace(/ /g, '').indexOf(valueinput.toLowerCase().replace(/ /g, '')) > -1) {
                        prodCard[i].parentElement.style.display = ""
                    } else {
                        prodCard[i].parentElement.style.display = "none"
                    }
                }


            }
            // trang index
            if (formSearch)
                formSearch.classList.add("active")



        } else {

            //  khi ko onkeyup

            if (formSearch)
                formSearch.classList.remove("active")

            inputSearch.style.borderRadius = "30px"

            if (prodCard) {

                if (contaiProducts) {
                    tabsproducts.style.display = "flex"
                }
                for (let i = 0; i < prodCard.length; i++) {
                    prodCard[i].parentElement.style.display = "block"

                    if (i >= 9) {
                        prodCard[i].parentElement.style.display = "none"
                    }
                }
            }

            if (document.querySelector(".js-index")) {
                document.querySelector("#all-products").style.display = "block"
                document.querySelector(".js-search").style.display = "none"
            }

            if (btntabs2 && btntabs2.getAttribute("class") === "btn-product-top active") {
                showproBtn2()
            }
            if (btntabs3 && btntabs3.getAttribute("class") === "btn-product-top active") {
                showproBtn3()
            }

        }
        let liSearch = document.querySelectorAll(".slider-content-ul li")
        checkLiSearch(liSearch)

        copyCard = [...keywCard]
    }
}

function selectLi(e) {
    inputSearch.value = e.innerText
    formSearch.classList.remove("active")
    inputSearch.focus()
    let copyData = []

    for (let i = 0; i < copyCard.length; i++) {
        let textCatdCopy = copyCard[i].title
        if (textCatdCopy.toLowerCase().replace(/ /g, '').startsWith(e.innerText.toLowerCase().replace(/ /g, ''))) {
            copyData.push(copyCard[i])
        }
    }
    document.querySelector(".js-search > p").innerHTML = ` <p>Kết quả được từ tìm thấy với từ khóa"<span class="keyword-search">${e.innerText}</span>"</p>`
    showCard(copyData)
}

// show li search
function showLiSearch(data) {
    let htmlUl;
    if (!data.length) {
        valueinput = inputSearch.value

        htmlUl = `<li>${valueinput} </li>`
    } else {
        htmlUl = data.join('')
    }
    if (ulSearch)
        ulSearch.innerHTML = htmlUl
}

function showCard(data) {
    let contaiShowCard
    if (document.querySelector(".js-search")) {
        contaiShowCard = document.querySelector(".js-search > .row")
    }

    let htmlCard = data.map((el) => {
        return `
       

         <div class="col-12 col-sm-6 col-lg-4">
         <div class="card" id-data="${el.id}">
             <div class="card-img">
                 <img src="${el.img}"
                     class="card-img-top" alt="...">
             </div>
             <div class="card-body">
                 <h5 class="card-title">${el.title}</h5>
                 <span class="price">${el.price}</span>
             </div>
             <span class="sale-off">-${el.sale}</span>
         </div>
     </div>
     `
    }).join('')

    if (document.querySelector(".js-search"))
        contaiShowCard.innerHTML = htmlCard

    if (contaiProducts) {
        contaiShowCard = contaiProducts.querySelector(".row")
        contaiShowCard.innerHTML = htmlCard
    }

    if (indexProdDetai) {
        contaiShowCard = idProDetai.querySelector(".row")
        contaiShowCard.innerHTML = htmlCard
    }

    let saleProduct = document.querySelectorAll(".sale-off")
    saleProduct.forEach(e => {

        if (e.innerText === "") {
            e.style.display = "none"
        }

    });

}


function dataCard(keywCard, valueinput) {

    if (document.querySelector(".js-index")) {
        document.querySelector("#all-products").style.display = "none"
        document.querySelector(".js-search").style.display = "block"

        for (let i = 0; i < arrTitlCard.length; i++) {
            let keywtitlSearch = arrTitlCard[i].innerText

            if (keywtitlSearch.toLowerCase().replace(/ /g, '').startsWith(valueinput)) {
                let parenkeyw = arrTitlCard[i].parentElement.parentElement.parentElement
                let sale = ''

                if (parenkeyw.querySelector("span.sale-off")) {
                    sale = parenkeyw.querySelector(".sale-off").innerText
                }

                let objProdSearch = {
                    title: parenkeyw.querySelector(".card h5.card-title").innerText,
                    img: parenkeyw.querySelector("img").getAttribute("src"),
                    price: parenkeyw.querySelector(".price").innerText,
                    sale: sale,
                    id: parenkeyw.querySelector(".card").getAttribute("id-data")
                }
                keywCard.push(objProdSearch)
                document.querySelector(".js-search > p").innerHTML = ` <p>Kết quả được từ tìm thấy với từ khóa"<span class="keyword-search">${valueinput}</span>"</p>`

            } else {
                document.querySelector(".js-search > p").innerHTML = ` <p> Không tìm thấy kết quả nào tìm thấy với từ khóa "<span class="keyword-search">${valueinput}</span>"</p>`
            }
        }

        showCard(keywCard)
    }
}
if (btnOder) {
    btnOder.onclick = () => {
        toast({
            title: 'Thành Công',
            message: 'Bạn đã mua hàng thành công',
            typeo: 'success',
            duration: 3000
        })

        // window.localStorage.clear()
        localStorage.removeItem("itemCard");

        btnOder.disabled = true;

        setTimeout(() => {
            window.location = "index.html";
        }, 2500)
    }
}


function toast({
    title = '',
    message = '',
    typeo = '',
    duration = 3000
}) {
    const main = document.getElementById('notification')

    if (main) {
        // tạo thẻ div 
        const toast = document.createElement('div')
        const icons = {
            info: "fa-solid fa-circle-check",
            warning: "fa-solid fa-circle-check",
            success: "fa-solid fa-circle-check",
            error: "fa-solid fa-circle-exclamation"
        }
        //  xóa tự động
        const removeTimeo = setTimeout(function () {
            main.removeChild(toast)
        }, duration + 1000)

        //   xóa bằng click
        toast.onclick = function (e) {
            if (e.target.closest('.toast__close')) {
                main.removeChild(toast)
                clearTimeout(removeTimeo);
            }
        }

        const icon = icons[typeo]
        const delay = (duration / 1000).toFixed(2)

        toast.classList.add("toasts", `toast--${typeo}`)
        toast.style.animation = `sideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards`
        toast.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message} </p>
        </div>
        <div class="toast__close">
            <i class="fa-solid fa-xmark"></i>
        </div>
        `;

        // đưa toast vào thẻ main
        main.appendChild(toast)

    }
}







if (indexProducts) {

    function renderProduct(data) {
        prodCard = document.querySelectorAll(".card")

        let saveCard = [...data]

        allTabs.forEach((tab) => {

            tab.onclick = function () {
                document.querySelector(".btn-product-top.active").classList.remove("active")
                this.classList.add("active")

                let getId = document.querySelector(".btn-product-top.active").getAttribute("id")
                switch (getId) {
                    case "btn-products1":
                        showproBtn1()
                        break;
                    case "btn-products2":
                        showproBtn2()
                        break;
                    case "btn-products3":
                        showproBtn3()
                        break;
                }
                window.scrollTo(0, 0);
            }
        })

        function showproBtn1() {
            showCard(saveCard)
            prodCard = document.querySelectorAll(".card")

            for (let i = 0; i < prodCard.length; i++) {
                if (i >= 9) {
                    prodCard[i].parentElement.style.display = "none"
                }
            }
            clickCard(prodCard)
        }
        showproBtn1()


        function showproBtn2() {
            showCard(saveCard)

            prodCard = document.querySelectorAll(".card")
            for (let i = 0; i < prodCard.length; i++) {
                if (i < 9 || i >= 18) {
                    prodCard[i].parentElement.style.display = "none"
                }
            }
            clickCard(prodCard)
        }
        function showproBtn3() {
            showCard(saveCard)

            prodCard = document.querySelectorAll(".card")
            for (let i = 0; i < prodCard.length; i++) {
                if (i < 18 || i >= 27) {
                    prodCard[i].parentElement.style.display = "none"
                }
            }
            clickCard(prodCard)
        }
    }

}

arrProDetai = JSON.parse(window.localStorage.getItem("itemProDetai")) || []

if (indexProdDetai) {

    reductionDetai.onclick = () => {
        let qtyNum = +(quantityDetai.textContent)
        quantityDetai.textContent = qtyNum - 1
        if (qtyNum === 1) {
            quantityDetai.textContent = 1

            toast({
                title: 'Lỗi',
                message: 'Số lượng tối thiểu là 1 sản phẩm',
                typeo: 'error',
                duration: 3000
            })
        }
    }
    moreDetai.onclick = () => {
        let qtyNum = +(quantityDetai.textContent)
        quantityDetai.textContent = qtyNum + 1
    }
}


function clickCard(prodCard) {

    prodCard.forEach((item) => {
        item.onclick = () => {

            let img = item.querySelector("img").getAttribute("src")
            let title = item.querySelector("h5.card-title").textContent
            let price = item.querySelector(".price").textContent
            let idData = item.getAttribute("id-data")

            let objProDetai = {
                img,
                title,
                price,
                idData
            }

            arrProDetai.push(objProDetai)

            window.localStorage.setItem("itemProDetai", JSON.stringify(arrProDetai))

            window.location = "product-detai.html";
        }
    })
}


if (indexProdDetai) {

    let imgProDetai = document.querySelector(".imgProDetai")
    let contentProDetai = document.querySelector(".title-pdoduct-detai")
    let priceProDetai = document.querySelector(".products-price")

    let lengPro = arrProDetai.length - 1
    let imgarr = arrProDetai[lengPro].img
    let titleProDetai = arrProDetai[lengPro].title
    let priceDetai = arrProDetai[lengPro].price
    let idDataPro = arrProDetai[lengPro].idData


    imgProDetai.setAttribute("src", imgarr)
    contentProDetai.innerText = titleProDetai
    priceProDetai.innerText = priceDetai
    contentProDetai.setAttribute("id-data", idDataPro)



    btnOderCard.onclick = () => {
        let SaleOff = document.querySelector(".old-price").innerText          //get giá sp cũ
        let idProduct = document.querySelector(".title-pdoduct-detai").getAttribute("id-data") // get id-data
        let numqty = +(quantityDetai.textContent)


        let objProduct = {
            id: arrItems.length + 1,
            imgarr,
            idProduct,
            titleProDetai,
            SaleOff,
            priceDetai,
            qty: numqty
        }


        checkItem(objProduct, numqty)
        quantityDetai.textContent = 1

        toast({
            title: 'Thành Công',
            message: 'Sản phẩm đã được thêm vào giỏ hàng',
            typeo: 'success',
            duration: 3000
        })

        quantityDetai
    }

    function checkItem(objProduct, numqty) {
        if (arrItems.findIndex(arrItem => arrItem.idProduct === objProduct.idProduct) == -1) {
            arrItems.push(objProduct)
            document.querySelector(".header-cart span").textContent = arrItems.length
            window.localStorage.setItem("itemCard", JSON.stringify(arrItems))
        } else {
            arrItems.find((arrItem, index) => {
                if (arrItem.idProduct === objProduct.idProduct) {
                    arrItem.qty = arrItem.qty + numqty
                }
            })
            window.localStorage.setItem("itemCard", JSON.stringify(arrItems))
        }
        // totalCart()

    }

    let imgSub = document.querySelectorAll(".sub-photo img")
    imgSub[0].setAttribute("src", imgarr)

    imgSub.forEach((img) => {
        img.onclick = () => {
            document.querySelector(".sub-photo img.opacity").classList.remove("opacity")
            imgProDetai.setAttribute("src", img.getAttribute("src"))
            img.classList.add("opacity")

        }
    })



}


function render() {

    if (arrItems.length > 0) {
        let cardProduct = arrItems.map((arrItem) => {
            return `
            <div class="item-product-cart" id-item-cart="${arrItem.idProduct}">
            <div class="item-product-left">
                <img src="${arrItem.imgarr}" alt="">
                <div class="item-product-text">
                    <p>${arrItem.titleProDetai}</p>
                    <span>Cây + Chậu nhựa đen (LC3018-1)</span>
                </div>
            </div>
            <div class="item-product-right">
                <div class="item-moneys">
                    <span class="item-save-moneys">1.335.000₫</span>
                    <span class="item-into-money">${arrItem.priceDetai}</span>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="d-flex">
                        <button class="reduction2">-</button>
                        <span class="quantity2">${arrItem.qty}</span>
                        <button class="more2">+</button>
                    </div>
                    <span class="item-into-money2">${arrItem.priceDetai}</span>
                    <div class="icon-trash-cart">
                        <i class="bi bi-trash"></i>
                    </div>
                </div>
            </div>
        </div>
        `

        })

        document.querySelector(".add-item-cart").innerHTML = cardProduct.join('')
    }
    totalCart()

}



function clearItem() {
    let idItemcart = document.querySelectorAll(".item-product-cart")   // get tất cả các item-product
    let clearItemCart = document.querySelectorAll(".icon-trash-cart") // get dele-cart

    if (clearItemCart.length > 0) {
        for (let i = 0; i < clearItemCart.length; i++) {
            clearItemCart[i].onclick = function (e) {
                let id = idItemcart[i].getAttribute("id-item-cart")
                idItemcart[i].remove() //Xóa trên HTML

                let idName = arrItems.findIndex((arrItem) => id === arrItem.idProduct)  // lấy index 

                if (idName >= 0) {
                    arrItems.splice(idName, 1)
                    window.localStorage.setItem("itemCard", JSON.stringify(arrItems))
                }
                document.querySelector(".header-cart span").textContent = arrItems.length
                totalCart()
            }
        }
    }

}

function qtyItem() {
    let idItemcart = document.querySelectorAll(".item-product-cart")   // get tất cả các item-product

    let quantity2 = document.querySelectorAll(".quantity2")
    let reduction2 = document.querySelectorAll(".reduction2")
    let more2 = document.querySelectorAll(".more2")

    for (let i = 0; i < reduction2.length; i++) {

        // chừ quantity1
        reduction2[i].onclick = () => {
            const num = +(quantity2[i].textContent) - 1
            // đk khi dưới 1 sản phẩm thì remove
            if (num <= 0) {
                let id = idItemcart[i].getAttribute("id-item-cart")
                idItemcart[i].remove() //Xóa trên HTML

                let idName = arrItems.findIndex((arrItem) => id === arrItem.idProduct)  // lấy index 

                if (idName >= 0) {
                    arrItems.splice(idName, 1)
                    window.localStorage.setItem("itemCard", JSON.stringify(arrItems))
                }
                document.querySelector(".header-cart span").textContent = arrItems.length

                totalCart()

            } else {
                let id = idItemcart[i].getAttribute("id-item-cart")
                quantity2[i].textContent = num

                arrItems.find((arrItem) => {
                    if (arrItem.idProduct === id) {
                        arrItem.qty = num
                    }
                })
                let reduc2 = reduction2[i].parentElement.parentElement.querySelector(".item-into-money2")

                // totalItemProduct(idItemcart[i], num,reduc2)
                totalCart()
                window.localStorage.setItem("itemCard", JSON.stringify(arrItems))
            }

        }
        // cộng quantity2
        more2[i].onclick = () => {
            const num = +(quantity2[i].innerText) + 1
            let id = idItemcart[i].getAttribute("id-item-cart")
            quantity2[i].textContent = num

            arrItems.find((arrItem) => {
                if (arrItem.idProduct === id) {
                    arrItem.qty = num
                }
            })
            let more2Click = more2[i].parentElement.parentElement.querySelector(".item-into-money2")
            // totalItemProduct(idItemcart[i], num,more2Click)
            totalCart()
            window.localStorage.setItem("itemCard", JSON.stringify(arrItems))
        }
    }
}



function totalCart() {
    idItemcart = document.querySelectorAll(".item-product-cart")

    let resultTotal = arrItems.reduce((total, arrItem, index) => {
        let itemIntoMoney2 = idItemcart[index].querySelector(".item-into-money2")
        let itemIntoMoney3 = idItemcart[index].querySelector(".item-into-money")

        let priceText = (Number.parseFloat(arrItem.priceDetai) + '')

        if (priceText.length === 4 && priceText.includes(".")) {
            priceText = priceText + 0
        } if (priceText.length === 3 && priceText.includes(".")) {
            priceText = priceText + 00
        } if (priceText.length === 1 && itemIntoMoney3.innerText.length === 10) {
            priceText = priceText + "000"
        }

        let numItem = priceText.replace(/\./g, '')
        let numItem2 = (+numItem * arrItem.qty)

        itemIntoMoney2.innerText = (numItem2.toLocaleString()) + '.000' + '₫'
        return total + (+numItem * arrItem.qty)
    }, 0)

    resultAll = resultTotal.toLocaleString()

    resultTotal === 0 ? document.querySelector(".into-money").textContent = '0VNĐ' : document.querySelector(".into-money").textContent = resultAll + '.000' + '₫'

    // khi không có prosuct thì ẩn hiện img ko sản phẩm
    if (arrItems.length === 0) {
        document.querySelector(".img-cart-no-product").style.display = "flex"
        document.querySelector(".into-moneys").style.display = 'none'
        document.querySelector(".footer-modal").style.display = "none"
    } else {
        document.querySelector(".img-cart-no-product").style.display = "none"
        document.querySelector(".into-moneys").style.display = "flex"
        document.querySelector(".footer-modal").style.display = "flex"
    }
}

// cộng chừ tiền từng sp
function totalItemProduct(id, num, click) {
    let idItemProduct = id
    let priceItem = idItemProduct.querySelector(".item-into-money")

    let priceText = (Number.parseFloat(priceItem.innerText) + '')

    if (priceText.length === 4 && priceText.includes(".")) {
        priceText = priceText + 0
    } if (priceText.length === 3 && priceText.includes(".")) {
        priceText = priceText + 00

    }
    let numItem = (priceText.replace(/\./g, '') * num)

    click.innerText = (numItem.toLocaleString()) + '.000' + '₫'
}

HandleInformation.isemail = function (selector, message) {
    return {
        selector,
        test: (value) => {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            return regex.test(value) ? undefined : message || "Trường này phải là Email"
        }


    }
}

HandleInformation.ispassword = function (selector, message) {
    return {
        selector,
        test: (value) => {
            return value.trim().length >= 6 ? undefined : message || "Mật khẩu tối thiểu phải 6 kí tự"
        }
    }
}
HandleInformation.isCommon = function (selector, message) {
    return {
        selector,
        test: (value) => {
            return value ? undefined : message || "Vui lòng nhập nhập trường này"
        }
    }
}
HandleInformation.ispassword2 = (selector, valueInput, message) => {
    return {
        selector,
        test: (value) => {
            return valueInput() === value ? undefined : message || "Mật khẩu tối thiểu phải 6 kí tự"
        }
    }
}





if (modalogin) {
    HandleInformation({
        idFrom: ".form-1",
        rules: [
            HandleInformation.isCommon("#email"),
            HandleInformation.isemail("#email"),
            HandleInformation.isCommon("#password"),
            HandleInformation.ispassword("#password"),
            HandleInformation.isCommon("#password2"),
            HandleInformation.ispassword2("#password2", () => {
                return document.querySelector("input#password").value
            }),

        ],
        onSubmit: (data) => {
            let objData = data
            users.login = objData
            window.localStorage.setItem("information", JSON.stringify(users))
        }
    })
}

if (informationUser) {


    HandleInformation2({
        idFrom: ".form-2",
        rules: [
            HandleInformation.isCommon("#name input"),
            HandleInformation.isCommon("#phone input"),
            HandleInformation.isCommon("#city"),
            HandleInformation.isCommon("#district"),
            HandleInformation.isCommon("#address"),
        ],
        onSubmit: (data) => {
            let objData = data
            users.information = objData
            window.localStorage.setItem("information", JSON.stringify(users))
        }
    })

}


function HandleInformation(datahandle) {
    let selectorRules = {}

    function validate(inputElement, rule) {
        let errorInput = inputElement.parentElement.querySelector(".form-message");
        let errorMessage;

        let rules = selectorRules[rule.selector];

        for (let i = 0; i < rules.length; i++) {
            // lấy rules chuyền value ở input
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorInput.innerText = errorMessage
            inputElement.parentElement.classList.add("invalid")
        } else {
            errorInput.innerText = ''
            inputElement.parentElement.classList.remove("invalid")
        }
        return !errorMessage
    }

    let form = document.querySelector(datahandle.idFrom)


    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault()
            let formValid = true
            datahandle.rules.forEach((rule) => {
                let inputElement = form.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)

                if (!isValid) {
                    formValid = false
                }
            })
            if (formValid) {

                let formValueInput = form.querySelectorAll("[name]")
                let formValues = Array.from(formValueInput).reduce((values, input) => {

                    return (values[input.name] = input.value) && values
                }, {})

                datahandle.onSubmit(formValues)

                checkLogin()

                modalogin.style.display = "none"
                informationUser.style.display = "block"
            }

        }

        datahandle.rules.forEach((rule) => {
            let inputElement = form.querySelector(rule.selector)

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]

            }
            inputElement.onblur = () => {

                validate(inputElement, rule)
            }

            inputElement.oninput = () => {
                let errorInput = inputElement.parentElement.querySelector(".form-message")
                errorInput.innerText = ''
                inputElement.parentElement.classList.remove("invalid")
            }
        })
    }

}
function HandleInformation2(datahandle) {
    let selectorRules = {}

    function validate(inputElement, rule) {
        let errorInput = inputElement.parentElement.querySelector(".form-message");
        let errorMessage;

        let rules = selectorRules[rule.selector];

        for (let i = 0; i < rules.length; i++) {
            // lấy rules chuyền value ở input
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorInput.innerText = errorMessage
            inputElement.parentElement.classList.add("invalid")
        } else {
            errorInput.innerText = ''
            inputElement.parentElement.classList.remove("invalid")
        }
        return !errorMessage
    }

    let form = document.querySelector(datahandle.idFrom)


    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault()
            let formValid = true


            datahandle.rules.forEach((rule) => {
                let inputElement = form.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)

                if (!isValid) {
                    formValid = false
                }
            })

            if (formValid) {
                let formValueInput = form.querySelectorAll("[name]")
                let formValues = Array.from(formValueInput).reduce((values, input) => {
                    (values[input.name] = input.value)
                    return values
                }, {})
                datahandle.onSubmit(formValues)

                informationUser.style.display = "none"
                checkLogin()
                console.log(isPay);
                if (isPay) {
                    window.location = "payment.html";
                } else {
                    checkLogin()
                    modalCart.style.display = "none"
                }
                checkLogin()
            }
        }

        datahandle.rules.forEach((rule) => {
            let inputElement = form.querySelector(rule.selector)

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]

            }
            inputElement.onblur = () => {

                validate(inputElement, rule)
            }

            inputElement.oninput = () => {
                let errorInput = inputElement.parentElement.querySelector(".form-message")
                errorInput.innerText = ''
                inputElement.parentElement.classList.remove("invalid")
            }
        })
    }

}


if (document.querySelector(".payment-products-container")) {

    document.querySelector(".user-name").innerText = (users.information.name) + ' ' + (users.information.phone)
    document.querySelector(".payment-address").innerText = (users.information.address) + ', ' + (users.information.district) + ', ' + (users.information.city)
    itemPayment()

    document.querySelector(".change-address").onclick = () => {
        document.body.style.overflow = 'hidden'

        document.querySelector(".form-2").reset()
        let formmessage = document.querySelectorAll(".form-2 .form-message")
        for (let i = 0; i < formmessage.length; i++) {
            formmessage[i].innerText = ' '
        }

        modalCart.style.display = "flex"
        informationUser.style.display = "block"
    }

    console.log(arrPrice);

    let pricePayment = arrPrice.reduce((total, num) => {
        return total + num
    }, 0)
   

    let priceProductsPayment = document.querySelectorAll(".all-price-products")
    for (let i = 0; i < priceProductsPayment.length; i++) {
        priceProductsPayment[i].innerText = (pricePayment.toLocaleString()) + ".000₫"
    }

    let delivery = Number.parseFloat(document.querySelector(".payment-delivery-price").innerText) + pricePayment

    document.querySelector(".total-price-payment").innerText = (delivery.toLocaleString()) + ".000₫"
}


function itemPayment() {
    let htmlpayment = arrItems.map((arrItem) => {

        let priceText = (Number.parseFloat(arrItem.priceDetai) + '')

        if (priceText.length === 4 && priceText.includes(".")) {
            priceText = priceText + 0
        } if (priceText.length === 3 && priceText.includes(".")) {
            priceText = priceText + 00
        }

        let numItem = priceText.replace(/\./g, '')
        numItem = (+numItem * arrItem.qty)

        
        if(numItem < 9) {
            numItem = +(numItem + '000')
        }
        arrPrice.push(numItem)

        let result = (numItem.toLocaleString()) + ".000₫"

        return `
                <div class="payment-products">
                <div class="row align-items-center">
                    <div class="col-md-6 col-lg-7 col-12">
                        <div class="payment-products-left">
                            <img src="${arrItem.imgarr}" alt="">
                            <div class="d-block">
                                <p>${arrItem.titleProDetai}</p>
                                <span>Cây + Chậu nhựa đen (LC3018-1)</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-5 col-12">
                        <div class="row">
                            <div class="payment-products-right">
                                <div class="col-md-7 col-10 col-sm-7">
                                    <div class="row flex-md-row flex-row-reverse">
                                        <div class="col-6">
                                            <span class="payment-products-price">${arrItem.priceDetai}</span>
                                        </div>
                                        <div class="col-6">
                                            <span class="payment-products-quantity"> x <span>${arrItem.qty}</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5 col-6 d-none d-md-block">
                                    <span class=" payment-products-money into-money-title">${result}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    }).join('')
    document.querySelector(".payment-item-products").innerHTML = htmlpayment
}


if (informationUser) {
    let city = document.querySelector("#city")
    let district = document.querySelector("#district")

    city.onchange = () => {
        let arroption = document.querySelectorAll("#district option")
        for (let i = 1; i < arroption.length; i++) {
            district.removeChild(arroption[i])
        }

        let getValue = city.value.replace(/ /g, "_")
        let valueArr = arrdistrict[getValue]

        for (let i = 0; i < valueArr.length; i++) {
            let itemoption = document.createElement("option")
            itemoption.setAttribute("itemoption", valueArr[i])
            itemoption.innerText = valueArr[i]

            district.appendChild(itemoption)
        }
    }

    checkLogin()
}


function checkLogin() {
    imgUser = document.querySelector(".header-img-user.active")
    if (users.information?.name && users.login?.email) {
        if (document.querySelector(".login-user")) {
            document.querySelector(".login-user").style.display = "none"
        }
        if (document.querySelector(".header-img-user")) {
            document.querySelector(".login-user2").classList.add("active")
            document.querySelector(".header-img-user").classList.add("active")
            userUse.innerText = users.information.name
            userUse.style.display = "block"
        }
    } else {
        userUse? userUse.style.display = "none": ''
        
        if (imgUser) {
            document.querySelector(".login-user2.active").classList.remove("active")
            imgUser.classList.remove("active")
            document.querySelector(".login-user").style.display = "block"
        }
    }
    if (!(users.login?.email)) {
    }
}


if (loginOut) {
    loginOut.onclick = (e) => {
        e.stopPropagation()

        users = {}
        checkLogin()
        window.localStorage.setItem("information", JSON.stringify(users))
    }
}

if (document.querySelector("header")) {
    let headerNavigation = document.querySelector(".navbar-toggler")
    let header = document.querySelector("header")



    function handleScrollTop() {
        window.scrollTo(0, 0);
    }
    window.onscroll = () => {
        let scrollTop = document.querySelector(".btn-scroll-top")
        if (document.documentElement.scrollTop > 50 || document.body.scrollTop > 50) {
            header.style.position = "fixed";
            header.style.top = 0;
            header.style.left = 0;
            header.style.right = 0;
            header.style.paddingTop = 0;
            header.style.background = "#52a34b";

            headerNavigation.onclick = () => {
                header.classList.toggle("active")
            }
            if (document.querySelector("header.active")) {
            } else {
                if (window.innerWidth > 991) {
                    header.style.animation = "fadeInleft 0.5s ease forwards";
                }
            }
            scrollTop.style.display = "block"

        } else {
            handleScrollHeader()

            if (document.querySelector("header.active")) {
                if (window.innerWidth > 991) {
                    document.querySelector("header.active").classList.remove("active")
                }
                if (window.innerWidth < 991) {
                    header.style.paddingTop = "50px";
                }
            } else {
                header.style.position = "absolute";
                header.style.paddingTop = "50px";
                header.style.left = 0;
                header.style.right = 0;
                header.style.background = "transparent";
                header.style.animation = "unset";
            }


            scrollTop.style.display = "none"

        }

    }

    function handleHederWidth() {

        let atrbutton = document.querySelector(".navbar-toggler").getAttribute("aria-expanded")

        if (atrbutton == "true" && window.innerWidth < 992) {
            document.querySelector("header").classList.add("active")
        }
        if (window.innerWidth > 991 && atrbutton == "true" && document.documentElement.scrollTop > 100) {
            header.style.background = "#52a34b";
        }
        if (window.innerWidth < 991 && atrbutton == "true" && document.documentElement.scrollTop < 100) {
            header.style.background = "#52a34b";
        }
        if (window.innerWidth > 991 && atrbutton == "true" && document.documentElement.scrollTop < 100) {
            header.style.background = "transparent";
        }

    }
    window.addEventListener("resize", handleHederWidth)

    handleHederWidth()


    function handleScrollHeader() {
        {
            let handleHeder = headerNavigation.onclick = () => {
                if (document.documentElement.scrollTop < 100) {
                    header.classList.toggle("active")
                    if (document.querySelector("header.active")) {
                        header.style.background = "#52a34b";
                    } else {
                        function clearTimeout1() {
                            header.style.background = "transparent";
                            clearTimeout(myTimeout)
                        }
                        const myTimeout = setTimeout(clearTimeout1, 350);

                    }

                }
            }
        }
    }
    handleScrollHeader()
}


function handleProduct () {
    window.location = "products.html";
}
function handleintro() {
     window.location = "introduce.html";
}






let arrItemPoducts

let productApi = "https://ac5f8d67-e14e-487f-b985-4c1254ec6084.mock.pstmn.io/product"




function getProduct(callback) {
    fetch(productApi)
        .then(response => response.json())
        .then(callback)
}
getProduct(renderProduct)

let rangeInput = document.querySelectorAll(".range-input input")
let minMaxrange = 300
let progress = document.querySelector(".slider-filter .proress")
if (progress) {
    let fiterTextMin = document.querySelector(".filter-price2-min")
    let fiterTextMax = document.querySelector(".filter-price2-max")
    let btnFiter = document.querySelector(".filter-price-text > span")


    fiterTextMin.innerText = rangeInput[0].value + ".000"
    fiterTextMax.innerText = rangeInput[1].value + ".000"

    rangeInput.forEach(input => {
        input.oninput = (e) => {
            let minValue = parseInt(rangeInput[0].value)
            let maxValue = parseInt(rangeInput[1].value)

            if (maxValue - minValue < minMaxrange) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxValue - minMaxrange
                } else {
                    rangeInput[1].value = minValue + minMaxrange
                }
            } else {
                progress.style.left = (minValue / rangeInput[0].max) * 100 + "%"
                progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%"
            }

            fiterTextMin.innerText = minValue.toLocaleString() + ".000"
            fiterTextMax.innerText = maxValue.toLocaleString() + ".000"

        }
    })

    btnFiter.addEventListener("click", () => {
        let minValf = parseInt(rangeInput[0].value),
            maxValf = parseInt(rangeInput[1].value)


        prodCard = document.querySelectorAll(" .card")           // id product

        
        let k = 0
        for (let i = 0; i < prodCard.length; i++) {
            let getPrice = prodCard[i].querySelector(".card .price").innerText

            let priceText = (Number.parseFloat(getPrice) + '')

            if (priceText.length === 4 && priceText.includes(".")) {
                priceText = priceText + 0
            } if (priceText.length === 3 && priceText.includes(".")) {
                priceText = priceText + 00
            } if (priceText.length === 2 && getPrice.length === 10) {

            } if (priceText.length === 1 && getPrice.length === 10) {
                priceText = priceText + "000"
            }

            let numItem = priceText.replace(/\./g, '')

            if (minValf <= +numItem && +numItem <= maxValf) {
                k++
                prodCard[i].parentElement.style.display = ""
            } else {
                prodCard[i].parentElement.style.display = "none"
                // console.log(prodCard[i].getAttribute("id-data"));
            }
        }
        if(prodCard.length === k) {
            
            for(let i = 9; i < prodCard.length; i++) {
                prodCard[i].parentElement.style.display = "none"
            }
            tabsproducts.style.display = ""

        }else {
            tabsproducts.style.display = "none"
        }


    })


}






window.onload = () => {



    let prodCard = document.querySelectorAll(".card")
    if (document.querySelector(".header-cart span")) {

        document.querySelector(".header-cart span").textContent = arrItems.length
    }

    if (document.querySelector(".js-index")) {
        arrProDetai = []
        window.localStorage.setItem("itemProDetai", JSON.stringify(arrProDetai))
    }

    let call = document.querySelector("#phone input")

    if (call) {
        call.oninput = () => {
            call.value = call.value.replace(/[^0-9.]/g, '')
        }
    }

    clickCard(prodCard)
}


