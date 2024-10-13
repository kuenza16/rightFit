import { showAlert } from "./alert.js"
let jobTitle;
let jobDescription;
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
    el.innerHTML = '<div class="home nav"><a href="/hr">Home </a></div><div class="nav"><a href="/joblist">Job List</a></div><div class="post_btn nav"><a href="/postjob">+ Post A Job</a> </div><div class="signup_btn"><a href="/me" class="sign">' +
        obj.fullName +
        '</a></div><div class="login_btn"><a id="logout" class="log">Log Out</a></div>'

    // '<div class="signup_btn"><a class="sign">' +
    // obj.fullName +
    // '</a></div><div class="login_btn"><a id="logout" class="log">log Out</a></div>'
    // '<a id = "logout" class="log">Log out</a> <a href="/me" class="nav__el"><span>' +
    // obj.fullName +
    // '</span> </a>'
    var doc = document.querySelector('#logout')

    doc.addEventListener('click', (e) => logout())
    doc.addEventListener('click', function () {
        // Reload the page
        sessionStorage.setItem('reloadOnce', 'true');
        location.reload(true);
    });
} else {

    el.innerHTML =
        ' <div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div ><div class="login_btn"><a class="log" href="/login">Login</a></div>'
}

const fetchJobDetails = async (jobId) => {
    try {
        const res = await axios.get(`https://job-application-filtering-system-openai.onrender.com/api/v1/jobs/${jobId}`);
        // displayJobDetails(res.data.data);

        if (res.data.data.postedBy === obj._id) {
            document.querySelector('.delete-btn').style.display = 'inline-block';
            document.querySelector('.Result').style.display = 'inline-block';
            displayJobDetails(res.data.data);
        } else {
            document.querySelector('.delete-btn').style.display = 'none';
            document.querySelector('.Result').style.display = 'none';
            displayJobDetails(res.data.data);
        }

    } catch (err) {
        console.error('Error fetching job details:', err);
        // Handle the error, such as displaying an error message to the user
    }
};

const displayJobDetails = (job) => {
    // Update the DOM elements with job details
    // document.querySelector('.detail_logo').setAttribute('src', job.logo);
    document.querySelector('.title_job_header').textContent = job.jobTitle;
    document.querySelector('.postion').textContent = job.positionTitle;
    document.querySelector('.list').textContent = job.field;
    document.querySelector('.bott').textContent = job.employeeType;
    document.querySelector('.qualifications').textContent = job.qualification;
    document.querySelector('.bott1').textContent = job.department;
    document.querySelector('.location').textContent = job.placement;
    document.querySelector('.salary_range').textContent = job.salaryRange;
    document.querySelector('.list_sumarylist').textContent = job.jobDescription;
    document.querySelector('.pay').textContent = job.salaryRange;
    document.querySelector('.slot').textContent = job.slots;
    const endDate = job.vacancyEndDate.split('T')[0]; // Extracting date part before 'T'
    // Update the DOM element with the end date
    document.querySelector('.enddate').textContent = endDate;

    // Format the current timestamp to DD/MM/YYYY HH:MM:SS format
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    // Update the DOM element with the formatted date
    document.querySelector('.published_At').textContent = formattedDate;
    // document.querySelector('.qualifications').textContent = job.qualification;

    // Show the detail content
    document.querySelector('.detail_content').style.display = 'block';
    jobTitle = document.querySelector('.title_job_header').textContent;
    jobDescription = document.querySelector('.list_sumarylist').textContent;

    const result = document.getElementById('result-btn');
    result.addEventListener('click', async () => {
        try {
            window.location.href = `https://job-application-filtering-system-openai.onrender.com/result?id=${job._id}`;
        } catch (err) {
            console.log(err);
        }
    });

    const delete_btn = document.getElementById('delete-btn');
    delete_btn.addEventListener('click', async () => {
        try {
            const res = await axios.delete(`https://job-application-filtering-system-openai.onrender.com/api/v1/jobs/${job._id}`);
            if (res.data.status === 'success') {
                window.setTimeout(() => {
                    location.assign('/hr'); // Redirect to the login page after successful registration
                }, 1500);
                location.reload(true)

            } else {
                alert('job not deleted')
            }

        } catch (err) {
            console.log(err);
        }
    });

};
var el2 = document.querySelector('.menu_of_navbar')
if (obj._id) {
    el2.innerHTML =
        '<div class="navbar_list"><a href="/hr">Home</a></div><div class="navbar_list"><a href="/joblist">Job List</a></div><div class="navbar_list"><a href="/postjob">+ Post A Job</a></div><div class="navbar_list"><a href="/me" class="sign">' +
        obj.fullName +
        '</a></div><div class="navbar_list login_btn"><a id="logout1" class="log">Log Out</a></div>'
    var doc1 = document.querySelector('#logout1')

    doc1.addEventListener('click', (e) => logout())
} else {
    el2.innerHTML =
        '<div class="navbar_list"><div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div></div><div class="navbar_list"><div class="login_btn"><a class="log" href="/login">Login</a></div></div>'
}
// Get the jobId from the URL query parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jobId = urlParams.get('id');
// Call fetchJobDetails with the jobId
fetchJobDetails(jobId);

$(document).ready(function () {
    // Function to handle the opening of divs
    $('.openthenavbar').click(function () {
        $(".listingdiv").hide();
        $(".closingdiv").show();
        $(".menu_of_navbar").slideDown();
    });

    $('.closethenavbar').click(function () {
        $(".listingdiv").show();
        $(".closingdiv").hide();
        $(".menu_of_navbar").slideUp();
    });
});