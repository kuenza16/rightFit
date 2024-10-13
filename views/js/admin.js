
import { showAlert } from "./alert.js"

const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'https://job-application-filtering-system-openai.onrender.com/api/v1/users/logout',
        })
        if (res.data.status === 'success') {
            window.location.href = "/"

        }
    } catch (err) {
        showAlert('error', 'Error logging out! Try Again.')
    }
}

var obj
if (document.cookie) {
    obj = JSON.parse(document.cookie.substring(6))
} else {
    obj = JSON.parse('{}')
}

var el = document.querySelector('.header .login_signup')
if (obj._id) {
    el.innerHTML =
        '<div class="signup_btn nav"><a href="/admin">Add HR</a></div><div class="signup_btn nav"><a href="/admin_hr">HRs</a></div><div class="signup_btn nav"><a href="/admin_user">Applicants</a></div><div class="signup_btn"><a class="sign">' +
        obj.fullName +
        '</a></div><div class="login_btn"><a id="logout" class="log">Log Out</a></div> '
    // '<a id = "logout" class="log">Log out</a> <a href="/me" class="nav__el"><span>' +
    // obj.fullName +
    // '</span> </a>'
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
} else {
    el.innerHTML =
        ' <div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div ><div class="login_btn"><a class="log" href="/login">Login</a></div>'
}

var el2 = document.querySelector('.menu_of_navbar')
if (obj._id) {
    el2.innerHTML =
        '<div class="signup_btn nav"><a href="/admin">Add HR</a></div><div class="signup_btn nav"><a href="/admin_hr">HRs</a></div><div class="signup_btn nav"><a href="/admin_user">Applicants</a></div><div class="signup_btn"><a class="sign">' +
        obj.fullName +
        '</a></div><div class="login_btn"><a id="logout1" class="Log">log Out</a></div> '
    var doc1 = document.querySelector('#logout1')

    doc1.addEventListener('click', (e) => logout())
} else {
    el2.innerHTML =
        '<div class="navbar_list"><div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div></div><div class="navbar_list"><div class="login_btn"><a class="log" href="/login">Login</a></div></div>'
}
export const newhr = async (fullName, email, password, department) => {
    try {
        console.log("jdha")
        const res = await axios({
            method: 'POST',
            url: 'https://job-application-filtering-system-openai.onrender.com/api/v1/hrs/create',
            data: {
                email,
                fullName,    
                password,
                department
            },
        })
        if (res.data.status === 'success') {
            // showAlert('success', 'Account created successfully')
            $(document).ready(function () {
                // Display the div

                $('body > *:not(.successful_msg)').css({
                    '-webkit-filter': 'blur(5px)',
                    'filter': 'blur(5px)'
                });
                $('.successful_msg').css('display', 'block').fadeIn();

                // Close the div after 2 seconds
                setTimeout(function () {
                    $('.successful_msg').fadeOut();
                    $('body > *:not(.successful_msg)').css({
                        '-webkit-filter': 'none',
                        'filter': 'none'
                    });
                }, 2000);
            });
            window.setTimeout(() => {
                location.assign('/admin')
            }, 1500)
        }

    } catch (err) {
        let message = typeof err.response !== 'undefined' ?
            err.response.data.message
            : err.message
        showAlert('error', 'Error: Password are not the same!', message)
    }
}
document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault()
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const department = document.getElementById('department').value;
    console.log("jza")

    newhr(fullName, email, password, department)

})