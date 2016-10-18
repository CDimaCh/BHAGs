$(document).ready(function () {
    var
        countriesList = [],
        container = $('#output'),
        handleAlphabetClick = function () {
            $('.letter').on('click', function (e) {
                e.preventDefault();
                $('#searchCountries').val("");
                container.html("");

                var letter = $(this).data('letter');

                if (countriesList.length == 0)
                    getJsonArray();

                $.each(countriesList,
                    function (index, value) {
                        if (value.name.charAt(0).toUpperCase() == letter.toUpperCase()) 
                            container.append($("<a>", { href: "#", html: value.name, class: 'country', id: value.id }));
                        });
                handleCountryClick();
            });
        },
    handleSearch = function () {
        $('#search').on('click', function (e) {
            e.preventDefault();
            var term = $('#searchCountries').val();
            if (term == "") return;

            container.html("");
            if (countriesList.length == 0)
                getJsonArray();

            $.each(countriesList,
                function (index, value) {
                    if (value.name.toUpperCase().indexOf(term.toUpperCase()) != -1) 
                        container.append($("<a>", { href: "#", html: value.name, class: 'country', id: value.id }));
                });
           handleCountryClick();

        });
    },
    renderAlphabet = function () {
        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        $.each(alphabet, function (i, value) {
            $('#alphabet').append($("<div>", { class: "inlineletter" }).append($("<a>", { href: "#", html: value, "data-letter": value, class: "letter" })));
        });

        handleAlphabetClick();
        handleSearch();
    },
    getJsonArray = function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            async: false,
            url: "js/countries.json",
            success: function (data) {
                countriesList = data.countries;
            }
        });
    },
    handleCountryClick = function () {
        $('.country').on('click', function (e) {
            e.preventDefault();
            var id = $(this).attr('id');
            $.ajax({
                type: 'GET',
                data: id,
                async: false,
                url: "js/countries.json",
                success: function (data) { }
            });
            document.cookie = "countryId=" + id;
        });
    },
    searchListener = function () {
        $('#searchCountries').on('keypress', function (e) {
            if (e.keyCode == 13) {
                $('#search').click();
            }
        });
    };
    
    searchListener();
    renderAlphabet();
});