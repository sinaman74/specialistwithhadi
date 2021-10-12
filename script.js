function classSwitcher (slides,points,active) {
    slides.forEach(slide => slide.classList.remove("active"))
    points.forEach(point => point.classList.remove("active"))
    slides[active].classList.add("active")
    points[active].classList.add("active")
}

let goNext = (slides,points,active,slidesDiv) => {
    active = (active === slides.length - 1) ? 0 : active + 1;
    console.log(active);
    slidesDiv.setAttribute("data-active",active);
    classSwitcher(slides,points,active)
}

let goPrev = (slides,points,active,slidesDiv) => {
    active = (active === 0) ? slides.length - 1 : active - 1
    slidesDiv.setAttribute("data-active",active);
    classSwitcher(slides,points,active)
}

let timer = 1000

// let slideshows = document.querySelectorAll(".slideshow")


function runSlider(slideshow,slides,points,prev,next,slidesDiv,timer){
    let active = parseInt(slidesDiv.getAttribute("data-active"));

    let runSlideshow = setInterval(()=>{
        active = parseInt(slidesDiv.getAttribute("data-active"));
        goNext(slides,points,active,slidesDiv)
    }, timer)

    points.forEach((point, index) => {
        point.addEventListener("click", e => {
            active = index
            classSwitcher(slides,points,active)
        })
    })
    
    next.addEventListener("click", e => {
        active = parseInt(slidesDiv.getAttribute("data-active"));
        goNext(slides,points,active,slidesDiv)
    })
    
    // prev event
    prev.addEventListener("click", e => {
        active = parseInt(slidesDiv.getAttribute("data-active"));
        goPrev(slides,points,active,slidesDiv)
    } )
    
    slideshow.addEventListener("mouseover", e => clearInterval(runSlideshow))

    slideshow.addEventListener("mouseleave", e => runSlideshow = setInterval(()=>{
        active = parseInt(slidesDiv.getAttribute("data-active"))
        goNext(slides,points,active,slidesDiv)
    }, timer))

}


// slideshows.forEach(s => {
//     let slides = s.querySelectorAll(".slide")
//     let points = s.querySelectorAll(".points > span")
//     let prev = s.querySelector(".prev")
//     let next = s.querySelector(".next")
//     let slidesDiv = s.querySelector(".slides")
//     runSlider(s,slides,points,prev,next,slidesDiv,timer)
// })




