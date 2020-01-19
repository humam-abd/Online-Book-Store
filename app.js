var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlParser = bodyParser.urlencoded({ extended: false });
var path = require("path");
var session = require("express-session");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/db");
var fs = require("fs");
var multer = require("multer");
var time = new Date(1576916839);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: 'keyword' }));

var count = 0;
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/upload");
    },
    filename: function(req, file, callback) {
        callback(null, "File(" + (count++) + ")" + time.getMinutes() + "_" + time.getSeconds() + "_" + time.getMilliseconds() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage }).single("filebk");

var books = mongoose.Schema({
    name: String,
    category: String,
    author: String,
    description: String,
    publishedyear: Number,
    cost: String,
    file: String
});

var book = mongoose.model("Book", books);

app.post("/done", urlParser, function(req, res) {
    // if (req.body.namebk != null) {
    upload(req, res, function(err) {
        if (err) {
            res.send("File not found");
        }
        res.redirect("/addbook");
        console.log("File Uploaded");
        var f = req.file.filename;
        console.log(f);

        var obj = new book({
            name: req.body.namebk,
            category: req.body.catbk,
            author: req.body.authbk,
            description: req.body.descbk,
            publishedyear: req.body.pubbk,
            cost: req.body.cstbk,
            file: f
        });
        obj.save(function(err, booked) {
            if (err) {
                console.error(err);
            }
            console.log(booked);
        });
    });
    // } else {
    //     res.redirect("/add");
    //     console.log("Error adding book");
    // }
})
app.get("/done", function(req, res) {
    res.send("Not Done");
})



app.get("/", function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})
app.get("/adlogin", function(req, res) {
    res.sendFile(__dirname + "/" + "adlogin.html");
})

app.get("/addbook", function(req, res) {
    ses = req.session;
    if (ses.login == 1) {
        res.sendFile(__dirname + "/" + "addbook.html");
    } else {
        res.redirect("/adlogin");
    }
})
app.post("/addbook", function(req, res) {
    if (req.body.username == "admin" && req.body.password == "admin") {
        ses = req.session;
        ses.login = 1;
        res.redirect("/addbook");
    } else {
        res.redirect("/adlogin");
    }
})
app.get("/logout", function(req, res) {
    ses = req.session;
    ses.login = 0;
    res.redirect("/");
})
app.get("/add", function(req, res) {
    ses = req.session;
    if (ses.login == 1) {
        res.sendFile(__dirname + "/" + "add.html");
    } else {
        res.redirect("/adlogin");
    }
})
app.post("/buy", function(req, res) {
    res.sendFile(__dirname + "/" + "buy.html");
})
app.post("/add", function(req, res) {
    res.sendFile(__dirname + "/" + "add.html");
})
app.get('/all', function(req, res) {
    book.find({}, function(err, result) {
        let data = {
            books: result,
            inSession: req.session
        };
        res.send(data);
    });
});

app.get("/query/:namebk", function(req, res) {
    book.find({ $or: [{ name: { $regex: req.params.namebk, $options: 'i' } }, { category: { $regex: req.params.namebk, $options: 'i' } }] }, function(err, result) {
        if (err) {
            console.log("Error");
        }
        let data = {
            books: result
        };
        res.send(data);
    });
})

app.get("/free", function(req, res) {
    book.find({ cost: 'Free' }, function(err, result) {
        let data = {
            books: result
        };
        res.send(data);
    });
})

app.get("/allcat/:catbk", function(req, res) {
    book.find({ category: { $regex: req.params.catbk, $options: 'i' } }, function(err, result) {
        let data = {
            books: result
        };
        res.send(data);
    });
})

app.get("/catfic", function(req, res) {
    book.find({ category: "Fiction" }, function(err, result) {
        let data = {
            books: result
        };
        res.send(data);
    });
})
app.get("/catnfic", function(req, res) {
    book.find({ category: "Non-Fiction" }, function(err, result) {
        let data = {
            books: result
        };
        res.send(data);
    });
})
app.get("/catbio", function(req, res) {
    book.find({ category: "Biography" }, function(err, result) {
        let data = {
            books: result
        };
        res.send(data);
    });
})
var server = app.listen(8081, function() {
    console.log("Node server is running...");
})