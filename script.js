function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

loco()

function loadingAnimation() {
    var tl = gsap.timeline()

    tl.from(".load h1,.load h2", {
        y: 120,
        duration: 0.7,
        delay: 0.2,
        stagger: 0.2
    })
    tl.to(".load", {
        opacity: 0,
        delay: 1.6,
        stagger: -0.2
    })
    tl.to("#loader", {
        top: "-100%",
        duration: 1,
        ease: "power4.out"
    })
    tl.from(".text h1, .text h2,.text h3", {
        y: 200,
        opacity: 0,
        stagger: {
            amount: 0.5
        },
    })
    tl.from("#nav", {
        opacity: 0,
    }, "-=0.5")

    var timer = document.querySelector("#timer h4")
    var grow = 0
    var int = setInterval(function () {
        if (grow < 100) {
            grow++
            timer.innerHTML = grow
        }
    }, 20)

    setTimeout(function () {
        clearInterval(int)
    }, 3000)


}
loadingAnimation()

function page2Animation() {

    var videoC = document.querySelector("#video-container")
    videoC.addEventListener("mouseenter", function () {
        gsap.to(".mousefollower", {
            opacity: 0
        })
    })
    videoC.addEventListener("mouseleave", function () {
        gsap.to(".mousefollower", {
            opacity: 1
        })

        gsap.to("#play-btn", {
            left: "70%",
            top: "-15%"
        })
    })

    var videoImage = document.querySelector("#video-container img")
    var videoVideo = document.querySelector("#video-container video")

    var flag = 0

    videoC.addEventListener("click", function () {
        if (flag == 0) {

            gsap.to(videoVideo, {
                opacity: 1
            })

            gsap.to("#play-btn", {
                scale: 0.8
            })
            document.querySelector("#play-btn").innerHTML = '<i class="ri-pause-line"></i>'
            videoVideo.play()
            flag = 1
        } else {
            gsap.to(videoVideo, {
                opacity: 0
            })
            gsap.to("#play-btn", {
                scale: 1
            })
            document.querySelector("#play-btn").innerHTML = '<i class="ri-play-fill"></i>'

            videoVideo.pause()
            flag = 0
        }
    })

    videoC.addEventListener("mousemove", function (dets) {
        gsap.to("#play-btn", {
            left: dets.x - 555,
            top: dets.y - 200
        })
    })
}


page2Animation()

