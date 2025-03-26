const { log } = console;

const { documentElement, body } = document;

const nav = document.querySelector("nav");
const container = document.querySelector(".container");
const preloader = document.querySelector(".preloader");
const preloaderContainer = preloader.children[0];
const main = document.querySelector("main");
const end = document.querySelector(".sec.end");
const images = document.querySelectorAll(".img > img");
const bannerHeaderWrapper = document.querySelector(".banner-header-wrapper");
const bannerHeaderWrapperChildren = bannerHeaderWrapper.children;
const infoLocationHeaders = document.querySelector(".info-location-headers");
const infoLocationHeadersChildren = infoLocationHeaders.querySelectorAll("h1");
const infoLocationHeadersSpanTag = document.querySelector(".info-location-headers > h1 > #span-tag");
const services = document.querySelector(".services");
const servicesSticky = services.children[0];
const servicesChildren = servicesSticky.children;

const serviceContent = document.querySelectorAll(".service-info > li");

const bioHeaderTitle = document.querySelector(".bio-header-title");
const bioTitle  = document.querySelector(".bio-title");

const bio = document.querySelector(".bio");
const bioImage = document.querySelector(".bio-image");
const bioContent = document.querySelector(".bio-content");

const heroSlider = document.querySelector(".hero-slides");
const heroSlides = heroSlider.querySelectorAll(".hero-slide");


const imageSlides= document.querySelectorAll(".img > img");


