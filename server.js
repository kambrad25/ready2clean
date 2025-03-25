"use strict";

const { log, assert, error } = console;


const express = require("express");
const app = express();

const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const sessions = require("express-session");
const client = require("./Models/Client");
const nodeMailer = require("nodemailer");
require("dotenv").config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser(process.env.secret, {
    path: "/",
    secure: process.env.NODE_ENV == "production",
    httpOnly: process.env.NODE_ENV == "production",
    sameSite: process.env.NODE_ENV == "production" ? "strict" : "none"

}));



app.use(cors(
    {
        origin: "http://localhost:4000",
        methods: ["POST", "GET"],
        optionsSuccessStatus: 204
    }
));



app.use(sessions(
    {
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
    }
))


// app.use(express.static(path.join(__dirname, "../"), { extensions: ['html']}));
// app.use(express.static(path.join(__dirname, "/"), { extensions: ['html']}));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

const connDatabase = (async () => {
    const { connect } = mongoose;
    const result = await connect(typeof process.env.MONGO_DB_USER == "string" ? process.env.MONGO_DB_USER : 
        process.env.MONGO_DB_USER.toString()
    )

    if (!result) throw new Error("database error | database not connected.");

    return result;
})();

connDatabase.then(() => log ("Mongoose Connected")).catch((err) => log (err.message));

const contactMiddleware = (req, res, next) => {
    log ("this is contact page");
    next();
}


function setXFrameOptions (req, res, next) {
    let Headers = "X-Frame-Options SAMEORIGIN";

    Headers = Headers.split(" ");
    res.setHeader(Headers[0], Headers[1]);
    next();
}




function errorHandler(req, res, next) {    
    res.status(404).render("./errors/404");
}

app.get("/", setXFrameOptions, (req, res) => {
    res.status(200).contentType("html").render("index")
})
app.get("/about", setXFrameOptions, (req, res) => {
    res.status(200).contentType("html").render("about");
})
app.get("/gallery", setXFrameOptions, (req, res) => {
    res.status(200).contentType("html").render("gallery");
})


app.get("/contact", setXFrameOptions, contactMiddleware, (req,res) => {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");

        return res.status(200).render("contact", { errors: "" });
})

app.get("/success", (req, res) => {
    if (!req.session.success || req.session.success !== "true") {
        return res.redirect("/contact");
    } else {
        return res.status(200).render("success");
    }
})

app.get("/error", (req, res) => {
    throw new Error("Error");
})


async function mailer (__name__, __email__, __date__, __time__) {
    let htmlMailTemplate = 
        `
        <!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
            <style>
                @font-face {
                    font-family: "Playwrite AU SA", serif;
                    src: url('https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap');
                }

                @font-face {
                    font-family: "Playfair Display", serif;
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+AU+SA:wght@100..400&display=swap');
                }
                html {
                    height: 100%;
                    }
                    body {
                        background-color: #c82705;
                        min-height: 100%;
                    }
                    body::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: black;
                        opacity: 0.6
                    }
                    h1 {
                       align-content: center;
                       font-size: 16px;
                        }
                    }
                </style>
            </head>
            <body style="background-image: url('https://cdn.pixabay.com/photo/2024/06/22/18/15/leaves-8846763_1280.jpg'); height: 600px;">
                <nav>
                    <div style="
                    display: flex;
                    align-items: center;
                    height: 180px;
                    line-height: 1.1;
                    font-family: Arial;">
                        <h1 style="color: white; text-align: center;
                        align-content: center;
                        font-family: serif;
                        width: max-content;
                        margin: auto;
                        min-width: 10rem;
                        font-size: 2.8rem;
                        text-transform: uppercase;
                        ">Ready2Clean</h1>                      
                    </div>
                </nav>
                <div class="main">
                    <h2 style="color: white;
                        font-size: 1rem;
                        text-align: center;
                        font-weight:100;height:70px;width:300px; margin:auto;">
                        Hey ${__name__}, we received your request & will get back with you shortly! 
                    </h2>
                    <div style="background-color: white;max-width:300px;margin:auto;padding:1rem">
                        <h1 style='font-size:16px;'>Name: ${__name__}</h1>
                        <h1 style='font-size:16px;'>Email: ${__email__}</h1>
                        <h1 style='font-size:16px;'>Date: ${__date__}</h1>
                        <h1 style='font-size:16px;'>Time: ${__time__}</h1>

                    </div>
                    <div style="height: 300px;
                        color: white;
                        padding: 1rem 2rem;
                        margin-top: 65px;
                        " class="footer">
                            <p>843-864-3952</p>
                            <p>ready2cleancleaningservicesLLC@gmail.com</p>
                        
                    </div>
                </div>
            </body>
        </html>
        `
    let clientMail = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 25,
        secure: false,
        auth: {
            user: "kamronbrad20@gmail.com",
            pass: "wgrd myos dlyo wtfc"
        }
    })
    
    clientMail = await clientMail.sendMail({
        from: "kamronbrad20@gmail.com",
        to: __email__,
        subject: "Ready2Clean Notification",
        html: htmlMailTemplate
    })
}
// validate email input

