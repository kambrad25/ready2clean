const  { log } = console;

const { documentElement } = document;

const galleryImg = document.querySelectorAll(".gal");
const reachUsHeader = document.querySelector(".reach-us-wrapper");

const contactHeader = document.querySelectorAll(".contact-header");
const contactInfo = document.querySelectorAll(".info");

const navMenu = document.querySelector(".nav-menu-btn");
const exit = document.querySelector("#exit");
const navMMenu = document.querySelector(".nav-menu-mobile");
const navMMenuHeader = document.querySelectorAll(".nav-mobile-title");

const navLinksDesk = document.querySelector(".nav-links-desk");
const navLinksDeskChild = navLinksDesk.children;

let menu = document.querySelector(".menu");


document.querySelector("DOMContentLoaded", gallery());

function gallery() {
    // Initiate Lenis
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


    function preloader() {
        let pl = gsap.timeline({
            ease: "power3.inOut"
        });

        pl.to(".preload-text-one", 1, {
            transform: "translateZ(0rem)",
        }).to(".preload-text-two", 1, {
            transform: "translateZ(0rem)",
        }).to(".preload-text-three", 1, {
            transform: "translateZ(0rem)",
        }) .to(".preload-sub-text",.1, {
            width: "100%",
        }).to(".cover", 1, {
            height: "100%",
            stagger: {
                amount:.3
            }
        })
        .to("body", .1, {
            ease: "none",
            backgroundColor: "#37462a",
        })
        .to(".preloader", 1.3, {
            display: "none"
        })
        .to("main", 1, {
            display: "block",
            delay: .2
        })
       
    }

    function home() {

        gsap.defaults( {
            ease: "power3.inOut"
        })

        setTimeout(() => {
            let homeMM = gsap.matchMedia();


            gsap.to(".nav-logo > h1", .3, {
                    top: 0,
                    stagger: {
                        amount: .1
                    }
            })

            gsap.to(".nav-state-logo", .5, {
                top:0,
            })

            gsap.to(".nav-menu", .5, {
                top: 0
            })
            gsap.to(".sub-nav", .5, {
                width: "100%"
            })
            gsap.to(".video", .5, {
                height: "100%",
            })
            gsap.to("video", 1, {
                border: "1px solid",
                onUpdate: () => {
                    let videoBorderMM = gsap.matchMedia();

                    videoBorderMM.add("(min-width: 700px)", () => {
                        gsap.to("video", {
                            border: "none"
                        })
                    })
                }
            })
            
            gsap.to(".hero-right > p", 1, {
                top: 0,
                delay: 1
            })
            gsap.to(".hero-right > h1", 1, {
                top: 0,
                delay: 1.5
            })

           

        }, 6500);

        


        window.addEventListener("scroll", (e) => {
            let pageY = this.pageYOffset;
            let len = galleryImg.length;
            for (let i = 0; i < len;++i){
                let gal = galleryImg[i],
                galTop = gal.getBoundingClientRect().top;

                
                if ((galTop + 200) < window.innerHeight) {
                    gal.style.opacity = 1;
                } else {
                    gal.style.opacity = 0
                }
            }

            let reachHeadTop = reachUsHeader.getBoundingClientRect().top,
                contactHeadersLen = contactHeader.length;
            if ((reachHeadTop + 50) < window.innerHeight) {
                reachUsHeader.children[0].style.top = 0;
            } else {
                reachUsHeader.children[0].style.top = "25rem";
            }

            for (let i =0; i<contactHeadersLen; ++i) {
                let cTop,cITop = null;
                cTop = contactHeader[i].getBoundingClientRect().top;
                cITop = contactInfo[i].getBoundingClientRect().top;

                if (cTop < this.innerHeight) {
                    contactHeader[i].parentElement.style.width="100%";
                } else {
                    contactHeader[i].parentElement.style.width="0%";
                }


                if (cITop < this.innerHeight) {
                    contactInfo[i].style.left = "0"
                } else {
                    contactInfo[0].style.left = "80rem";
                    contactInfo[1].style.left = "-80rem";
                }
            }

        })

        const menuReveal = () => {
            
            navMenu.onclick = function() {
                lenis.stop();
                navMenu.classList.toggle("clicked");
                document.documentElement.style.overflow="hidden";
                let ml = gsap.timeline( 
                    {
                        ease: "power3.inOut"
                    }
                );

                ml.to(".nav-menu-mobile", 1, {
                    height: "100%"
               })
              .to(".nav-menu-mobile-list", .4,{
                   display: "flex"
               })
               .to("#nav-mobile-title", .5, {
                   scale: 1
               })
               .to(".nav-menu-mobile-list > h1", .5, {
                   opacity: 1,
                   stagger: { 
                       amount: .5
                   }
               })
          
               .to (".exit-menu",.5, {
                   scale: 1
               })
               .to (".exit-menu", .3, {
                   opacity: 1
               })

                exit.addEventListener("click", (e) => {
                    ml.reverse();
                    document.documentElement.style.overflow="scroll";
                    lenis.start();
                })


                window.addEventListener("resize", (E) => {
                    let x = window.innerWidth;
                    if (x >= 700) {

                        ml.reverse();
                        lenis.start();

                        document.documentElement.style.overflow = "scroll";

                        navMenu.classList.remove("clicked");

                        let navMenuListTag = document.querySelectorAll(".nav-links-desk > ul > li");
                        
                        gsap.to(navMenuListTag, .1, {
                            top: 0,
                            ease: "power3.inOut",
                            delay: 0,
                            stagger: {
                                amount: .5 
                            }
                        })


                    } 

                })
            }
        }

        let displayNavLinksDesk = () => {
            let navLinksUL = navLinksDeskChild[0];

            log (navLinksUL.querySelectorAll("li"));

            const navLinksULStyles = window.getComputedStyle(navLinksUL);

                    let onload = () => {
                        gsap.to(".nav-links-desk ul li", 1, {
                            top: "0rem",
                            delay: 6.5,
                            ease: "power3.inOut",
                            stagger: {
                                amount: .5
                            },
                            onUpdate: () => {
                               //
                            }
                        })
                    }

                    let w = window;
                    w.addEventListener("resize", (E) => {
                        let wx = window.innerWidth;
                        if (wx >= 700) {
                            gsap.to(".nav-links-desk ul li", 1, {
                                top: "0rem",
                                delay: 0
                            })
                        }
                    })

                    window.onload = onload();
                }

        displayNavLinksDesk();
        
        menuReveal();


       
    }

    preloader();
    home();
    

};








// WORK ON NAV LINKS ON DESKTOP 700px