const navMenuToggle = document.querySelector(".nav-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

const exitMenu = document.querySelector(".exit-menu");


window.onload = () => {
    window.scrollTo(
        {
            top: 0
        }
    )
}


// setTimeout(() => {
// Initialize Lenis
const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

setTimeout(() => {
    requestAnimationFrame(raf);
    lenis.stop();
}, 6000)

setTimeout(() => {
    document.body.style.overflow = "scroll";

    lenis.start();

    main.style.transform = "scale(1)";
}, 6000)


document.addEventListener("DOMContentLoaded", (e) => {
    let heroMM = gsap.matchMedia();

    setTimeout(() => {
        let timeline = gsap.timeline();

        timeline.to(".nav-logo > h1", .3, {
            top: 0,
            ease:"power3.inOut",
            stagger: {
                amount: .2
            }
        })
        .to (".nav-state-icon > img", .3, {
            top: 0,
            ease: "power3.inOut"
        })
        .to (".nav-menu-toggle", .3, {
            opacity: 1,
            ease: "power3.inOut"
        })

        // gsap.to(".slides > .img", .5, {
        //     top: 0,
        //     ease: "power3.inOut"
        // })
        gsap.to(".sub-nav", .5, {
            top: 0,
            ease: "power3.inOut"
        })
        gsap.to(".z-box", .4, {
            opacity: 1,
            ease: "power3.inOut"
        })
        gsap.to(".hero-header-one", .6, {
            top: "1rem",
            opacity: 1,
            ease: "power3.inOut",
            onUpdate: () => {
                let heroMM = gsap.matchMedia();

                heroMM.add("(min-width: 500px)", () => {
                    gsap.to(
                        ".hero-header-one", {
                            top: "0rem",
                            fontSize: "2rem"
                        }
                    )
                })

                heroMM.add("(min-width: 800px)", () => {
                    gsap.to(".hero-header-one", {
                            fontSize: "4rem",
                        })
                })
            }
        })
        gsap.to(".hero-slider", .7, {
            top: 0,
            opacity: 1,
            ease: "power3.inOut"
        })
        gsap.to(".hero-header-two", .75, {
            bottom: "1rem",
            opacity: 1,
            ease: "power3.inOut",
            onUpdate: () => {
                let heroMM = gsap.matchMedia();

                heroMM.add("(min-width: 500px)", () => {
                    gsap.to(
                        ".hero-header-two", {
                            bottom: "0rem"
                        }
                    )
                })


                heroMM.add("(min-width: 800px)", () => {
                    gsap.to(".hero-header-two", {
                        color: "#a2a22d",
                        webkitTextStroke: "#826565",
                        webkitTextStrokeWidth: ".3px"
                    })
                })


                heroMM.add("(min-width: 1000px)", () => {
                    gsap.to(".hero-header-two", {
                        color: "white"
                    })
                })
            }
        })
        // gsap.to(".intro > h1", .5, {
        //     top: 0,
        //     ease: "power2.inOut",
        //     stagger: {
        //         amount: .1
        //     }
        // })
        gsap.to(".dd-arrow", 1, {
            opacity: 1,
            delay: 1
        })


        heroMM.add("(min-width: 700px)", () => {
            let w = window;
            let navLinksDeskParent = document.querySelector(".nav-links-desk");
            
            const navLinksDeskChild = navLinksDeskParent.children[0];
            const navLinksDeskDash = navLinksDeskParent.children[1];

            const navMenuMobile = document.querySelector(".nav-menu-mobile");


            let navLinksDeskDisplay = () => {
                if (w.innerWidth >= 700) {

                    navMenuToggle.style.display = "none";

                    lenis.start();
                
                    navLinksDeskParent.classList.remove("hidden");

                    if (!navLinksDeskParent.classList.contains("hidden")) {
                        
                        navLinksDeskParent.classList.remove("hidden");

                        let nl = gsap.timeline();
                        
                        nl.to(".nav-links-desk ul li", .4, {
                            top: 0,
                            stagger: {
                                amount: .5
                            }
                        })
                        .to(navLinksDeskDash, .4, {
                            width: "60%",
                            ease: "power3.inOut"
                        })
                        
                        } else {
                            navLinksDeskParent.classList.add("hidden");

                            // navMenuToggle.style.display = "flex";
                        }
                    
                } else {
                    navLinksDeskParent.classList.add("hidden");
                    navMenuToggle.style.display = "flex";

                }   
            }

            let heroHeaderTitleFont = () => {
                let heroHeader = document.querySelector(".hero-box");
                let heroHeaderOne = heroHeader.children[0];

                let hhMedia = gsap.matchMedia();

                hhMedia.add("(max-width: 800px)", () => {
                    gsap.to(heroHeaderOne, {
                        fontSize: "2rem"
                    })
                })
            }

            w.addEventListener("load", navLinksDeskDisplay());
            w.addEventListener("resize",  () => {
                
                navLinksDeskDisplay()

                heroHeaderTitleFont();
        });
        })
    }, 6800)
    
})






const preload = () => {

    let tl = gsap.timeline();
    let bl = gsap.timeline();
    
    tl.to(preloader, {
        height: "100%",
        duration: 1.5,
        ease: "power3.inOut"
    })
    .to(preloaderContainer, { 
        translateZ: 0,
        duration: .8,
        ease: "power2.inOut"
    })
    .to(".box", {
        height: "50%",
        duration: 1,
        delay: 1.5,
        ease: "power3.inOut"
    })
    .to(".box", {
        scale: 6,
        duration: 1, 
        delay: .03,
        ease: "power4.inOut"
    })
    .to(preloader, {
        duration: .5,
        display: "none",
        delay: .1
    })
    .to(".box", {
        opacity: 0,
        duration: 1,
        // delay: .01,
        onUpdate:()=> {
            gsap.to(preloader, {
                opacity: 0,
                delay: 0
            })
        }
    })
    // hsl(47.9, 43.7%, 62.4%);
    gsap.to (body, 1, {
        backgroundColor: "hsl(47.9, 43.7%, 62.4%)",
        ease: "power3.inOut",
        delay: 6.05,
    })
   



    gsap.from(".dd-arrow", 1, {
        y: 6,
        ease: "power2.inOut",
        // repeat: -1
    })
    gsap.to(".dd-arrow", 1, {
        y: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
    });

    window.addEventListener("scroll", (e) => {
        let y = window.pageYOffset;
        let height = window.innerHeight;

        let bannerTop = bannerHeaderWrapper.offsetTop;

        let bannerCalc = (y - bannerTop) / height;

        let servicesTop = services.offsetTop,
            servicesCalc = (y - servicesTop) / height;

        let infoLocationHeadersSpanTagStyle = {};

        if (bannerCalc > 0.8) {
            for (let i = 0; i < bannerHeaderWrapperChildren.length; ++i) {
                bannerHeaderWrapperChildren[i].style.top =" 0rem";
            } 

            infoLocationHeadersChildren.forEach(child => {
                setTimeout(() => {
                    child.style.left = "0rem";
                }, 300);    
            })

            
            infoLocationHeadersSpanTagStyle['width'] = "100%";
            infoLocationHeadersSpanTagStyle['opacity'] = 1;
            infoLocationHeadersSpanTag.style.transition = "all 650ms ease";

            setTimeout(() => {
                for (const i in infoLocationHeadersSpanTagStyle) {
                    infoLocationHeadersSpanTag.style[i] = infoLocationHeadersSpanTagStyle[i]
                }
            }, 1000)
        } else {
            for (let i = 0; i < bannerHeaderWrapperChildren.length; ++i) {
                if (i == 0) {
                    bannerHeaderWrapperChildren[i].style.top =" -5rem";

                } else {
                    bannerHeaderWrapperChildren[i].style.top =" 10rem";

                }
            } 

            for (let i = 0; i < infoLocationHeadersChildren.length; ++i) 
                {
                    if (i == 0) 
                        infoLocationHeadersChildren[i].style.left = "50rem";
                    else 
                        infoLocationHeadersChildren[i].style.left = "-50rem"; 
                }

                infoLocationHeadersSpanTagStyle['opacity'] = 0;
                infoLocationHeadersSpanTagStyle['width'] = "0";
                infoLocationHeadersSpanTag.style.transition = "unset";

                for (const i in infoLocationHeadersSpanTagStyle) {
                    infoLocationHeadersSpanTag.style[i] = infoLocationHeadersSpanTagStyle[i];
                }
            
        }

        if ((services.getBoundingClientRect().top + 200) < height) {
            document.body.style.background = "black";
            document.body.style.transition = "all 650ms ease";


            servicesChildren[0].style.opacity = "1";

            for (let i = 0; i < serviceContent.length; ++i)
                serviceContent[i].style.left = "0rem"
            
        } else {
            // document.body.style.background = "hsl(74, 91%, 75%)";
            document.body.style.background = "hsl(47.9, 43.7%, 62.4%)";
            document.body.style.transition = "all 650ms ease";

            servicesChildren[0].style.opacity = "0";

            for (let i = 0; i < serviceContent.length; ++i)
                serviceContent[i].style.left = "100rem";


        }

        if ((bioHeaderTitle.getBoundingClientRect().top + 100) < height) {
            // let scale = (this.pageYOffset / bio.offsetTop - .5);
            bioTitle.style.transform = "scale(1)";
        } else {
            bioTitle.style.transform = "scale(0)";
        }
       


        if ((bio.getBoundingClientRect().top) < height) {
            bioImage.style.height = bioImage.style.width = "20rem";
            bioContent.style.opacity = "1";
        } else {
            bioImage.style.height = bioImage.style.width = "0rem";
            bioContent.style.opacity = "0";
        }

    })


    // imageSlides[0].style.opacity = 1;
    // function hideImage() {
    //     for(let i = 0; i < imageSlides.length; ++i) {
    //         imageSlides[i].style.display = "none";
    //         imageSlides[i].style.opacity = "0";
    //     }
    // }

    function revealImage(img, index) {
        setTimeout(() => {
            img[index].style.opacity = "1";
        }, 350);
    }
    function imageSlideShow () {
        var count = 0;

        setInterval(() => {
            count = count + 1;

            if (count == 15) {
                count = 0;
                // hideImage();
                // imageSlides[1].style.display = "block";
                // revealImage(imageSlides, 1);
            }
            if (count == 5) {
                hideImage()
                imageSlides[1].style.display="block";
                revealImage(imageSlides, 1);
            }
            if (count == 12)
            {
                hideImage()
                imageSlides[0].style.display="block";
                revealImage(imageSlides, 0);
            }            
        }, 800);
    }


    function navMenuReveal() {
        

        navMenuToggle.addEventListener("click", (e) => {
            document.body.style.overflow = "hidden";

            lenis.stop();


            // document.body.style.overflow = document.documentElement.style.overflow =  "hidden";

            if (!navMenuToggle.classList.contains("menu-reveal")) {
                navMenuToggle.classList.add("menu-reveal");
            }


            let navMenuTimeline = gsap.timeline();
            let navMenuMM = gsap.matchMedia();

            if (navMenuToggle.classList.contains("menu-reveal")) {

                navMenuTimeline
                .to(".nav-menu-mobile", 1, {
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
            }

            navMenuMM.add("(min-width: 700px)", () => {
                document.body.style.overflow = "scroll";
                lenis.start();

                navMenuTimeline.reverse();
            })

            exitMenu.addEventListener("click", (e) => {
                navMenuToggle.classList.remove("menu-reveal");
                // main.style.opacity = 0;
                navMenuTimeline.reverse();

                setTimeout(() => {
                    document.body.style.overflow = "scroll";

                    lenis.start();
                }, 3500);
                // document.body.style.overflow = document.documentElement.style.overflow =  "scroll";
                // main.style.opacity = 1;

            })
        })
    }

    function heroSlideShow() {
        setTimeout(() => {
            let interval = 0 ;
            setInterval(() => {
                interval >= 15 ? (interval = 0) : interval;
                interval++;

                if (interval % 5 == 0) {
                    switch ( interval ) {
                        case 5: 
                            heroSlider.style.transform = `translateX(-${100}%)`;
                            break;
                        case 10: 
                            heroSlider.style.transform = `translateX(-${200}%)`;
                            break;
                        case 15: 
                            heroSlider.style.transform = `translateX(-${0}%)`;
                            break;
                        default: 
                            break;
                    }
                }

                

        
            }, 1000) 
        }, 5200)
    }

    navMenuReveal();

    heroSlideShow();
   
//    setTimeout(imageSlideShow(), 6000)
//    setTimeout(imageSlideShow, 8000);

    
};



preload();
