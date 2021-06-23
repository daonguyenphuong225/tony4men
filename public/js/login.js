$(document).ready(function () {

    // $('.createBtn').click(() => {
    //     let username = $('input[name=username]').val()
    //     let password = $('input[name=password]').val()
    //     let email = $('input[name=email]').val()
    //     $.ajax({
    //         url: "http://localhost:8000/login/registation",
    //         type: "post",
    //         data: {
    //             username: username,
    //             password: password,
    //             email: email
    //         },
    //         success(result) {
    //             alert('Bạn đã dăng kí thành công')
    //         },
    //         error(error) {
    //             console.log(error)
    //         }
    //     })
    // })

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    // function getCookie(cname) {
    //     var name = cname + "=";
    //     var decodedCookie = decodeURIComponent(document.cookie);
    //     var ca = decodedCookie.split(';');
    //     for (var i = 0; i < ca.length; i++) {
    //         var c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }

    $('.loginBtn').click(() => {
        let username = $('#username').val();
        let password = $('#password').val();
        if (username.length != 0 && password.length != 0) {
            $.ajax({
                url: '/login',
                type: 'POST',
                data: {
                    username: username,
                    password: password
                }
            })
                .then((data) => {
                   if(data == 0){
                       alert('Mật khẩu sai');
                   }
                   if(data == 1){
                       alert('Tài khoản không tồn tại');
                   }
                   else{
                    setCookie('token', data.token, 1)
                    location.replace("/admin");
                   }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    })




});


