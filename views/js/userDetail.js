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
    var firstName = obj.fullName.split(' ')[0];
    el.innerHTML =

        '<div class="signup_btn nav"><a href ="/">Home</a></div><div class="signup_btn"><a href="/me" class="sign">' +
        firstName +
        '</a></div><div class="login_btn"><a id="logout" class="log">Log Out</a></div>'
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

var el2 = document.querySelector('.menu_of_navbar')
if (obj._id) {
    var firstName = obj.fullName.split(' ')[0];
    el2.innerHTML =
        '<div class="navbar_list"><a href="/hr">Home</a></div><div class="navbar_list"><a href="/me" class="sign">' +
        firstName +
        '</a></div><div class="navbar_list login_btn"><a id="logout1" class="log">Log Out</a></div>'
    var doc1 = document.querySelector('#logout1')

    doc1.addEventListener('click', (e) => logout())
} else {
    el2.innerHTML =
        '<div class="navbar_list"><div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div></div><div class="navbar_list"><div class="login_btn"><a class="log" href="/login">Login</a></div></div>'
}

const fetchJobDetails = async (jobId) => {
    try {
        const res = await axios.get(`https://job-application-filtering-system-openai.onrender.com/api/v1/jobs/${jobId}`);
        displayJobDetails(res.data.data);

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
};

// Get the jobId from the URL query parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jobId = urlParams.get('id');
// Call fetchJobDetails with the jobId
fetchJobDetails(jobId);

const apply_btn = async (job,
    user,
    pdf) => {
    try {
        const formData = new FormData();
        formData.append('job', job);
        formData.append('user', user);
        formData.append('pdf', pdf);
        formData.append('jobTitle', jobTitle)
        formData.append('jobDescription', jobDescription)
        $(".display_submit").hide();
        $(".loading_container").show();

        const res = await axios.post('https://job-application-filtering-system-openai.onrender.com/api/v1/apply/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
            }
        });
        if (res.data.status === 'success') {
            $(".loading_container").hide();
            $(".confirmation").show();
        }
    } catch (err) {
        let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
        showAlert('error', 'Error posting job!', message);
    }
};

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', async (e) => {
        e.preventDefault();

        // Get form data
        const jobid = urlParams.get('id');
        const userid = obj._id;

        const res = await axios.get('https://job-application-filtering-system-openai.onrender.com/api/v1/apply');
       
        function isEmpty(array) {
            return Array.isArray(array) && array.length === 0;
        }
        const jobApp = res.data.data;

        if (isEmpty(jobApp)) {
            const user = document.getElementById('userId').value = userid;
            const job = document.getElementById('jobId').value = jobid;
            const pdfInput = document.getElementById('pdfFile');
            const pdf = pdfInput.files[0];
            // Post form data
            apply_btn(job,
                user,
                pdf);

        } else {
            jobApp.forEach(jobs => {
                // postedByArray.push(job.postedBy);
                

                if (jobs.user === userid && jobs.job === jobId) {
                    // result.push(jobs)
                    $(document).ready(function () {
                        // Display the div
                        $('.unsuccessful_msg').css('display', 'block').fadeIn();

                        // Close the div after 2 seconds
                        setTimeout(function () {
                            $('.unsuccessful_msg').fadeOut();
                        }, 2000);
                    });
                } else {
                    // const pdf = document.getElementById('file_input').file;
                    const user = document.getElementById('userId').value = userid;
                    const job = document.getElementById('jobId').value = jobid;
                    const pdfInput = document.getElementById('pdfFile');
                    const pdf = pdfInput.files[0];
                    // Post form data
                    apply_btn(job,
                        user,
                        pdf);

                }
            });

        }



    });

});
// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('submit').addEventListener('click', async (e) => {
//         e.preventDefault();

//         const pdfInput = document.getElementById('pdfFile');
//         if (pdfInput) {
//             const pdf = pdfInput.files[0];
//             console.log(pdf);
//         } else {
//             console.error('File input element not found');
//         }
//     });
// });
