var library;
function description(i){
    var fpath = "../upload/";
    $("#cardblock").hide();
    $("#carddesc").html("");
        $("#carddesc").append('<div class="card mb-3" style="max-width: 100%; margin-top: 50px;min-height: 500px;">' +
            '<div class="row no-gutters">' +
            '<div class="col-md-4">' +
            '<img src="' + fpath + library.books[i].file + '" class="card-img" alt="...">' +
            '</div>' +
            '<div class="col-md-8">' +
            '<div class="card-body">' +
            '<h5 class="card-title" style="font-size: 32px;">' + library.books[i].name + '</h5>' +
            "<p id='crdauth' class='crdauth' style='font-size: 20px;'>By " + library.books[i].author + "</p>" +
            "<p class='cardcategory' id='cardcategory' style='font-size: 17px;'>" + library.books[i].category + "</p>" +
            "<p id='crdyear' class='crdyear'  style=''>" + library.books[i].publishedyear + "</p>" +
            '<p class="card-text" style="font-size: 20px;">' + library.books[i].description + '</p><br>' +
            "<h4 id='money' class='money'>&#8377;" + library.books[i].cost + "</h4>" +
            "<div class='buy'>" +
            "<form action='/buy' method='POST'>" +
            "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
            "</form>" +
            "</div>" +
            '<a href="/"><input type="button" id="descback" class="btn btn-primary btn-sm" onclick="$("#cardblock").show();" value="Back"></a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
}
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8081/all",
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            library = data;
            console.log("success");
            ses = data.inSession;
            if (ses.login == 1) {
                $('#waylogin').hide();
                $('#waylogout').show();
                $('#addbypass').show();
            } else {
                $('#waylogin').show();
                $('#waylogout').hide();
                $('#addbypass').hide();
            }

            var fpath = "../upload/";
            for (var i = 0; i <= data.books.length; i++) {
                $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                    "<img src='" + fpath + data.books[i].file + "' id='crdimg' class='card-img-top crdimg' >" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+i+")'>" + data.books[i].name + "</a></h5>" +
                    "<p class='cardcategory' id='cardcategory'>" + data.books[i].category + "</p>" +
                    "<p id='crdauth' class='crdauth'>" + data.books[i].author + "</p>" +
                    "<p id='crdyear' class='crdyear'>" + data.books[i].publishedyear + "</p>" +
                    "<div class='rating'>" +
                    "<span class='score'>" +
                    "<div class='score-wrap'>" +
                    "<span class='stars-active' style='width:50%'>" +
                    "<i class='fa fa-star' aria-hidden='true'></i>" +
                    "<i class='fa fa-star' aria-hidden='true'></i>" +
                    "<i class='fa fa-star' aria-hidden='true'></i>" +
                    "<i class='fa fa-star' aria-hidden='true'></i>" +
                    "<i class='fa fa-star' aria-hidden='true'></i>" +
                    "</span>" +
                    "<span class='stars-inactive'>" +
                    "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                    "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                    "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                    "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                    "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                    "</span>" +
                    "</div>" +
                    "</span>" +
                    "</div>" +
                    "<h4 id='money' class='money'>&#8377;" + data.books[i].cost + "</h4>" +
                    "<div class='buy'>" +
                    "<form action='/buy' method='POST'>" +
                    "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                    "</form>" +
                    "</div>" +
                    "</div>" +
                    "</div>");
            }

        },
        type: "GET"
    })

