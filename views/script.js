$(document).ready(function () {
    // Function to change the border color of the .search div while typing in input field
    $('.content_for_search').on('input', function () {
        var colorValue = $(this).val().trim(); // Trim whitespace from input

        // Set border color of .search div
        $('.search').css('border-color', colorValue ? '#2496FF' : '#EDEDED');
    });
});
$(document).ready(function () {
    // Toggle job types popup when button is clicked
    $('.job-type-listing').click(function () {
        $('.job_types_popup').toggle();
    });
});
$(document).ready(function () {
    // Toggle job types popup when button is clicked
    $('.department').click(function () {
        $('.department_types_popup').toggle();
    });
});
$(document).ready(function () {
    // Toggle job types popup when button is clicked
    $('.dzongkhag').click(function () {
        $('.dzongkhag_types_popup').toggle();
    });
});

$('#pdfFile').change(function () {
    var fileInput = $('#pdfFile');
    var filePath = fileInput.val();
    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Please select a PDF file.');
        fileInput.val('');
    }
});


$(document).ready(function () {
    $(".apply_btn").click(function () {
        // Check if the user is logged in
        if (userIsLoggedIn()) {
            $(".display_submit").toggle(); // Toggle display_submit if user is logged in
        } else {
            // If user is not logged in, show a login prompt or redirect to the login page
            // Example: Redirect to login page
            window.location.href = "/login"; // Replace "/login" with your actual login page URL
        }
        // if (userIsLoggedIn()) {
        //     // User is logged in, perform actions accordingly
        //     console.log("User is logged in");
        //     // You can redirect the user, show authenticated content, etc.
        // } else {
        //     // User is not logged in, perform actions accordingly
        //     console.log("User is not logged in");
        //     // You can show login/signup options, restricted content, etc.
        // }
    });
    $(".close_btn").click(function () {
        $(".display_submit").hide(); // Hide display_submit when close_btn is clicked
    });
});

// Function to check if the user is logged in
function userIsLoggedIn() {
    // Check if a cookie named "loggedIn" exists and has a value of "true"
    const loggedInCookie = document.cookie.split(';');
    console.log(loggedInCookie)
    if (loggedInCookie.length > 0 && loggedInCookie[0].trim() !== '') {
        return true
    } else {
        return false; // If "loggedIn" cookie doesn't exist or has value other than "true", return false
    }
}

$(document).ready(function () {
    // Toggle job types popup when button is clicked
    $('.ok_button').click(function () {
        $('.confirmation').toggle();
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