import { showAlert } from './alert.js'
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

var obj = JSON.parse(document.cookie.substring((6)))

var el = document.querySelector('.header .login_signup')
if (obj.role == "hr") {
    el.innerHTML =
        '<div class="home nav"><a href="/hr">Home </a></div><div class="nav"><a href="/joblist">Job List</a></div><div class="post_btn nav"><a href="/postjob">+ Post A Job</a> </div><div class="signup_btn"><a class="sign">' +
        obj.fullName +
        '</a></div><div class="login_btn"><a id="logout" class="log">Log Out</a></div>'
    // '<a id = "logout" class="log">Log out</a> <a href="/me" class="nav__el"><span>' +
    // obj.fullName +
    // '</span> </a>'
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
} else if (obj.role == "user") {
    el.innerHTML =
        '<div class="signup_btn"><a href ="/">Home</a></div><div class="signup_btn"><a href="/me" class="sign">' +
        obj.fullName +
        '</a></div><div class="login_btn"><a id="logout" class="log">Log Out</a></div>'
    // '<a id = "logout" class="log">Log out</a> <a href="/me" class="nav__el"><span>' +
    // obj.fullName +
    // '</span> </a>'
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())

} else {
    el.innerHTML =
        ' <div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div ><div class="login_btn"><a class="log" href="/login">Login</a></div>'
}

var el1 = document.querySelector('.form.form-user-data')
el1.innerHTML =
    ` <div class="form__group"> <label class="form__label" for="name">Name</label> <input class="form__input" id="fullName" type="text" value="` +
    obj.fullName +
    `" required="required" name="fullName"/></div><div class="form__group ma-bt-md"><label class="form__label" for="email">Email address</label>
<input class="form__input" id="email" type="email" value="` +
    obj.email +
    `" required="required" name="email"/>
</div><div class "form__group right">  <button class="btn btn--small btn--green">Save settings</button></div>`


var el2 = document.querySelector('form.form-user-password')
el2.innerHTML = `   <div class="form__group">
                        <label class="form__label" for="password-current">Current password</label>
                        <input class="form__input" id="password-current" type="password" placeholder="••••••••"
                            required="required" minlength="8" />
                    </div>
                    <div class="form__group">
                        <label class="form__label" for="password">New password</label>
                        <input class="form__input" id="password" type="password" placeholder="••••••••"
                            required="required" minlength="8" />
                    </div>
                    <div class="form__group ma-bt-lg">
                        <label class="form__label" for="password-confirm">Confirm password</label>
                        <input class="form__input" id="password-confirm" type="password" placeholder="••••••••"
                            required="required" minlength="8" />
                    </div>
                    <div class="form__group right">
                            <button class="btn btn--small btn--green btn--save-password">Save password</button>
                    </div>`

//Updating settings

// type is either 'password' or data
export const updateSettings = async (data, type) => {
    try {
        if (obj.role == "hr") {
            const url =
                type === 'password'
                    ? 'https://job-application-filtering-system-openai.onrender.com/api/v1/hrs/updateMyPassword'
                    : 'https://job-application-filtering-system-openai.onrender.com/api/v1/hrs/updateMe'
            const res = await axios({
                method: 'PATCH',
                url,
                data,
            })
            if (res.data.status === 'success') {
                showAlert('success', 'Data updated successfully!')
            }

        } else {
            const url =
                type === 'password'
                    ? 'https://job-application-filtering-system-openai.onrender.com/api/v1/users/updateMyPassword'
                    : 'https://job-application-filtering-system-openai.onrender.com/api/v1/users/updateMe'
            const res = await axios({
                method: 'PATCH',
                url,
                data,
            })
            if (res.data.status === 'success') {
                showAlert('success', 'Data updated successfully!')
            }

        }

    } catch (err) {
        let message =
            typeof err.response !== 'undefined'
                ? err.response.data.message
                : err.message
        // showAlert('error', 'Error: Please provide valid email address', message)
        showAlert('error', err.response.data.message)
    }
}

const userDataForm = document.querySelector('.form.form-user-data')
userDataForm.addEventListener('submit', (e) => {
    e.preventDefault()
    var obj = JSON.parse(document.cookie.substring(6))
    const form = new FormData()
    form.append('fullName', document.getElementById('fullName').value)
    form.append('email', document.getElementById('email').value)
    form.append('userId', obj._id)
    updateSettings(form, 'data')
})

const userPasswordForm = document.querySelector('form.form-user-password')
userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    document.querySelector('.btn--save-password').textContent = 'Updating...'
    const passwordCurrent = document.getElementById('password-current').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    await updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password',
    )
    document.querySelector('.btn--save-password').textContent = 'Save password'
    document.getElementById('password-current').value = ''
    document.getElementById('password').value = ''
    document.getElementById('password-confirm').value = ''
})