function isEmailValid(email) {
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!email || email.length > 254) return false;
    if (!emailRegex.test(email)) return false;
    const parts = email.split("@");
    if (parts[0].length > 64) return false;
    const domainParts = parts[1].split(".");
    if (domainParts.some(part => part.length > 63)) return false;
    return true;
}

function isNameValid(name) {
    const nameRegex = /[!@#$%^&*()-=+_`?\/><":;\[\]|]/g;
    if (!name) return false;
    if (typeof name != "string") return false;
    name = name.trim().trimStart().trimEnd().toString(); 
    let match = name.match(nameRegex);
    if (match) return false; 
    return true;
}


function getValidCity (city) {
    return city;
}
let validCity;
function isCityValid(city) {
    let isTrue;
    const cityRegex = /[!@#$%^&*()-=+_`?\/><"':;\[\]|]/g;
    if (!city) return false;
    if (typeof city != "string") return false;
    city = city.trim().trimStart().trimEnd().toString();
    let match = city.match(cityRegex);
    if (match) {
        return false;
    } else {

        let listedCities = ["Florence", "Conway", "Sumter", "Myrtle Beach", "Columbia"];
        
        city = city.toLowerCase();

        listedCities.forEach((lcity) => {
            if (city === lcity.toLowerCase()) {
                validCity = getValidCity(lcity);
                isTrue = true;
            }
        })

        if (isTrue == null || isTrue == undefined) {
            isTrue = false;
        }

    }
    return isTrue;
} 





app.post("/contact", setXFrameOptions, async (req, res) => {
    try {
        let setHeadersForError = "Cache-Control max-age=0,no-cache,no-store,must-revalidate";
        setHeadersForError = setHeadersForError.split(" ");

        let appointmentType;

        var { fullname, 
            email, 
            phone, 
            method, 
            date, 
            city,
            state,
            address,
        zipcode, message} = req.body;

        let errors = [];



        if (!fullname || !email || !phone || !method || !date || !city || !address || !zipcode) {
            errors.push("All Fields Are Required.");
            res.setHeader(setHeadersForError[0], setHeadersForError[1]);
            return res.status(400).render("contact", { errors: errors});
        }
        if (!isEmailValid(email)) {
            errors.push("The email provided is not valid.");
            res.setHeader(setHeadersForError[0], setHeadersForError[1]);
            return res.status(400).render("contact", { errors: errors });
        }

        if (!isNameValid(fullname)) {
            errors.push("The name provided is not valid.");
            res.setHeader(setHeadersForError[0], setHeadersForError[1]);
            return res.status(400).render("contact", { errors: errors });            
        }

        if (!isCityValid(city)) {
            errors.push("We do not provide services in the requested area.");
            res.setHeader(setHeadersForError[0], setHeadersForError[1]);
            return res.status(400).render("contact", { errors: errors })
        }

        if (state != "South Carolina") {
            errors.push("We are located in South Carolina only.");
            return res.status(400).render("contact", { errors: errors });
        }
        

        var time = req.body.time;
        var options =req.body.service;
        let service = [];
        
        let timeIndexOne = time.slice(0,2);
        let timeIndexTwo = time.slice(2);

        let timeMeridian = "AM";
        if (parseInt(timeIndexOne) > 12) {
            timeMeridian = "PM";

            let convertTime = parseInt(timeIndexOne) - 12;
            timeIndexOne = convertTime;
        }

        time = `${timeIndexOne.toString()}${timeIndexTwo} ${timeMeridian}`;

        for (let i = 0; i < options.length; ++i) {
            if (options[i] == 'on') {
                service.push(options[i + 1]);
            }
        }

        message = message.trimStart().trimEnd();

        let obj = {name: fullname,email:email,phone:phone,method:method,date:date,time:time,city:city,state:state,address:address,zipcode:zipcode,services:service,message:message};
       
        if (service.length <= 0 && message.length > 0) {
            appointmentType = "message"
        } else if (service.length > 0 && message.length > 0) {
            appointmentType = "service";
        } else {
            appointmentType = "service";
        }


        city = validCity;

        const newUser = await new client(
           {
            name: obj.name,
            email: obj.email,
            phone: obj.phone,
            method: obj.method,
            date: obj.date,
            time: obj.time,
            city: validCity,
            state: obj.state,
            address: obj.address,
            zipcode: obj.zipcode,
            services: obj.services,
            message: obj.message,
            appointmentType: appointmentType
           }
        )

        if (newUser !== null) {

            await newUser.save();

            await mailer(newUser.name, newUser.email, newUser.date, newUser.time).then().catch((err) => {
                throw err;
            })

        
            req.session.success = "true";
            req.session.cookie.maxAge = 1000;


            log (newUser);
           return res.status(200).redirect("/success")

        }       
    } catch (error) {
        throw new Error("Post error: " + error.message )
    }
})



app.use(errorHandler);


// app.use((err, req, res, next) => {
//     const { message } = err;
//     err.status = res.statusCode;
//     if (err.status !== undefined || err.status == null) {
//         res.statusCode = 500;
//         let status = res.statusCode;
//         res.status(status).contentType("html").render("./errors/500", { code: status.toString() });
//         log (message)
//     }
// })



const PORT = 4000;
app.listen(PORT, () => {
    log (`Listening On Port ${PORT}`);
})



