let filmUrl="http://moviesapi.ir/api/v1/movies/";
let imgObj = [];

let i=1;
let k=0;
//fetch(filmUrl)
   // .then((response) => response.json());
    //.then(jsonData => console.log(jsonData));

let blogsDiv = document.querySelector('#blogs');


async function getmovieFromAPI(Url)
{
    let filmresponse = await fetch(Url);
    let jsonResponse = await filmresponse.json();
    //console.log(jsonResponse.data);
    
    jsonResponse.data.forEach(async post => {
        let filmdescription = await getFilminfo(Url,post.id);
        let html = `
                     <article>
                           <h2 class="h4">${i} : ${post.title}</h2>
                          <small style="margin-top:10px;" class="badge bg-info">Rating : ${post.imdb_rating}</small>
                            <small style="margin-top:10px;" class="badge bg-primary">Year : ${post.year}</small>
                            <small style="margin-top:10px;" class="badge bg-success">Country : ${post.country}</small>
                            <p style="padding-top:20px;">Description : ${filmdescription.plot}</p>
                     </article>
                     `;

        let imgDivSection = `
                <div class="slideshow">
                    <div class="slides" data-active="0">
                        <div class="slide active">
                        <img src="${post.images[0]}">
                        </div>
                        <div class="slide">
                            <img src="${post.images[1]}" >
                        </div>
                        <div class="slide">
                            <img src="${post.images[2]}">
                        </div>
                        <span class="prev">&#10094;</span>
                        <span class="next">&#10095;</span>
                        <div class="points">
                        <span class="active"></span>
                        <span></span>
                        <span></span>
                    </div>
                    </div>
                </div>
        `;             

        html+= imgDivSection;
        html+= `<hr>`;
        blogsDiv.innerHTML += html;
        i++;
        if(i===11)
        {
            let slideshows = document.querySelectorAll(".slideshow");
            // console.log(slideshows);
            slideshows.forEach(s => {
              //  console.log(s);
                let slides = s.querySelectorAll(".slide")
                let points = s.querySelectorAll(".points > span")
                let prev = s.querySelector(".prev")
                let next = s.querySelector(".next")
                let slidesDiv = s.querySelector(".slides")
                runSlider(s,slides,points,prev,next,slidesDiv,timer)
            })
        }          
    })
    k = i;
}


async function getFilminfo(url,id)
{
    let result = await fetch(url+id);
    result = await result.json();
    return result;
}


async function imgSlider()
{
    await getmovieFromAPI(filmUrl)
    


}

imgSlider()
