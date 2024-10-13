const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "https://job-application-filtering-system-openai.onrender.com/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      window.location.href = "/";
    }
  } catch (err) {
    showAlert("error", "Error logging out! Try Again.");
  }
};

var obj;
if (document.cookie) {
  obj = JSON.parse(document.cookie.substring(6));
} else {
  obj = JSON.parse("{}");
}

var el = document.querySelector(".header .login_signup");
if (obj._id) {
  el.innerHTML =
    '<div class="home nav"><a href="/hr">Home </a></div><div class="nav"><a href="/joblist">Job List</a></div><div class="post_btn nav"><a href="/postjob">+ Post A Job</a> </div><div class="signup_btn"><a class="sign">' +
    obj.fullName +
    '</a></div><div class="login_btn"><a id="logout" class="log">Log Out</a></div>';
  // '<a id = "logout" class="log">Log out</a> <a href="/me" class="nav__el"><span>' +
  // obj.fullName +
  // '</span> </a>'
  var doc = document.querySelector("#logout");

  doc.addEventListener("click", (e) => logout());
} else {
  el.innerHTML =
    ' <div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div ><div class="login_btn"><a class="log" href="/login">Login</a></div>';
}
const userApllication = async () => {
  try {
    const res = await axios.get("https://job-application-filtering-system-openai.onrender.com/api/v1/apply");

    // displayApplications(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

// // Helper function to display data in the table
const displayData = (apply) => {
  var arr = apply;

  for (let i = 0; i < apply.length; i++) {
    const parsedData = JSON.parse(arr[i].parsedData);
    

    var tableRow = document.createElement("tr");

    var jobTitleCell = document.createElement("td");
    jobTitleCell.textContent = parsedData.profile.name;

    var fieldCell = document.createElement("td");
    fieldCell.textContent = parsedData.relevance;

    var positionTitleCell = document.createElement("td");
    positionTitleCell.textContent = parsedData.profile.email;

    var getdetail = document.createElement("td");
    getdetail.classList.add("getdetail");
    getdetail.textContent = "Detail";
    getdetail.addEventListener("click", async () => {
      try {
        const applyId = apply[i]._id;
        // Fetch and display the parsed data when the "Detail" button is clicked
        const res = await axios.get(
          `https://job-application-filtering-system-openai.onrender.com/api/v1/apply/${applyId}`
        );
        const parsedData = JSON.parse(res.data.data.parsedData);

        displayParsedData(parsedData);
        displayCollegeParsedData(parsedData);
        score(parsedData);
        project(parsedData);
        experince(parsedData);

        $("body > *:not(.detail_post)").css({
          "-webkit-filter": "blur(5px)",
          filter: "blur(5px)",
        });
        $(".detail_post").css("display", "block").fadeIn();
      } catch (err) {
        console.log(err);
      }
    });

    tableRow.appendChild(jobTitleCell);
    tableRow.appendChild(fieldCell);
    tableRow.appendChild(positionTitleCell);
    tableRow.appendChild(getdetail);
    // tableRow.appendChild(vacancyEndDateCell);

    // tableRow.appendChild(deleteCell);

    var table = document.querySelector(".table1");
    table.querySelector("tbody").appendChild(tableRow);
  }
};

// Fetch and display job applications
const fetchAndDisplayApplications = async () => {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jobId = urlParams.get("id");

    const res = await axios.get("https://job-application-filtering-system-openai.onrender.com/api/v1/apply");
    const jobApp = res.data.data;
    const result = [];

    jobApp.forEach((jobs) => {
      // postedByArray.push(job.postedBy);

      if (jobs.job === jobId) {
        result.push(jobs);
      }
    });
    // displayData(res.data.data);
    const sortedData = result.sort((a, b) => {
      const relevanceA = JSON.parse(a.parsedData).relevance;
      const relevanceB = JSON.parse(b.parsedData).relevance;
      return relevanceB - relevanceA;
    });
    displayData(sortedData);

  } catch (err) {
    console.log(err);
  }
};

// Call the function to fetch and display applications when the page loads
fetchAndDisplayApplications();

// Helper function to display the parsed data in the modal
const displayParsedData = (parsedData) => {

  const modalContent = document.getElementById("profile");
  modalContent.innerHTML = `
        <p><strong>Name:</strong> ${parsedData.profile.name}</p>
        <p><strong>Email:</strong> ${parsedData.profile.email}</p>`;
};
const displayCollegeParsedData = (parsedData) => {

  const college = document.getElementById("college");
  college.innerHTML = `
        <p><strong>College Name:</strong> ${parsedData.college.name}</p>
        <p><strong>Degree:</strong> ${parsedData.college.degree}</p>
        <p><strong>Branch:</strong> ${parsedData.college.branch}</p>
        <p><strong>End Date:</strong> ${parsedData.college.end_date}</p>
        <p><strong>Start Date:</strong> ${parsedData.college.start_date}</p>`;
};
const score = (parsedData) => {
  const college = document.getElementById("relevance");
  college.innerHTML = `
        <p><strong> relevance: </strong> ${parsedData.relevance}</p>
        <p><strong>ai_comment: </strong> ${parsedData.ai_comment}</p>`;
};

const project = (parsedData) => {
  const project = parsedData.projects;
  project.forEach((project) => {
    // Create a container for each project
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");

    // Iterate through each property of the project object
    for (const key in project) {
      if (project.hasOwnProperty(key)) {
        const value = project[key];

        // Check if the property is 'time_duration'
        if (key === "time_duration" && typeof value === "object") {
          // Convert the start and end dates to a formatted string
          const start_date = new Date(value.start_date).toLocaleDateString();
          // const end_date = new Date(value.end_date).toLocaleDateString();
          const duration = `${start_date}`;

          // Create a paragraph element for the time duration
          const timeDurationElement = document.createElement("p");
          timeDurationElement.innerHTML = `<strong>Time Duration:</strong> ${duration}`;

          // Append the time duration element to the project container
          projectContainer.appendChild(timeDurationElement);
        } else {
          // Create a paragraph element for each property
          const propertyElement = document.createElement("p");
          propertyElement.innerHTML = `<strong>${key}:</strong> ${
            Array.isArray(value) ? value.join(", ") : value
          }`;

          // Append the property element to the project container
          projectContainer.appendChild(propertyElement);
        }
      }
    }

    // Append the project container to the projects container in the UI
    const projectsContainer = document.getElementById("projects");
    projectsContainer.appendChild(projectContainer);
  });
};

const experince = (parsedData) => {

  const project = parsedData.professional_experiences;
  project.forEach((project) => {
    // Create a container for each project
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");

    // Iterate through each property of the project object
    for (const key in project) {
      if (project.hasOwnProperty(key)) {
        const value = project[key];

        // Create a paragraph element for each property
        const propertyElement = document.createElement("p");
        propertyElement.innerHTML = `<strong>${key}:</strong> ${
          Array.isArray(value) ? value.join(", ") : value
        }`;

        // Append the property element to the project container
        projectContainer.appendChild(propertyElement);
      }
    }

    // Append the project container to the projects container in the UI
    const projectsContainer = document.getElementById("experince");
    projectsContainer.appendChild(projectContainer);
  });
};

$(".prof").on("click", function () {
  // Hide other three divs with different class names
  $(".project, .college, .relevance, .experince").hide();
  $(".profile").show();
});
$(".proj").on("click", function () {
  // Hide other three divs with different class names
  $(".profile, .college, .relevance, .experince ").hide();
  $(".project").show();
});
$(".coll").on("click", function () {
  // Hide other three divs with different class names
  $(".profile, .project, .relevance, .experince ").hide();
  $(".college").show();
});
$(".relescore").on("click", function () {
  // Hide other three divs with different class names
  $(".profile, .project, .college,.experince ").hide();
  $(".relevance").show();
});
$(".ai_comment").on("click", function () {
  $(".profile, .project, .relevance ,.college").hide();
  $(".experince").show();
});
// $('.getdetail').on('click', function () {
//     getdetail.addEventListener('click', async () => {
//         try {
//             const applyId = apply[i]._id
//             // Fetch and display the parsed data when the "Detail" button is clicked
//             const res = await axios.get(`http://localhost:4001/api/v1/apply/${applyId}`);
//             const parsedData = JSON.parse(res.data.data.parsedData);
//             console.log(parsedData)
//             displayParsedData(parsedData)
//             displayCollegeParsedData(parsedData)
//             score(parsedData)

//             // Display the modal when data is fetched
//             document.getElementById("detail_post").style.display = "block";

//         } catch (err) {
//             console.log(err);
//         }
//     });

//     $('.detail_post').show();
// });
$(".close").on("click", function () {
  $("body > *:not(.detail_post)").css({
    "-webkit-filter": "none",
    filter: "none",
  });
  $(".detail_post").hide();
  $(".content").show();
});
$(document).ready(function () {
  // Function to handle the opening of divs
  $(".openthenavbar").click(function () {
    $(".listingdiv").hide();
    $(".closingdiv").show();
    $(".menu_of_navbar").slideDown();
  });

  $(".closethenavbar").click(function () {
    $(".listingdiv").show();
    $(".closingdiv").hide();
    $(".menu_of_navbar").slideUp();
  });
});

var el2 = document.querySelector(".menu_of_navbar");
if (obj._id) {
  el2.innerHTML =
    '<div class="navbar_list"><a href="/hr">Home</a></div><div class="navbar_list"><a href="/joblist">Job List</a></div><div class="navbar_list"><a href="/postjob">+ Post A Job</a></div><div class="navbar_list"><a href="/me" class="sign">' +
    obj.fullName +
    '</a></div><div class="navbar_list login_btn"><a id="logout1" class="log">Log Out</a></div>';
  var doc1 = document.querySelector("#logout1");

  doc1.addEventListener("click", (e) => logout());
} else {
  el2.innerHTML =
    '<div class="navbar_list"><div class="signup_btn"> <a class="sign" href = "/register" > Sign Up</a ></div></div><div class="navbar_list"><div class="login_btn"><a class="log" href="/login">Login</a></div></div>';
}
