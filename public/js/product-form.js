$(document).ready(function () {

    $('.create-product-btn').click(() => {

        let name = $('input[name="name"]').val();
        let price = $('input[name="price"]').val();
        let status = $('select[name="status"]').val();
        let categoryId = $('select[name="categoryId"]').val();

        $.ajax({
            url: "product-form",
            type: "POST",
            data: {
                name: name,
                price: price,
                status: status,
                categoryId: categoryId
            },
            success(result) {

                alert(result.message)
                $('.product-select').prepend(`<option value="${result.product._id}" selected>${result.product.name}</option>`)
                $('.productDetail-link').click()
            },
            error(error) {
                console.log(error)
            }
        })
    })

    $('.upload-btn').click(() => {
        let divForm = $(".divForm")[0]
         $('#myForm').append(divForm)

       let myForm = document.getElementById('myForm');

        let formData = new FormData(myForm);
        callAjax(formData)
    
    })


    function callAjax(formData){
            
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "product-upload",
            processData: false,
            contentType: false,
            cache: false,
            data: formData,
            success(result) {
                if(result.length == 0){
                    $('.picture-upload').append('<p class="fail-p">Tải ảnh thất bại!</p>')
                    $('.picture-upload').append(`   
                    <div class="divForm">
                    Select images: <input  type="file" name="myFiles" multiple>
                    <button type="button" class="upload-btn btn btn-secondary">Tải ảnh lên</button>
                  </div>`)
                    $('.upload-btn').click(() => {
                        let divForm = $(".divForm")[0]
                         $('#myForm').append(divForm)
                
                       let myForm = document.getElementById('myForm');
                
                        let formData = new FormData(myForm);
                        callAjax(formData)
                    
                    })
                }else{
                    $('.fail-p').html('')
                    for(i=0;i<result.length;i++){
                        $('.picture-upload').append(`
                        <img  style="height: 100px;" src="${result[i].path}" alt="">
                        <input name="img[]" type="hidden" value="${result[i].path}">
                        `)
                    }
                    $('.picture-upload').append('Tải ảnh thành công!')
                }
               
            },
            error(error) {
                console.log(error)
            }
        })
      
    }
    $(".add-btn").click(function () {

        $(".size-amount").append(`
        <div class="d-flex">
          <select required class="product-select form-control m-2 " name="size[]">
            <option value="" disabled selected>Kích cỡ...</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
          </select>
          <input name="amount[]" class="product-select form-control m-2" type="text" placeholder="Số lượng...">
        </div>
        `)
    })
   

});


