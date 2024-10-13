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
function getFullName() {
    // Retrieve all cookies
    const cookies = document.cookie.split(';');

    // Loop through each cookie to find the one containing the full name
    for (let cookie of cookies) {
        // Trim any leading or trailing whitespace from the cookie string
        cookie = cookie.trim();
        const tokenObject = JSON.parse(cookie.substring(6));

        // Extract the fullName property from the token object
        const fullName = tokenObject.fullName;

        return fullName;

        // Check if the cookie contains the full name
        // if (cookie.startsWith('full_name_cookie=')) {
        //     // Extract the full name from the cookie
        //     const fullName = cookie.substring('full_name_cookie='.length);
        //     // Decode the full name (if needed)

        //     return decodeURIComponent(fullName);
        // }
    }

    // Return null if the full name cookie is not found
    return null;
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
    document.querySelector('.detail_logo').setAttribute('src', job.logo);
    document.querySelector('.title_job_header').textContent = job.jobTitle;
    document.querySelector('.postion').textContent = job.positionTitle;
    document.querySelector('.agency').textContent = job.field;
    document.querySelector('.bott').textContent = job.employeeType;
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
};

// Get the jobId from the URL query parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const jobId = urlParams.get('id');

// Call fetchJobDetails with the jobId
fetchJobDetails(jobId);
