$(document).ready(function () {
    $('.create-store-btn').click(() => {
        let address = $('.create-store-input').val();
        let provinceId = $('.province-select').val();
        let status = $('.status-select').val();
        console.log(address,provinceId,status);
        $.ajax({
            url: "/province-list",
            type: "POST",
            data: {
                address: address,
                provinceId: provinceId,
                status: status,
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

    $('.delete-btn').click(function(){
        let status = 1
        let id = $(this).siblings().eq(2).val()

            $.ajax({
                url: "/province-list",
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
    })

    $('.update-store-btn').click(function(){
        let position = $(this).parent().siblings().filter('.modal-body').children()
        let id = $(this).siblings().eq(0).val();
        let address = position.filter('.update-store-input').val();
        let status = position.filter('.status-select').val();
        let provinceId = position.filter('.province-select').val();
        

        $.ajax({
            url: "province-list",
            type: "PUT",
            data: {
                id: id,
                address: address,
                status: status,
                provinceId: provinceId
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


