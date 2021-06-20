$(document).ready(function () {
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

  $('.picture-btn').click(function(){
   let picture= $(this).children().eq(0).attr('src')
    $('.swiper-wrapper').html('')
    $('.swiper-wrapper').append(`<img src="${picture}" alt="error">`)
  })


  $('.minus-btn').click(function(){
    
  })
});

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
