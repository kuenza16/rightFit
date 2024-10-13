document.addEventListener('DOMContentLoaded', () => {
    const fullName = getFullName(); // Function to retrieve user's full name from cookie or local storage
    const usernameElement = document.querySelector('.username');
    const logoutButton = document.querySelector('.log');
    
    if (fullName) {
        // If full name exists, display it and show the logout button
        document.querySelector('.signup_btn .username').textContent = fullName;
        document.querySelector('.log').style.display = 'Block';
        const logout = async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    url: 'https://job-application-filtering-system-openai.onrender.com/api/v1/users/logout',
                })
                if (res.data.status === 'success') {
                    window.location.href = '/'
                    // location.reload(true)

                }
            } catch (err) {
                showAlert('error', 'Error logging out! Try Again.')
            }
        }
        var doc = document.querySelector('.log')

        doc.addEventListener('click', (e) => logout())


        // usernameElement.textContent = fullName;
        // logoutButton.style.display = 'block';
    } else {
        // If full name doesn't exist, hide the logout button
        logoutButton.style.display = 'None';
    }
});
// function getFullName() {
//     // Retrieve all cookies
//     const cookies = document.cookie.split(';');
//     console.log(cookies)

//     // Loop through each cookie to find the one containing the full name
//     for (let cookie of cookies) {
//         // Trim any leading or trailing whitespace from the cookie string
//         cookie = cookie.trim();
//         const tokenObject = JSON.parse(cookie.substring(6));

//         // Extract the fullName property from the token object
//         const fullName = tokenObject.fullName;

//         return fullName;

//         // Check if the cookie contains the full name
//         // if (cookie.startsWith('full_name_cookie=')) {
//         //     // Extract the full name from the cookie
//         //     const fullName = cookie.substring('full_name_cookie='.length);
//         //     // Decode the full name (if needed)

//         //     return decodeURIComponent(fullName);
//         // }
//     }

//     // Return null if the full name cookie is not found
//     return null;
// }
function getFullName() {
    // Retrieve all cookies
    const cookies = document.cookie.split(';');

    // Loop through each cookie to find the one containing the token
    for (let cookie of cookies) {
        // Trim any leading or trailing whitespace from the cookie string
        cookie = cookie.trim();

        // Check if the cookie contains the token
        if (cookie.startsWith('token=')) {
            // Extract the token value from the cookie
            const tokenValue = cookie.substring('token='.length);

            // Parse the token JSON string into an object
            const tokenObject = JSON.parse(tokenValue);

            // Extract the fullName property from the token object
            const fullName = tokenObject.fullName;

            // Return the full name
            return fullName;
        }
    }

    // Return null if the token cookie is not found
    return null;
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
            // Redirect to the job detail page passing the job ID as a query parameter
            window.location.href = `https://job-application-filtering-system-openai.onrender.com/afterlogindetail.html?id=${job._id}`;
        });


        const daysCount = document.createElement('div');
        daysCount.classList.add('dayscount');
        daysCount.textContent = job.daysAgo ? `${job.daysAgo} days ago` : ''; // Use actual days count if available, otherwise leave empty

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
        jobLength.innerHTML = `<img src="img/Black.svg" alt=""> &nbsp;${job.employeeType}`; // Assuming job type (e.g., Full time) is available in the job object

        const workDepartment = document.createElement('div');
        workDepartment.classList.add('work-department', 'info');
        workDepartment.innerHTML = `<img src="img/Vector.svg" alt="">&nbsp;${job.department}`; // Assuming department name is available in the job object

        const location = document.createElement('div');
        location.classList.add('location', 'info');
        location.innerHTML = `<img src="img/pin.svg" alt="">&nbsp;${job.placement}`; // Assuming location is available in the job object

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
