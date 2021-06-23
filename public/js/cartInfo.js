$(document).ready(function () {
    $('.processing-btn').click(function(){
        let status = 1
        let id = $(this).siblings().eq(0).val()
        callAjax(id,status)
    })
    $('.completed-btn').click(function(){
        let status = 2
        let id = $(this).siblings().eq(0).val()
        callAjax(id,status)
    })
    $('.canceled-btn').click(function(){
        let status = 3
        let id = $(this).siblings().eq(0).val()
        let dataLength = $(this).siblings().filter('input[name=number]').val()
        let orderDetails = []
        for(i = 1;i <= dataLength; i++){
            let data = $(this).siblings().filter(`input[name=data${i}]`)
            orderDetails.push({
                productDetailId: data.eq(0).val(),
                size: data.eq(1).val(),
                amount: data.eq(2).val()
            })
        }

        $.ajax({
            url: "cart-canceled",
            type: "PUT",
            data: {
                status: status,
                id: id,
                orderDetails: orderDetails
            },
            success(result) {
                alert(result)
                location.reload();
            },
            error(error) {
                console.log(error)
            }
        })
    })
});

function callAjax (id,status){
    $.ajax({
        url: "cart-list",
        type: "PUT",
        data: {
            status: status,
            id: id
        },
        success(result) {
            alert(result)
            location.reload();
        },
        error(error) {
            console.log(error)
        }
    })
}