import { showAlert } from './alert.js';

const register = async (fullName, email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'https://job-application-filtering-system-openai.onrender.com/api/v1/users/signup', // Update the URL to your backend API endpoint
            data: {
                fullName,
                email,
                password
            },
        });
       

        if (res.data.status === 'success') {
            // showAlert('success', 'Account created successfully');
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
                location.assign('/login'); // Redirect to the login page after successful registration
            }, 1500);
        }

    } catch (err) {
        let message = typeof err.response !== 'undefined' ?
            err.response.data.message
            : err.message;
        showAlert('error', 'Error: Registration failed!', message);

    }
};

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    var confirmPassword = document.getElementById('confirm_password').value;

    const fullName = fullNameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Validation
    if (fullName.match(/\d/) !== null) {
        return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return;
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)) {
        return;
    }
    if (password !== confirmPassword) {
        return;
    }

    // Perform registration
    register(fullName, email, password);
});


$(document).ready(function () {


    $('#fullName').on('input', function () {
        var fullName = $(this).val();
        if (/\d/.test(fullName)) {
            $('.name_input').addClass('error-border');
        } else {
            $('.name_input').addClass('correct-border');
        }
    });

    $('#email').on('input', function () {
        var email = $(this).val();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            $('.email_input').addClass('error-border');
        } else {
            $('.email_input').addClass('correct-border');
        }
    });

    $('#password').on('input', function () {
        var password = $(this).val();
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
            $('.password_input').addClass('error-border');
        } else {
            $('.password_input').addClass('correct-border');
        }
    });



    $('#confirm_password').on('input', function () {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm_password').value;

  
        if (password !== confirmPassword) {
            $('.confirm_password_input').addClass('error-border');
        } else {
            $('.confirm_password_input').addClass('correct-border');
        }
    });
});
