$(document).ready(function () {


    $('.create-category-btn').click(() => {
        let status = $('.status-select').val();
        let parentId = $('.categoryParent-select').val();
        let name = $('.create-category-input').val();

        $.ajax({
            url: "category-list",
            type: "POST",
            data: {
                name: name,
                status: status,
                parentId: parentId
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
        let id = $(this).siblings().eq(0).val()

            $.ajax({
                url: "category-list",
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

    $('.update-category-btn').click(function(){
        let position = $(this).parent().siblings().filter('.modal-body').children()
        let id = $(this).siblings().eq(0).val();
        let status = position.filter('.status-select').val();
        let parentId = position.filter('.categoryParent-select').val();
        let name = position.filter('.update-category-input').val();

        $.ajax({
            url: "category-list",
            type: "PUT",
            data: {
                id: id,
                name: name,
                status: status,
                parentId: parentId
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


