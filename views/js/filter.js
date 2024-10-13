$(document).ready(function () {
    function filterJobsByLocation() {
        var checkedLocations = [];
        $(".check:checked").each(function () {
            checkedLocations.push($(this).val());
        });

        $(".joblist").show();

        if (checkedLocations.length > 0) {
            $(".joblist").each(function () {
                var location = $(this).find(".location").text().trim();
                if (!checkedLocations.includes(location)) {
                    $(this).hide();
                }
            });
        }
    }

    $(".check").change(function () {
        filterJobsByLocation();
    });
});

$(document).ready(function () {
    function filterJobsByLocation() {
        var checkedLocations = [];
        $(".check1:checked").each(function () {
            checkedLocations.push($(this).val());
        });

        $(".joblist").show();

        if (checkedLocations.length > 0) {
            $(".joblist").each(function () {
                var location = $(this).find(".job-length").text().trim();
                if (!checkedLocations.includes(location)) {
                    $(this).hide();
                }
            });
        }
    }

    $(".check1").change(function () {
        filterJobsByLocation();
    });
});


$(document).ready(function () {
    $('.content_for_search').on('input', function () {
        const inputValue = $(this).val().toLowerCase().trim();

        $('.joblist').each(function () {
            const jobTitleAndAgency = $(this).find('.job-title, .agency').text().toLowerCase();

            // Check if any word in .job-title or .agency is similar to .content_for_search
            if (jobTitleAndAgency.includes(inputValue)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});