function SheryAnimation() {
    Shery.mouseFollower()

    Shery.makeMagnet("#nav h4,svg")

    Shery.imageEffect(".effect", {
        style: 6,
        // debug:true,
        gooey: true,
        config: { "noiseDetail": { "value": 6.11, "range": [0, 100] }, "distortionAmount": { "value": 2.9, "range": [0, 10] }, "scale": { "value": 59.54, "range": [0, 100] }, "speed": { "value": 0.58, "range": [0, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.8333333134651184 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": true }, "maskVal": { "value": 1.27, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 0.84, "range": [0, 10] }, "metaball": { "value": 0.44, "range": [0, 2] }, "discard_threshold": { "value": 0.5, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.38, "range": [0, 2] }, "noise_scale": { "value": 8.4, "range": [0, 100] } }
    })

}


SheryAnimation()

function page6Animation() {
    gsap.to(".page6-mark", {
        x: -1000,
        scrollTrigger: {
            trigger: "#page6",
            scroller: "#main",
            start: "top 150%",
            end: "top -80%",
            scrub: 2,
            
            // markers:true
        }
    })

    gsap.from(".page6-marking", {
        x: -1000,
        scrollTrigger: {
            trigger: "#page6",
            scroller: "#main",
            start: "top 150%",
            end: "top -80%",
            scrub: 2,
            // markers:true
        }
    })

}

page6Animation()

document.querySelector("#ig").addEventListener("mouseenter",function(){
    gsap.to(".switcher",{
        y:"-100%",
        
        
    })
})

document.querySelector("#ig").addEventListener("mouseleave",function(){
    gsap.to(".switcher",{
        y:"0%",
        
    })
})





function basicAnimation(){
    gsap.from("#line2",{
        width:"30%",
        duration:1,
        opacity:0,
        scrollTrigger:{
            trigger: "#page3",
            scroller: "#main",
            // markers:true,
            start:"top 60%",
            
        }
    })
    gsap.from(".line",{
        transform:"translateX(30%)",
        duration:1,
        opacity:0,
        scrollTrigger:{
            trigger: "#page5",
            scroller: "#main",
            // markers:true,
            start:"top 60%",
            // scrub:1,
            
        }
    })
    gsap.from(".hr",{
        x:"100%",
        duration:1,
        opacity:0,
        scrollTrigger: {
            trigger: "#page5",
            scroller: "#main",
            start: "bottom 90%",
            end: "bottom 50%",
            // scrub: 2,
            // markers:true
        }
    
    
    })

    document.querySelector("#text3").addEventListener("mousemove",function(dets){
        gsap.to("#text3 img",{
            x:dets.x-700,
        })
    })
    document.querySelector("#text3").addEventListener("mouseenter",function(dets){
        gsap.to("#text3 img",{
           opacity:1
        })
    })
    document.querySelector("#text3").addEventListener("mouseleave",function(dets){
        gsap.to("#text3 img",{
            opacity:0
        })
    })
    
    gsap.from(".anim h4", {
        y:"200",
        duration:0.4,
        opacity:0,
        stagger:.03,
        scrollTrigger:{
            trigger:"#page5",
            scroller:"#main",
            start:"top 50%",
            end:"top 35%",

            // markers:true,
            // scrub:true
        }
    })
}
basicAnimation();

function footerAnim(){
    
var footText = document.querySelectorAll(".footer-text .foottext")

footText.forEach(function(elem){
    var elemText  = elem.textContent
    var splited = elemText.split("")
    var clutter = ""
    splited.forEach(function(e){
        clutter += `<span>${e}</span>`
    })
    elem.innerHTML = clutter
})


var footerText = document.querySelector(".footer-text")

footerText.addEventListener("mouseenter",function(){
    gsap.to(".footer-text h1 span",{
        opacity:0,
        stagger:0.1,
        duration:0.2
    })
    gsap.to(".footer-text h2 span",{
        opacity:1,
        delay:0.4,
        duration:0.2,
        stagger:0.1
    })
})

footerText.addEventListener("mouseleave",function(){
    gsap.to(".footer-text h2 span",{
        opacity:0,
        stagger:0.05,
        duration:0.2
    })
    gsap.to(".footer-text h1 span",{
        opacity:1,
        delay:0.4,
        duration:0.2,
        stagger:0.1
    })
})


}
footerAnim();

function menu(){
  var menu = document.querySelector("#menu")
  var flag = 1
  
  menu.addEventListener("click",function(){
    if (flag == 1) {
      gsap.fromTo("#navigation",{
        clipPath: `polygon(0 0, 100% 0, 100% 0, 0 0)`
      },{
        clipPath: `polygon(0 0%, 100% 0, 100% 100%, 0% 100%)`
      })
      gsap.fromTo("#navigation h1",{
        y:"100%",
        opacity:0
      },{
        y:"0%",
        opacity:1,
        stagger:{
          amount:0.5
        }
      })
      gsap.to("#navbar h4,",{
        opacity:0
      })
      flag = 0
    }
    else{
      gsap.fromTo("#navigation",{
        clipPath: `polygon(0 0%, 100% 0, 100% 100%, 0% 100%)`
      },{
        clipPath: `polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)`,
        delay:0.5
      })
      gsap.fromTo("#navigation h1",{
        y:"0%",
        opacity:1
      },{
        y:"-20%",
        opacity:0,
      })
      gsap.to("#navbar h4",{
        opacity:1
      })
      flag = 1
    }
    
  })
}
menu()