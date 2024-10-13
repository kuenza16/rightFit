// import axios from 'axios'; // Import axios if not already imported
import { showAlert } from "./alert.js";

// const login = async (email, password) => {
//     console.log("i am here outside")
//     try {
//         console.log("i am here inside")
//         // Check against HR database
//         const hrRes = await axios({
//             method: 'POST',
//             url: 'http://localhost:4001/api/v1/hrs/login',
//             data: {
//                 email,
//                 password,
//             },
//         });

//         // Check against regular users database
//         const userRes = await axios({
//             method: 'POST',
//             url: 'http://localhost:4001/api/v1/users/login',
//             data: {
//                 email,
//                 password,
//             },
//         });

//         if (email === 'ksangay214@gmail.com' && password === '123pass123word') {
//             // Admin login
//             console.log("i am here admin")
//             window.setTimeout(() => {
//                 location.assign('/admin');
//             });
//         } else if (hrRes.data.status === 'success') {
//             // HR user login

//             console.log("i am here hr")
//             showAlert('success', 'Logged in as HR');
//             window.setTimeout(() => {
//                 location.assign('/hr');
//             }, 1500);
//             const hrObj = hrRes.data.data.hrs;
//             document.cookie = 'hr_token=' + JSON.stringify(hrObj);
//         }
//         else if (userRes.data.status === 'success') {
//             console.log("i am here user")
//             // Regular user login
//             showAlert('success', 'Logged in successfully');
//             window.setTimeout(() => {
//                 location.assign('/applicant');
//             }, 1500);
//             const obj = userRes.data.data.user;
//             document.cookie = 'token=' + JSON.stringify(obj);
//         }

//     } catch (err) {
//         console.log("i am here catch")
//         let message = typeof err.response !== 'undefined' ? err.response.data.message : err.message;
//         showAlert('error', 'Error: Incorrect email or password', message);
//     }
// };

// document.querySelector('.input_container_form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email, password);
// })

// main.js
const login = async (email, password, role) => {
  try {
    let url;
    if (role === "hr") {
      url = "https://job-application-filtering-system-openai.onrender.com/api/v1/hrs/login";
    } else {
      url = "https://job-application-filtering-system-openai.onrender.com/api/v1/users/login";
    }

    const response = await axios({
      method: "POST",
      url: url,
      data: {
        email,
        password,
      },
    });
    if(response.data.status==="success"){
      $(document).ready(function () {
        $("body > *:not(.successful_msg)").css({
          "-webkit-filter": "blur(5px)",
          filter: "blur(5px)",
        });
        $(".successful_msg").css("display", "block").fadeIn();

        // Close the div after 2 seconds
        setTimeout(function () {
          $(".successful_msg").fadeOut();
          $("body > *:not(.successful_msg)").css({
            "-webkit-filter": "none",
            filter: "none",
          });
        }, 2000);
      });
      const obj = response.data.data.user;
      document.cookie = "token=" + JSON.stringify(obj);
      
      if(obj.role==="hr"){
        window.setTimeout(() => {
          location.assign("/hr");
        }, 1500);
      }else if(obj.role==="user"){
        window.setTimeout(() => {
          location.assign("/");
        }, 1500);
      }else{
        window.setTimeout(() => {
          location.assign("/admin");
        }, 1500);
      }
    }
  } catch (err) {
    console.error(err);
    // showAlert('error', 'An error occurred. Please try again later.');
    $(document).ready(function () {
      $("body > *:not(.unsuccessful_msg)").css({
        "-webkit-filter": "blur(5px)",
        filter: "blur(5px)",
      });
      $(".unsuccessful_msg").css("display", "block").fadeIn();

      // Close the div after 2 seconds
      setTimeout(function () {
        $(".unsuccessful_msg").fadeOut();
        $("body > *:not(.unsuccessful_msg)").css({
          "-webkit-filter": "none",
          filter: "none",
        });
      }, 2000);
    });
  }
};

document
  .querySelector(".input_container_form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    login(email, password, role);
  });
