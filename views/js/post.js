import { showAlert } from './alert.js';
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
        '<div class="home nav"><a href="/hr">Home </a></div><div class="nav"><a href="/joblist">Job List</a></div><div class="post_btn nav"><a href="/postjob">+ Post a job</a> </div><div class="signup_btn"><a href = "/me" class="sign">' +
        obj.fullName +
        '</a></div><div class="login_btn"><a id="logout" class="log">log Out</a></div>'
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
        '<div class="navbar_list"><a href="/hr">Home</a></div><div class="navbar_list"><a href="/joblist">Job List</a></div><div class="navbar_list"><a href="/postjob">+ Post A Job</a></div><div class="navbar_list"><a href="/me" class="sign">' +
        obj.fullName +
        '</a></div><div class="navbar_list login_btn"><a id="logout1" class="log">Log Out</a></div>'
    var doc1 = document.querySelector('#logout1')

    doc1.addEventListener('click', (e) => logout())
} else {
    el2.innerHTML =
        '<div class="navbar_list"><div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div></div><div class="navbar_list"><div class="login_btn"><a class="log" href="/login">Login</a></div></div>'
}

// const newjob = async (JobTitle, department, employeeType, positionTitle, field, slots, qualification, placement, salaryRange, jobDescription, vacancyEndDate) => {
//     try {
//         const res = await axios({
//             method: 'POST',
//             url: 'hhttp://localhost:4001/api/v1/jobs/create',
//             data: {
//                 JobTitle,
//                 department,
//                 employeeType,
//                 positionTitle,
//                 field,
//                 slots,
//                 qualification,
//                 placement,
//                 salaryRange,
//                 jobDescription,
//                 vacancyEndDate
//             },
//         });
//         if (res.data.status === 'success') {
//             showAlert('success', 'Job posted successfully!');
//         }
//     } catch (err) {
//         let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
//         showAlert('error', 'Error posting job!', message);
//     }
// };

// // Event listener for form submission
// document.getElementById('content').addEventListener('submit_btn', async (e) => {
//     e.preventDefault();

//     // Get form data
//     const JobTitle = document.getElementById('JobTitle').value;
//     const department = document.getElementById('department').value;
//     const employeeType = document.getElementById('employeeType').value;
//     console.log(JobTitle)
//     const positionTitle = document.getElementById('positionTitle').value;
//     const field = document.getElementById('field').value;
//     const slots = document.getElementById('slots').value;
//     const qualification = document.getElementById('qualification').value;
//     const placement = document.getElementById('placement').value;
//     const salaryRange = document.querySelector('input[name="salaryRange"]:checked').value;
//     const jobDescription = document.getElementById('jobDescription').value;
//     const vacancyEndDate = document.getElementById('vacancyEndDate').value;

//     // Post form data
//     newjob(JobTitle, department, employeeType, positionTitle, field, slots, qualification, placement, salaryRange, jobDescription, vacancyEndDate);
// });
// function showAlert(type, message) {
//     // Define your logic to show an alert message based on the type and message
//     console.log(`${type}: ${message}`);
// }
const newjob = async (jobTitle, department, employeeType, positionTitle, field, slots, qualification, placement, salaryRange, jobDescription, vacancyEndDate, postedBy) => {
    try {
        const res = await axios.post('https://job-application-filtering-system-openai.onrender.com/api/v1/jobs/create', {
            jobTitle,
            department,
            employeeType,
            positionTitle,
            field,
            slots,
            qualification,
            placement,
            salaryRange,
            jobDescription,
            vacancyEndDate,
            postedBy
        });
        if (res.data.status === 'success') {
            showAlert('success', 'Job posted successfully!')
            $(document).ready(function () {
                $(".display_detail4").hide();
                $(".btn_prev1").hide();
                $(".display_detail5").show();
                $(".btn_vacan1").show();
            });
        }
    } catch (err) {
        let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
        showAlert('error', 'Error posting job!', message);
    }
};

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit_btn').addEventListener('click', async (e) => {
        e.preventDefault();
       

        // Get form data
        const jobTitle = document.getElementById('JobTitle').value;
        const department = document.getElementById('department').value;
        const employeeType = document.getElementById('employeeType').value;
        const positionTitle = document.getElementById('positionTitle').value;
        const field = document.getElementById('field').value;
        const slots = document.getElementById('slots').value;
        const qualification = document.getElementById('qualification').value;
        const placement = document.getElementById('placement').value;
        const salaryRange = document.getElementById('salaryRange1').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const vacancyEndDate = document.getElementById('vacancyEndDate').value;
        const postedBy = document.getElementById('hr_id').value = obj._id;

        $(".job_postconfirm").show();
        $(document).ready(function () {
            $(".apply").click(function () {
                $(".job_postconfirm").hide();
                $(".display_detail4").hide();
                $(".btn_prev1").hide();
                $(".display_detail5").show();
                $(".btn_vacan1").show();

                newjob(jobTitle, department, employeeType, positionTitle, field, slots, qualification, placement, salaryRange, jobDescription, vacancyEndDate, postedBy);
            });
        });
        $(document).ready(function () {
            $(".cancel").click(function () {
                $(".job_postconfirm").hide();
            });
        });
        // Post form data
        // newjob(jobTitle, department, employeeType, positionTitle, field, slots, qualification, placement, salaryRange, jobDescription, vacancyEndDate);
    });
});

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