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
        '</a></div><div class="login_btn"><a id="logout" class="log">log Out</a></div>'
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
    doc.addEventListener('click', function () {
        // Reload the page
        sessionStorage.setItem('reloadOnce', 'true');
        location.reload(true);
    });
} else {

    el.innerHTML =
        '<div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div ><div class="login_btn"><a class="log" href="/login">Login</a></div>'
} const fetchUser = async () => {
    try {
        const res = await axios.get('https://job-application-filtering-system-openai.onrender.com/api/v1/users');
        displayUser(res.data.data);

    } catch (err) {
        console.log(err);
    }
};
var el2 = document.querySelector('.menu_of_navbar')
if (obj._id) {
    el2.innerHTML =
        '<div class="navbar_list"><a href="/hr">Home</a></div><div class="navbar_list"><a href="/joblist">Job List</a></div><div class="navbar_list"><a href="/postjob">+ Post a job</a></div><div class="navbar_list"><a href="/me" class="sign">' +
        obj.fullName +
        '</a></div><div class="navbar_list login_btn"><a id="logout1" class="log">Log Out</a></div>'
    var doc1 = document.querySelector('#logout1')

    doc1.addEventListener('click', (e) => logout())
} else {
    el2.innerHTML =
        '<div class="navbar_list"><div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div></div><div class="navbar_list"><div class="login_btn"><a class="log" href="/login">Login</a></div></div>'
}

const displayUser = (user) => {
    var arr = user;

    for (let i = 0; i < arr.length; i++) {
        var tableRow = document.createElement('tr');
        const user = arr[i];

        var fullNameCell = document.createElement('td');
        fullNameCell.textContent = user.fullName;

        var emailCell = document.createElement('td');
        emailCell.textContent = user.email;



        var deleteCell = document.createElement('td');
        deleteCell.classList.add('delete-btn');
        deleteCell.textContent = 'Delete';
        deleteCell.addEventListener('click', async () => {
            try {
                await axios.delete(`https://job-application-filtering-system-openai.onrender.com/api/v1/users/${user._id}`);
                tableRow.remove();
                location.reload(true)
            } catch (err) {
                console.log(err);
            }
        });




        tableRow.appendChild(fullNameCell);
        tableRow.appendChild(emailCell);

        tableRow.appendChild(deleteCell);



        var table = document.querySelector('.Table');
        table.querySelector('tbody').appendChild(tableRow);
    }
};
fetchUser();

const fetchCount = async () => {
    try {
        const res = await axios.get('https://job-application-filtering-system-openai.onrender.com/api/v1/users/count')
        displayUsercount(res.data.data)
    } catch (err) {
        console.log(err);

    }


}

const displayUsercount = (count) => {
    try {
        const display = document.querySelector('.userCount .count ');

        if (count === 0) {
            display.innerHTML =
                '<div class = "TotalCount"><h2>Total users :'
                + count +
                '</h2></div>'
        } else {
            display.innerHTML =
                '<div class = "TotalCount"><h2>Total users :'
                + count +
                '</h2></div>'


        }
    } catch (err) {
        console.log(err);

    }

}
fetchCount();