$(document).ready(function () {

  // Trang HEADER//
  let cartStorage = sessionStorage.getItem("cart");
  if (cartStorage) {
    cart = JSON.parse(cartStorage);
    $('.cartNumber').html(`(${cart.length})`)
  } else {
    $('.cartNumber').html(`(0)`)
  }


  // Trang HEADER//

  // Trang HOME//
  $('.category-click').click(function () {
    let id = $(this).parent().siblings().eq(0).val()
    let content = $(this).parent().parent().parent().siblings().eq(0).children().eq(0)
    let click = $(this).parent().siblings().eq(1)
    $('.underline').css({ 'visibility': 'hidden' })

    $.ajax({
      url: "/",
      type: "POST",
      data: {
        id: id,
      },
      success(result) {
        click.css({ 'visibility': 'visible', 'opacity': '1' })
        content.html('')
        for (a = 0; a < result.products.length; a++) {
          if (result.products[a].productDetailIds[1]) {
            content.append(`
                  <div class="product-card col">
                    <div class="card h-100">
                     <div class="picture-parent">
                         <a class="a-img" href="/productDetail/${result.products[a]._id}">
                         <img  src="${result.products[a].productDetailIds[0].pictures[0]}" class="products-picture card-img-top" > 
                         <img  src="${result.products[a].productDetailIds[1].pictures[0]}" class="products-picture-hover card-img-top">
                      </a>
                     </div>
                      <div class="d-flex flex-column justify-content-center align-items-center">
                        <h5 class="products-name card-title">${result.products[a].name}</h5>
                        <p class="products-id d-none card-text" >${result.products[a]._id}</p>
                        <p class="products-price card-text">${result.price[a]}đ</p>
   
                      </div>
                      <div class=" product-footer ">
                      <form action="/productDetail/${result.products[a]._id}" method="GET">
                      <button class="detail-btn btn btn-dark" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                        <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                      </svg>  Chi tiết</button>
                      </form>   
                        </div>
                    </div>
                  </div>
                  `)
          } else {
            content.append(`
                  <div class="product-card col">
                    <div class="card h-100">
                     <div class="picture-parent">
                         <a class="a-img" href="/productDetail/${result.products[a]._id}">
                         <img  src="${result.products[a].productDetailIds[0].pictures[0]}" class="products-picture card-img-top" > 
                         <img  src="${result.products[a].productDetailIds[0].pictures[1]}" class="products-picture-hover card-img-top">
                      </a>
                     </div>
                      <div class="d-flex flex-column justify-content-center align-items-center">
                        <h5 class="products-name card-title">${result.products[a].name}</h5>
                        <p class="products-id d-none card-text" >${result.products[a]._id}</p>
                        <p class="products-price card-text">${result.price[a]}đ</p>
   
                      </div>
                      <div class=" product-footer">
                      <form action="/productDetail/${result.products[a]._id}" method="GET">
                      <button class="detail-btn btn btn-dark" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyeglasses" viewBox="0 0 16 16">
                        <path d="M4 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm2.625.547a3 3 0 0 0-5.584.953H.5a.5.5 0 0 0 0 1h.541A3 3 0 0 0 7 8a1 1 0 0 1 2 0 3 3 0 0 0 5.959.5h.541a.5.5 0 0 0 0-1h-.541a3 3 0 0 0-5.584-.953A1.993 1.993 0 0 0 8 6c-.532 0-1.016.208-1.375.547zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                      </svg>  Chi tiết</button>
                      </form>
                        </div>
                    </div>
                  </div>
                  `)
          }
        }
      },
      error(error) {
        console.log(error)
      }
    })
  })
  // Trang HOME//
  $('.picture-btn').click(function () {
    let picture = $(this).children().eq(0).attr('src')
    $('.swiper-wrapper').html('')
    $('.swiper-wrapper').append(`<img src="${picture}" alt="error">`)
  })

  // Trang PRODUCT DETAIL//
  $('input[name = "color"]').click(function () {
    let productDetailId = $(this).siblings().eq(0).val()
    $.ajax({
      url: "/get-size",
      type: "POST",
      data: {
        productDetailId: productDetailId
      },
      success(result) {
        $(".size-ul").html('')
        for (const data of result) {
          $(".size-ul").append(`
         <li class="d-flex align-items-center mx-1">
                                    <input required name="size" class="" type="radio" value="${data}">
                                    <span>
                                    ${data}
                                    </span>
                                  </li>
         `)
        }
      },
      error(error) {
        console.log(error)
      }
    })
  })

  $('.plus-btn').click(function () {
    let amount = $('.amount-input').val()
    amount++
    $('.amount-input').val(amount)
  })
  $('.minus-btn').click(function () {
    let amount = $('.amount-input').val()
    if (amount > 1) {
      amount--
      $('.amount-input').val(amount)
    }
  })

  $('.addToCard').click(function () {
    addToCard()
  })
  $('.buy-now').click(function () {
    addToCard()
  })


  function addToCard() {
    let picture = $('.picture-a').children().eq(0).attr('src');
    let name = $('h5').html()
    let id = $('.productId').html()
    let price = $('.price').val()
    let color = $('input[name="color"]:checked').val()
    let size = $('input[name="size"]:checked').val()
    let amount = parseInt($('.amount-input').val())
    let productDetailId = $('input[ name="productDetailId"]').val()
    if(size && color){
    $.ajax({
      url: "/check-amount",
      type: "POST",
      data: {
        productDetailId:productDetailId,
        size:size,
        amount:amount
      },
      success(result) {
       if(result == 0){
         let cart = []
      let cartItem = {
        id: id,
        productDetailId:productDetailId,
        picture: picture,
        name: name,
        price: price,
        color: color,
        size: size,
        amount: amount
      }
      let cartStorage = sessionStorage.getItem("cart");
      if (cartStorage) {
        cart = JSON.parse(cartStorage);
        let index = cart.findIndex(c => c.id === id && c.color === color && c.size === size)
        if (index !== -1) {
          cart[index].amount += amount
        } else {
          cart.push(cartItem)
        }
      } else {
        cart.push(cartItem)
      }
      cartString = JSON.stringify(cart)
      sessionStorage.setItem("cart", cartString)
      alert("Tạo đơn hàng thành công")
       }
       if(result == 1){
        alert('Số lượng đặt vượt quá số lượng cho phép')
      }
      },
      error(error) {
        console.log(error)
      }
    })
  }else{
      alert('Xin hãy chọn đầy đủ màu sắc, kích thước')
    }
   
  }
  // Trang PRODUCT DETAIL//
});
//  Swiper JS//
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