$("#gosearch").click(function() {
  var typing = $("#search").val();
  var typed = typing.toLowerCase();
    $.ajax({
        url: "http://localhost:8081/query/"+typed,
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var i = 0; i <= data.books.length; i++) {
                        $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                            "<img src='" + fpath + data.books[i].file + "' id='crdimg' class='card-img-top crdimg' >" +
                            "<div class='card-body'>" +
                            "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+i+")'>" + data.books[i].name + "</a></h5>" +
                            "<p class='cardcategory' id='cardcategory'>" + data.books[i].category + "</p>" +
                            "<p id='crdauth' class='crdauth'>" + data.books[i].author + "</p>" +
                            "<p id='crdyear' class='crdyear'>" + data.books[i].publishedyear + "</p>" +
                            "<div class='rating'>" +
                            "<span class='score'>" +
                            "<div class='score-wrap'>" +
                            "<span class='stars-active' style='width:50%'>" +
                            "<i class='fa fa-star' aria-hidden='true'></i>" +
                            "<i class='fa fa-star' aria-hidden='true'></i>" +
                            "<i class='fa fa-star' aria-hidden='true'></i>" +
                            "<i class='fa fa-star' aria-hidden='true'></i>" +
                            "<i class='fa fa-star' aria-hidden='true'></i>" +
                            "</span>" +
                            "<span class='stars-inactive'>" +
                            "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                            "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                            "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                            "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                            "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                            "</span>" +
                            "</div>" +
                            "</span>" +
                            "</div>" +
                            "<h4 id='money' class='money'>&#8377;" + data.books[i].cost + "</h4>" +
                            "<div class='buy'>" +
                            "<form action='/buy' method='POST'>" +
                            "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                            "</form>" +
                            "</div>" +
                            "</div>" +
                            "</div>");
                }
        },
        type: "GET"
    })
    
    });

$("#freebk").click(function() {
    $.ajax({
        url: "http://localhost:8081/free",
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
});
$("#fic").click(function() {
  // var catgry = "Fiction";
    $.ajax({
        url: "http://localhost:8081/catfic",
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");
                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
});

$("#nonfic").click(function() {
  // var catgry = "Non-Fiction";
    $.ajax({
        url: "http://localhost:8081/catnfic",
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
});
$("#mem").click(function() {
  var catgry = "Memoir";
    $.ajax({
        url: "http://localhost:8081/allcat/"+catgry,
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
});

$("#sci").click(function() {
  var catgry = "Popular Science";
    $.ajax({
        url: "http://localhost:8081/allcat/"+catgry,
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
  });
$("#abio").click(function() {
  var catgry = "Autobiography";
    $.ajax({
        url: "http://localhost:8081/allcat/"+catgry,
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
});
$("#bio").click(function() {
  // var catgry = "Biography";
    $.ajax({
        url: "http://localhost:8081/catbio",
        data: {
            format: "JSON"
        },
        error: function() {
            console.log("Error")
        },
        success: function(data) {
            console.log("success");

                $("#cardblock").html("");
                $("#carddesc").html("");
                var fpath = "../upload/";
                for (var j = 0; j <= data.books.length; j++) {
                    $("#cardblock").append("<div class='card col-lg-3 col-md-4 col-sm-6 col-xs-12 cardblock'>" +
                        "<img src='" + fpath + data.books[j].file + "' id='crdimg' class='card-img-top crdimg' >" +
                        "<div class='card-body'>" +
                        "<h5 class='card-title crdttl' id='crdttl'><a href='#' onclick='description("+j+")'>" + data.books[j].name + "</a></h5>" +
                        "<p class='cardcategory' id='cardcategory'>" + data.books[j].category + "</p>" +
                        "<p id='crdauth' class='crdauth'>" + data.books[j].author + "</p>" +
                        "<p id='crdyear' class='crdyear'>" + data.books[j].publishedyear + "</p>" +
                        "<div class='rating'>" +
                        "<span class='score'>" +
                        "<div class='score-wrap'>" +
                        "<span class='stars-active' style='width:50%'>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "<i class='fa fa-star' aria-hidden='true'></i>" +
                        "</span>" +
                        "<span class='stars-inactive'>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "<i class='fa fa-star-o' aria-hidden='true'></i>" +
                        "</span>" +
                        "</div>" +
                        "</span>" +
                        "</div>" +
                        "<h4 id='money' class='money'>&#8377;" + data.books[j].cost + "</h4>" +
                        "<div class='buy'>" +
                        "<form action='/buy' method='POST'>" +
                        "<input type='submit' class='btn btn-primary subbuy' value='Buy'>" +
                        "</form>" +
                        "</div>" +
                        "</div>" +
                        "</div>");

                }

        },
        type: "GET"
    })
});
});
