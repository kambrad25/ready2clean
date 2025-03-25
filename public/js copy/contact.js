const { log } = console;
const { documentElement } = document;

const navLightIcon = document.querySelector(".nav-light-icon");
const currDate = document.querySelector(".curr-date");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const daysLiTag = document.querySelector(".days");
let phoneInput = document.querySelector("#phone"),
    timeInput = document.querySelector("#time"),
    dateInput = document.querySelector("#date");
    zipCodeInput = document.querySelector("#zipcode"),
    servicesList = document.querySelectorAll(".choice"),
    submitBtn = document.querySelector(".submit-btn")
;

const menuBtn = document.querySelector(".nav-menu-btn");
const menuList = document.querySelector(".menu");
const exitBtn = document.querySelector(".exit");


var arrowController = document.querySelectorAll(".arrow-control");


document.addEventListener("DOMContentLoaded", (e) => contact(e))


function contact(evt) {
    const lenis = new Lenis();

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
    });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
    }

    raf();


    
    // TOGGLE DARK & LIGHT MODE
    function toggleDWMode() {
        const body = document.body;
        const docBody = document.documentElement;
        const headerContent = document.querySelector("header");
        const navHeaderList = [...document.querySelectorAll(".nav-links-desk > ul > li > a")];

        let darkMode = localStorage.getItem("darkMode");
        let contentArr = [body, docBody, headerContent, navLightIcon, document.querySelector(".nav-icons")];
        if (darkMode) {
            for (let i = 0; i < (contentArr.length); ++i) 
            {
                let content = contentArr[i];
                content.classList.add("d-dark-mode");

            }
        }
        navLightIcon.addEventListener("click", (E) => {
            contentArr.forEach((content) => {
                content.classList.toggle("d-dark-mode");
            })

            if (docBody.classList.contains("d-dark-mode")) {
                localStorage.setItem("darkMode", "true");
                navHeaderList.map((list) => (list.style.color = 'white', list.style.transition = 'color 250ms 250ms ease' ));

            } else {
                localStorage.removeItem("darkMode");
                navHeaderList.map((list) => (list.style.color = 'black', list.style.transition = 'color 250ms 250ms ease' ));
            }

        })
    }
    // PHONE FORMAT
    function formatPhoneNum (val) {
        if (!val) return val;
        const phoneNum = val.replace(/[^\d]/g, '');
        const phoneNumLen = phoneNum.length;
        if (phoneNumLen < 4) return phoneNum;
        if (phoneNumLen < 7) {
            return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3)}`;
        }
        return `(${phoneNum.slice(0, 3)}) ${phoneNum.slice(3, 6)}-${phoneNum.slice(6, 10)}`;
    }
   
    


    phoneInput.addEventListener("input", (e) => {
        let value = e.target.value;
        const formatInputVal = formatPhoneNum(value);
        e.target.value = formatInputVal;
    })

    

    function calendar() {
        let date = new Date();

        let currYear = date.getFullYear(),
            currMonth = date.getMonth();
        ;


        const months = ["January", "February", "March", "April", "May", 
            "June", "July", "August", "September", "October",
            "November", "December"]
            ;

       
        const render = () => {
            let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
            let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
            let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
            let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

            liTag = "";


            for (let i = firstDayOfMonth; i > 0; --i) {
                liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
            }

            for (let i = 1; i < lastDateOfMonth; ++i) {
                liTag += `<li>${i}</li>`
            }

            for (let i = lastDayOfMonth; i < 6; ++i) {
                liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`
            }

            currDate.innerText = `${months[currMonth]} ${currYear}`;
            daysLiTag.innerHTML = liTag;
        }


        function revealCalendar() {
            let date = dateInput;
            date.addEventListener("click", (e) => {
                let calendar = document.querySelector(".calendar");

                if (!calendar.classList.contains("reveal-calendar")) {
                    calendar.classList.add("reveal-calendar");

                    let cal = document.querySelector(".calendar");
                    let months = cal.children[0].getElementsByClassName("curr-month")[0];
                    let days = cal.children[3].querySelectorAll("li");
                
                    for (let i = 0; i < days.length; ++i) {
                        days[i].addEventListener("click", (E) => {
                            log(months.textContent);
                            cal.classList.remove("reveal-calendar")
                        })
                    }
                } else {
                    calendar.classList.remove("reveal-calendar");
                }
            })
        }


        render();
        revealCalendar();

        arrowController.forEach((chevron) => {
            chevron.addEventListener("click", (e) => {
                currMonth = chevron.id == "left" ? currMonth - 1 : currMonth + 1;

                if (currMonth < 0 || currMonth > 11) {
                    date = new Date(currYear, currMonth);
                    currYear = date.getFullYear();
                    currMonth = date.getMonth();

                }




                render();
            })
        })

    }


  


    function cal () {
        function setDate () {
            let date = document.querySelector("#date");
            if (!date || date == null) {
                return false;
            }
            return date;
        }

        function dateType(evt, min, val) {
            let d = new Date();

            let getDate = d.toLocaleDateString();
            let getDaysDate = getDate.split("/")[1];

            if (parseInt(getDaysDate) < 10) {
                getDaysDate = 0 + getDaysDate;
            }

            getDate = getDate.replace(getDate.split("/")[1], getDaysDate);

            getDate.split("/").join("-");

            evt.value = getDate;
            evt.addEventListener("click", (e) => {
                if (!evt.classList.contains("book")) {
                    evt.classList.add("book");
                    evt.setAttribute("type", "date");
                    evt.style.webkitAppearence = "none";

                    let setTypes = ["min", "value"];
                    
                    setTypes.forEach(type => {
                        switch (type) {
                            case "min": 
                                evt.setAttribute(type, min);
                                break;
                            case "value":
                                evt.setAttribute(type, val);
                                break;
                            default:
                                break;
                        }
                    })

                }



            })
        }

        const months = () => {
            return [
                'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
            ]
        }
        if (typeof setDate() === "object") {
            let date = new Date(),
            dateInput = document.querySelector("#date");

            var DATE = date.toDateString(),
            dateIndex = ""
            ;

            let monthStr = DATE.split(" ")[1];
            let monthIndex;

            let monthLen = months().length;
            for (let i = 0; i < monthLen;++i)
            {
                if (months()[i] === monthStr) {
                    monthIndex = (i + 1);
                }
            }

            DATE = DATE.replace(DATE.split(" ")[1], monthIndex);
            
            let splitDateStr = DATE.split(" ");

            dateIndex += `${splitDateStr[1]}-${splitDateStr[2]}-${splitDateStr[3]}`;

            

            dateInput.setAttribute("min", dateIndex);

            dateInput.value = dateIndex;


            dateType(dateInput);

        
        } else {
            log ("false time & date")
        }
        
    }

    cal();
 
    function formatZip (value) {
        let zipVal = value.replace(/\D/g, "");
        let zipLen = zipVal.length;

        if (zipLen > 5) {
            zipVal =  zipVal.slice(0, 5);
        }

        return zipVal;


    }
    zipCodeInput.addEventListener("input", (E) => {
        let val = E.target.value;
        let formatZipCode = formatZip(val);

        E.target.value = formatZipCode;
    })




    function filterServiceList () {
        let choices = servicesList;
        let choiceList = [];
        choices.forEach(choice => {
            let choiceInput = choice.querySelector("input");

            choiceInput.addEventListener("click", (e) => {
                    let choiceValue = choiceInput.nextElementSibling.textContent;
                    choiceList.push(choiceValue);

                    for (let i = 0; i < choiceList.length; ++i){
                        for (let j = (i + 1); j < choiceList.length; ++j) {
                            if (choiceList[i] == choiceList[j]) {
                                choiceList[i] = null;
                                choiceList[j] = null;
                            }
                        }
                    }
                     
            })
        }) 
         
       
        // return choiceList;
    }
    

    function revealMenuController(btn, list) {
        let targetStr = "reveal";
        list.classList.add(targetStr);

        document.body.style.overflow = "hidden";
        lenis.stop();


        let ml = gsap.timeline({
            ease: "power3.inOut"
        });

        if (list.classList.contains(targetStr)) {
            ml.to(".menu", 1, {
                height: "100%",
            })
            .to(".menu-header", .6, {
                scale: 1
            })
            .to (".menu-list > li", .6, {
                opacity: 1,
                stagger: {
                    amount: .6
                }
            })
            .to(".exit > h1", .3, {
                bottom: 0
            })
        } 

        exitBtn.addEventListener("click", (E) => {
            ml.reverse();
            document.body.style.overflow = "scroll";
            lenis.start();
        })


        window.addEventListener("resize", (e) => {
            let targetViewPort = "700";

            if (e.type == "resize") {
                if (window.innerWidth >= parseInt(targetViewPort)) {
                    list.classList.remove(targetStr);

                    document.body.style.overflow = "scroll";

                    ml.reverse();

                    lenis.start();
                }
            }
        })
    }

    function revealMenu(btn, list) {
        btn.addEventListener("click", (E) => {
            revealMenuController(btn, list);
        })
    }

    function exitMenu() {
        exitBtn.onclick = function() {
            menuList.classList.remove("reveal");
        }
    }

    function getElementsTop (ele) {
        typeof ele === "object" ? ele : null;

        let distance = 0;

        do {
            distance += ele.offsetTop;

            ele = ele.offsetParent;
            
        } while (ele);

        distance < 0 ? 0 : distance;

        return distance;
   }


    function animationReveal() {
        let nav = document.querySelector("nav"),
            navElements = nav.children;
        let subNav = document.querySelector(".sub-nav"), 
        subNavElements
        = subNav.querySelectorAll("h3");

        let navLeft = navElements[0].children;
        let navLogo = navElements[1];
        let heroHeader = document.querySelector(".hero-header"),
            heroHeaders = heroHeader.querySelector("h1"),
            heroHeaderInfo = document.querySelector(".hero-info"),
            heroHeaderInfoContent = heroHeaderInfo.querySelectorAll("h3");

    

        
        const al = gsap.timeline(
            {
                ease: "power3.inOut"
            }
        );


        if (al !== null) {
            al.to(navLeft[0], .1, {
                top: "0rem",
            })
            .to(navLeft[1], .1, {
                top: "0rem"
            })
            .to(navLogo, .8, {
                top: "0rem"
            })
            .to(".nav-menu-btn > h2", .01, {
                top: "0rem",
                ease: "power4.inOut"
            })
            .to (".nav-menu-btn", .1, {
                borderBottom: "2px solid",
                delay: .5
            })
        }

        gsap.to(subNav, 1, {
            width: "100%",
            ease: "power3.inOut",
        })

        subNavElements.forEach((ele, index, array) => {
            gsap.to(ele, 1,  {
                top: "0rem",
                delay: .2
            })
        })

        let heroTL = gsap.timeline(
            {
                ease: "power3.inOut"
            }
        );


        let dur = 0;
        for (let i = heroHeaderInfoContent.length; i >= 0; --i) {
            dur += .3
            gsap.to(heroHeaderInfoContent[i], 1, {
                top: "0rem",
                ease: "power3.inOut",
                delay: dur
            })
        }
        gsap.to(heroHeaders, 1, {
            top: "0rem",
            ease: "power3.inOut",
            delay: 1.5
        })



    

       
        // let b, m, 
      
    //    log (( window.innerHeight);

    
    

        let scrollEle = {
             nameEleTop: {
                element: document.querySelector(".name"),
                p: document.querySelector(".name > p"),
                input: document.querySelector(".name > input"),
                top: 0,
             }, emailEleTop: {
                element: document.querySelector(".email"),
                p: document.querySelector(".email > p"),
                input: document.querySelector(".email > input"),
                top: 0,
             }, phoneEleTop: {
                element: document.querySelector(".phone"),
                p: document.querySelector(".phone > p"),
                input: document.querySelector(".phone > input"),
                top: 0
             }, methodEleTop: {
                element: document.querySelector(".method"),
                p: document.querySelector(".method > p"),
                input: document.querySelector(".method > select"),
                top: 0
             }
        };
        

        for (const elem in scrollEle) {
            scrollEle[elem].top = getElementsTop(scrollEle[elem].element)
        }

        let scheduleEle = document.querySelector(".schedule");
        let scheduleEleH1 = scheduleEle.querySelector("h1");

        let scheduleEleH1Top = getElementsTop(scheduleEleH1);



        const planner = document.querySelector(".planner");
        let plannerChildren = planner.children;
    
        let services = document.querySelector(".services");
        let servicesTop = getElementsTop(services);

        let messageEle = document.querySelector(".message");
        let messageEleTop = getElementsTop(messageEle);

    


        window.addEventListener("scroll", (e) => {
            let y = window.scrollY;

            
            
            let distance = null;
            for (const elem in scrollEle) {
                distance = scrollEle[elem].top - y;

                if (distance < window.innerHeight) {
                    scrollEle[elem].input.style.width = "100%";
                    scrollEle[elem].p.style.opacity = 1;
                } 
                
                if (distance > window.innerHeight) {
                    scrollEle[elem].input.style.width = "0";
                    scrollEle[elem].p.style.opacity  = 0;
                }
            }


            let plannerChildrenLen = plannerChildren.length;

            for (let i = 0; i < plannerChildrenLen - 2; ++i) {
                let d = getElementsTop(plannerChildren[i]);

                
                let pTag = plannerChildren[i].querySelector("p");
                let inputTag = plannerChildren[i].querySelector("input");

                if ((d - y) < window.innerHeight) {
                    inputTag.style.width = "100%";
                    pTag.style.opacity = 1;
                }
                if ((d - y) > window.innerHeight) {
                    inputTag.style.width = "0";
                    pTag.style.opacity = 0;
                }
            }

            if ((scheduleEleH1Top - y) < window.innerHeight) {
                scheduleEleH1.style.left = "0rem";
            } else {
                scheduleEleH1.style.left = "-50rem";
            }

            (servicesTop - y) < window.innerHeight ? 
            services.style.opacity = 1 : services.style.opacity = 0 
            ;

            let messagePTag = messageEle.querySelector("p");
            let messageInputTag = messageEle.querySelector("textarea");

            if ((messageEleTop - y) < window.innerHeight) {

                messagePTag.style.opacity = 1;

                messageInputTag.style.width = "100%";
            } else {
                messagePTag.style.opacity = 0;

                messageInputTag.style.width = "0%";
            }
            
        })
    }

    function defaultStyle() {
        let form = document.querySelector("form");
        let formChildren = form.children;

        let schedule = document.querySelector(".schedule");
        let scheduleChildren = schedule.children;

        let scheduleH1 = scheduleChildren[0];

        let distanceFromTop = getElementsTop(form.offsetParent);
        
        let services = document.querySelector(".services");
        let servicesInfo = document.querySelector(".services-info");
        let messageInfo = document.querySelector(".message");
        let messageChildren = messageInfo.children;

        
        let { pageYOffset, scrollY, innerHeight } = window;


        let pushScheduleInput = [], scheduleInput;
        if ((distanceFromTop - pageYOffset || scrollY) < innerHeight ) {
            for (let i = 0; i < formChildren.length; ++i) {

                let pTag = formChildren[i].querySelector("p"),
                     inputTag = formChildren[i].querySelector("input"),
                     selectTag = formChildren[i].querySelector("select")
                ;
                // if (pTag == null) pTag = 0;

                
            
                pTag == null ? 0 : pTag.style.opacity = 1;
                selectTag == null ? 0 : selectTag.style.width = "100%";
                inputTag == null ? 0 : inputTag.style.width = "100%";

                let schedulePTag = scheduleChildren[1].children[i].querySelector("p");
                let scheduleInputTag = scheduleChildren[1].children[i].querySelector("input");

                servicesInfo.style.opacity = services.style.opacity = 1;

                // servicesInfo.querySelector(".choice").querySelector("input").style.width = "20px";
                

                schedulePTag.style.opacity = 1;

                // scheduleInputTag == null ? 0 : scheduleInputTag.style.width = "100%";
                pushScheduleInput.push(scheduleInputTag);
            }

            // pushScheduleInput.push(scheduleInput);
            pushScheduleInput.splice(0, 4).map((input) => input == null ? 0 : input.style.width = "100%");
        }

        scheduleH1.style.left = "0rem";

        messageChildren[0].style.opacity = 1;
        messageChildren[1].style.width = "100%";


        
    }

    function inputController() {
        let form = document.querySelector("form");
        let formChildren = form.children;
        let scheduleFormPlanner = document.querySelector(".planner");
        let scheduleFormPlannerChildren = scheduleFormPlanner.children;

        const cityInput = document.querySelector(".city > input");
        const stateInput = document.querySelector(".state > input");

        
        let inputField = document.querySelectorAll("input");

        let selectField = document.querySelectorAll("select");

        let dateField = document.querySelector(".date > input");

        let selectInput = null;

        let errorList = [];

        for (let i = 0; i < inputField.length; ++i) {
            inputField[i].addEventListener("input", (e) => {
                let fname = inputField[i].classList.contains("name");
                let email = inputField[i].classList.contains("email");
                let phone = inputField[i].classList.contains("phone");

                if (fname) {
                    fname = document.querySelector(".name > input");

                    if (!fname.value || fname.value.length <= 0) {
                        fname.style.border = "1px solid red";
                        errorList.push("name is required.")
                    } else {
                        fname.style.border = "none";
                    }

                }

                if (email) {
                    email = document.querySelector(".email > input");

                    if (!email || email.value.length <= 0) {
                        email.style.border = "1px solid red";
                        errorList.push("email is required.")
                    } else {
                        email.style.border = "none";
                    }
                }

                if (phone) {
                    phone = document.querySelector(".phone > input");
                    
                    if (!phone || phone.value.length <= 0) {
                        phone.style.border = "1px solid red";
                        errorList.push("phone is required.")
                    } else {
                        phone.style.border = "none";
                    }
                }                
            })
        }

        selectField[0].addEventListener("click", (e) => {
            selectInput = e.target.value;

            if (typeof selectInput === "string") {
                selectInput = selectInput;
            }

            if (selectInput == "Phone" || selectInput == "Email") {
                selectField[0].style.border = "none";
            } else {
                log ("method type is not defined.");
                selectField[0].style.border = "none";
            }
        })

        const date = new Date();

        let dateStr = "";        



        let str = new Date(2024, 12 - 1, 16);
        let a = "2024-12-16";

        (Number.parseInt(a.split("-")[2]));


        
        timeInput.addEventListener("input", (e) => {
            let val = e.target.value;

            if (val.length <= 0 || val == "") {
                timeInput.style.border = "1px solid red";
            } else {
                timeInput.style.border = "none";
            }
        })


        let addressInput = document.querySelector("#address");
        function initMap() {
            const options = {
                componentRestrictions: { country: "us" },
                fields: ["address_components", "geometry", "icon", "name"],
                strictBounds: false,
            };
            // const autocomplete = new google.maps.places.Autocomplete(addressInput, options);
        }
        initMap()
        
        function appendAddressErrorStr() {
        let addressErrorStr = ["We are located in SC only."];
        return addressErrorStr;
    }


    let addressClickCounter = 0;
    addressInput.addEventListener("click", (e) => {
        addressClickCounter = addressClickCounter + 1;

        log (addressClickCounter);

        let parentEle = e.target.parentElement,
            newEle = document.createElement("span")
        ;
        if (typeof addressClickCounter === "number" &&
            addressClickCounter == 1 ) {
                addressClickCounter = 2;
                newEle.classList.add("address-error");
                newEle.innerHTML = appendAddressErrorStr()[0];
                parentEle.appendChild(newEle);
            }


    })
    addressInput.addEventListener("input", (e) => {
        let target = e.target;
        let val = e.target.value;
        let len = val.length;
        let parentEle = e.target.parentElement;

        let addressErrorEle = document.querySelector(".address-error");


        if (len <= 0) {
            addressClickCounter = 0;
            parentEle.removeChild(addressErrorEle);
            
            target.style.border = "1px solid red";
            // addressErrorEle.style.display = "none";
        } else {
            target.style.border = "none";
        }
    })


    const zipCodeInput = document.querySelector("#zipcode");
    zipCodeInput.addEventListener("input", async (e) => {
        let target = e.target;
        let val = e.target.value;
        let len = val.length;
        if (len <= 0) {
            target.style.border = "1px solid red";
        } else {
            target.style.border = "none";
        }
    })
    // addressInput.removeChild("")


    let zipcodeData = async function() {

        let obj = [];
        // let reader = new FileReader();

        
        // let data = await fetch("zip.json", {
        //     method: "GET",
        //     headers: { 
        //         "Content-Type": "application/json"
        //     }
        // })

        // let result = await data.json();

        // for (const i in result) {
        //     let value = Object.values(result[i]);
        //     value.forEach(val => obj.push(val));
        // }
        
        zipCodeInput.addEventListener("input", (e) => {
            let val = e.target.value,
                len = val.length,
                target = e.target
            ;
            if (len >= 5) {
                for (let i =0; i< obj.length; ++i) {
                    if (val !== obj[i]) 
                    {
                        target.style.border = "1px solid red";
                    }
                }

                obj.forEach((value, index, array) => {
                    if (val == array[index]) {
                        target.style.border = "none";
                    }
                })
            }
        })
    }

    let objLocation = {
        city: document.querySelector(".city > input"),
    }

    function locationErrorField (_Elem) {
        let parentEle = _Elem.parentElement;

        let locationErrorTag = document.createElement("span");
        locationErrorTag.className = "city_error_tag";


        _Elem.addEventListener("input", (e) => {
            let val = e.target.value;
            let locationErrorMsg = "Florence, Sumter, Conway, Myrtle Beach, or Columbia";
          
            locationErrorTag.innerText = locationErrorMsg;
            locationErrorTag.style.color = "red";
            
            if (val == "" || val.length <= 0) {
                _Elem.style.border = "1px solid red";
            } else {
                _Elem.style.border = "none";

                parentEle.appendChild(locationErrorTag);
            }
        })

        _Elem.addEventListener("focusout", (e) => {
            let val = e.target.value.toLowerCase();
            if (val !== "Florence".toLowerCase() && val !== "Sumter".toLowerCase() && val !== "Conway".toLowerCase() 
            && val !== "Myrtle Beach".toLowerCase() && val !== "Columbia".toLowerCase()) {
                _Elem.style.border = "1px solid red";
                log ("incorrect")
            }else {
                _Elem.style.border = "none";
                parentEle.removeChild(locationErrorTag);
            }
        })

    }
    function locationCityAndStateField()  {
        let city = this.city;
        let state = this.state;

        window.addEventListener("scroll", (e) => {
            let ifDest = (Math.abs(city.offsetTop - window.pageYOffset) >= window.innerHeight);
            let cityParent = city.parentElement;

            if (ifDest) {
                cityParent.style.width = "100%";
            } else {
                cityParent.style.width = "0%";
            }
        })

        locationErrorField(city);
    }

    let bindLocationField = locationCityAndStateField.bind(objLocation);

    bindLocationField();
    
    zipcodeData()
    }



    toggleDWMode();
    inputController();
    defaultStyle()
    animationReveal();

    revealMenu(menuBtn, menuList);
    exitMenu();



    let choiceList = filterServiceList();
    
    let Form = document.querySelector("form");


    Form.onsubmit = async function() {
        let submitBtn = document.querySelector("#submit-btn");

        let uri = "https://localhost:4000/contact";
        let data = await fetch(uri, {
            method: "POST",
            headers: { "Content-Type": "text/html" }
        })

        let response = await data;
        if (response.ok) {
            submitBtn.style.disabled  = true;
        } else {
            submitBtn.style.disabled = false;
        }
    }
    // Form.onsubmit = async function(e) {
    //     e.preventDefault();

    //     log (document.querySelector("#services"));
        
        
    //     const URL = "http://localhost:4000/contact";

    //     let name = document.querySelector("#name").value;
    //     let email = document.querySelector("#email").value;
    //     let phone = document.querySelector("#phone").value;
    //     let method = document.querySelector("#method").value;
    //     let date = document.querySelector("#date").value;
    //     let time = document.querySelector("#time").value;
    //     let address = document.querySelector("#address").value;
    //     let zipcode = document.querySelector("#zipcode").value;
    //     let message = document.querySelector("#message").value;

    //     try {
    //     const options = { 
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(
    //             {
    //                 fullname: name,
    //                 email,
    //                 phone,
    //                 method,
    //                 date,
    //                 time,
    //                 address,
    //                 zipcode,
    //                 message
    //             }
    //         )
    //     }

    //     let data = await fetch(URL, options);

    //     let response= await data.ok;
    //     if (!response) {
    //         log ("false");
    //     } else {
    //         log ("true");
    //     }
    // } catch (error) {
    //     log (error.message);
    // }


    // }
}



