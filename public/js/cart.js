$(document).ready(function () {
    let cartStorage = sessionStorage.getItem("cart");
    cart = JSON.parse(cartStorage);
    if (cartStorage) {
        cart = JSON.parse(cartStorage);
        $('.cartNumber').html(`(${cart.length})`)
    } else {
        $('.cartNumber').html(`(0)`)
    }

    function loadcart() {
        let price = 0;
        let totalPrice = 0;
        let content = '';
        for (const item of cart) {
            price = 0;
            price += item.price * item.amount
            totalPrice += item.price * item.amount;
            content += `    
            <div class="m-2 d-flex  justify-content-between align-items-center">
            <div class="m-2 d-flex" >
            <img src="${item.picture}" style="height:80px;padding:5px;border:1px solid rgb(148, 144, 144)" alt="">
            <div class="d-flex flex-column  justify-content-center m-2 ">
                <div><span>${item.name}</span>-<span>${item.color}</span>-<span>${item.size}</span>-<span>${numeral(item.price).format('0,0')}đ</span></div>
                <div class ="d-flex ">
                    <a type ="button" class ="delete-btn me-3"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg></a>
                    <div>
                        <input  type="hidden" value="${item.id}">
                        <input  type="hidden" value="${item.color}">
                        <input  type="hidden" value="${item.size}">
                        <input  type="hidden" value="${item.productDetailId}">
                        <button type="button"  class="minus-btn btn btn-secondary btn-sm ">-</button>
                        <input style="text-align:center;width:30px" type="text" value="${item.amount}" disabled>
                        <button type="button" class="plus-btn btn btn-secondary btn-sm">+</button>
                    </div>
              </div>
            </div>
            </div >
            <span>${numeral(price).format('0,0')}đ</span>
            </div>
        `}
        $('.content').html(content)
        $('.totalPrice').html(`${numeral(totalPrice).format('0,0')}đ`)

        function updateCart(id,color,size, type = 0) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].id === id && cart[i].color == color && cart[i].size === size) {
                    switch (type) {
                        case 0:
                            cart.splice(i, 1);
                            break;
                        case 1:
                            cart[i].amount++

                            break;
                        case 2:
                            cart[i].amount--
                            if (cart[i].amount <= 0) {
                                cart.splice(i, 1);
                            }
                            break;

                    }
                }
            }
            cartString = JSON.stringify(cart)
            sessionStorage.setItem("cart", cartString)
            loadcart()
        }

        $('.delete-btn').click(function () {
            let id = $(this).siblings().eq(0).children().eq(0).val()
            let color = $(this).siblings().eq(0).children().eq(1).val()
            let size = $(this).siblings().eq(0).children().eq(2).val()
            updateCart(id,color,size)
        })

        $('.plus-btn').click(function () {
            let id = $(this).siblings().eq(0).val()
            let color = $(this).siblings().eq(1).val()
            let size = $(this).siblings().eq(2).val()
            let amount = $(this).siblings().eq(5).val()
            let productDetailId = $(this).siblings().eq(3).val()

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
                 updateCart(id,color,size, 1)
                 }
                 if(result == 1){
                  alert('Số lượng đặt vượt quá số lượng cho phép')
                }
                },
                error(error) {
                  console.log(error)
                }
              })
        })

        $('.minus-btn').click(function () {
            let id = $(this).siblings().eq(0).val()
            let color = $(this).siblings().eq(1).val()
            let size = $(this).siblings().eq(2).val()
            updateCart(id,color,size, 2)
        })


        $('.create-cart').click(() => {
            let name = $('input[name=name]').val()
            let phone = $('input[name=phone]').val()
            let email = $('input[name=email]').val()
            let address = $('input[name=address]').val()
            let note = $('textarea[name=note]').val()

        
            newCart = cart.map((c)=>{
                delete c.picture
                delete c.picture
                return c
            })

            const data = {
                name: name,
                phone: phone,
                email: email,
                address: address,
                note: note,
                order: newCart,
                totalPrice: totalPrice
            }
            if (name.length != 0 && email.length != 0 && phone.length != 0 && address.length != 0 ) {
                $.ajax({
                    url: '/cartDetail',
                    type: 'POST',
                    dataType:'json',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                })
                    .then((data) => {
                      if(data == 0){
                          alert('Số lượng đặt vượt quá số lượng cho phép')
                      }
                      if(data == 1){
                          alert('Đặt hàng thành công')
                        sessionStorage.removeItem("cart")
                        location.reload();
                      }else{
                          alert(data)
                      }
                  
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                alert('Vui lòng nhập đủ thông tin')
            }
        })

    }

    loadcart()


});
