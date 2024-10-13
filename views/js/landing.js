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
    } r
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


const fetchJobs = async () => {
    try {
        const res = await axios.get('https://job-application-filtering-system-openai.onrender.com/api/v1/jobs');
        displayJobs(res.data.data);
    } catch (err) {
        console.log(err);
    }
};

const displayJobs = (jobs) => {
    const jobListContainer = document.querySelector('.job');


    jobs.forEach((job) => {
        const jobListItem = document.createElement('div');
        jobListItem.classList.add('joblist');
        jobListItem.addEventListener('click', () => {
            if (obj.role == 'hr') {
                window.location.href = `https://job-application-filtering-system-openai.onrender.com/detail?id=${job._id}`;

            } else {
                window.location.href = `https://job-application-filtering-system-openai.onrender.com/userDetail?id=${job._id}`;

            }

            // Redirect to the job detail page passing the job ID as a query parameter
        });


        const daysCount = document.createElement('div');
        daysCount.classList.add('dayscount');
        daysCount.textContent = job.daysAgo ? `${job.daysAgo} days left` : ''; // Use actual days count if available, otherwise leave empty

        const mainContent = document.createElement('div');
        mainContent.classList.add('maincontent');

        const image = document.createElement('div');
        image.classList.add('image');
        const companyLogo = document.createElement('img');
        companyLogo.setAttribute('src', 'img/companylogo.svg'); // Modify this to use actual logo URL
        companyLogo.setAttribute('alt', 'Company Logo');
        image.appendChild(companyLogo);

        const jobTitleAndAgency = document.createElement('div');
        jobTitleAndAgency.classList.add('job-titleandagency');

        const jobTitle = document.createElement('div');
        jobTitle.classList.add('job-title');
        jobTitle.textContent = job.jobTitle; // Assuming job title is available in the job object

        const agency = document.createElement('div');
        agency.classList.add('agency');
        agency.textContent = job.field; // Assuming agency name is available in the job object

        jobTitleAndAgency.appendChild(jobTitle);
        jobTitleAndAgency.appendChild(agency);

        const jobShortDetail = document.createElement('div');
        jobShortDetail.classList.add('job-short-detail');

        const jobLength = document.createElement('div');
        jobLength.classList.add('job-length', 'info');
        jobLength.innerHTML = `<img src="img/Black.svg" class="icon" alt=""> &nbsp;${job.employeeType}`; // Assuming job type (e.g., Full time) is available in the job object

        const workDepartment = document.createElement('div');
        workDepartment.classList.add('work-department', 'info');
        workDepartment.innerHTML = `<img src="img/Vector.svg" class="icon" alt="">&nbsp;${job.department}`; // Assuming department name is available in the job object

        const location = document.createElement('div');
        location.classList.add('location', 'info');
        location.innerHTML = `<img src="img/pin.svg" class="icon" alt="">&nbsp;${job.placement}`; // Assuming location is available in the job object

        jobShortDetail.appendChild(jobLength);
        jobShortDetail.appendChild(workDepartment);
        jobShortDetail.appendChild(location);

        mainContent.appendChild(image);
        mainContent.appendChild(jobTitleAndAgency);
        mainContent.appendChild(jobShortDetail);

        jobListItem.appendChild(daysCount);
        jobListItem.appendChild(mainContent);

        jobListContainer.appendChild(jobListItem);
    });
};


fetchJobs();