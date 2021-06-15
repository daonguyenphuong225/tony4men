$(document).ready(function () {
    $('.addToCard').click(function () {
        let picture = $(this).parent().siblings().eq(0).attr('src');
        let name = $(this).parent().siblings().children().eq(0).text();
        let id = $(this).parent().siblings().children().eq(1).text();
        let price = $(this).parent().siblings().children().eq(2).text();

        let ammount = 1;
        let cart = []
        let cartItem = {
            id: id,
            picture: picture,
            name: name,
            price: parseInt(price.split(',').join('')),
            ammount: ammount
        }
        let cartStorage = sessionStorage.getItem("cart");
        if (cartStorage) {
            cart = JSON.parse(cartStorage);
            let index = cart.findIndex(c => c.id === id)
            if (index !== -1) {
                cart[index].ammount += 1
            } else {
                cart.push(cartItem) 
            }
        }else {
            cart.push(cartItem) 
        }
        cartString = JSON.stringify(cart)
        sessionStorage.setItem("cart", cartString)

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