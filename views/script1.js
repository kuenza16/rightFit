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
$(document).ready(function () {
    $(".apply_btn").click(function () {
        $(".display_submit").toggle();
    });
    $(".close_btn").click(function () {
        $(".display_submit").hide(); // Hide display_submit when close_btn is clicked
    });
});
var clickCount = 0;
$(document).ready(function () {
    $(".btn_next1").click(function () {
        clickCount++;

        togglePrevButtonVisibility();

        if (clickCount === 3) {
            $(".btn_next1").hide();
        }
    });
    $(".btn_prev1").click(function () {
        clickCount--;

        togglePrevButtonVisibility();

        if (clickCount < 3) {
            $(".btn_next1").show();
        }
    });
    function togglePrevButtonVisibility() {
        if (clickCount >= 1) {
            $(".btn_prev1").show();
        } else {
            $(".btn_prev1").hide();
        }
    }
});
$(document).ready(function () {
    $(".btn_next1").click(function () {
        var $currentDetail = $(".content").find("[class^='display_detail']").filter(":visible");
        $currentDetail.hide();

        var currentIndex = parseInt($currentDetail.attr("class").split(" ")[0].replace("display_detail", ""));
        var nextIndex = (currentIndex % 4) + 1;

        $(".display_detail" + nextIndex).show();
    });
    $(".btn_prev1").click(function () {
        var $currentDetail = $(".content").find("[class^='display_detail']").filter(":visible");
        $currentDetail.hide();

        var currentIndex = parseInt($currentDetail.attr("class").split(" ")[0].replace("display_detail", ""));
        var prevIndex = (currentIndex - 2 + 4) % 4 + 1;

        $(".display_detail" + prevIndex).show();
    });
});
// $(document).ready(function () {
//     $(".submit_btn").click(async function () {
//         // Get form data
//         const JobTitle = $("#JobTitle").val();
//         const department = $("#department").val();
//         const employeeType = $("#employeeType").val();
//         const positionTitle = $("#positionTitle").val();
//         const field = $("#field").val();
//         const slots = $("#slots").val();
//         const qualification = $("#qualification").val();
//         const placement = $("#placement").val();
//         const salaryRange = $("input[name='salaryRange']:checked").val();
//         const jobDescription = $("#jobDescription").val();
//         const vacancyEndDate = $("#vacancyEndDate").val();

//         try {
//             // Post form data
//             const res = await axios.post('http://localhost:4001/api/v1/jobs/create', {
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
//             });
//             console.log(res.data.data)

//             if (res.data.status === 'success') {
//                 // Hide form and previous button
//                 $(".display_detail4").hide();
//                 $(".btn_prev1").hide();
//                 // Show success image and button
//                 $(".display_detail5").show();
//                 $(".btn_vacan1").show();
//             } else {
//                 // Handle error if submission fails
//                 console.error('Submission failed:', res.data.message);
//             }
//         } catch (error) {
//             // Handle error if request fails
//             console.error('Request failed:', error.message);
//         }
//     });
// });

// $(document).ready(function () {
//     $(".submit_btn").click(function () {
//         $(".display_detail4").hide();
//         $(".btn_prev1").hide();
//         $(".display_detail5").show();
//         $(".btn_vacan1").show();
//     });
// });
$(document).ready(function () {
    $(".btn_vacan1").click(function () {
        $(".display_detail5").hide();
        $(".btn_vacan1").hide();
        $(".display_detail1").show();
        $(".btn_next1").show();
        clickCount = 0;
    });
});