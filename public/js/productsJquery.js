$(document).ready(function () {

    $('.delete-btn').click(function () {
        let id = $(this).siblings().filter('input').val()
        let status = 1
        $.ajax({
            url: "product-list",
            type: "PUT",
            data: {
                id:id,
                status:status
            },
            success(result) {
                alert(result)
                location.reload()
            },
            error(error) {
                console.log(error)
            }
        })
    })


});


