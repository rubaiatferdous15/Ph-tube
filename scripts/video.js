// console.log("Video added")
function getTimeString(time){
    const hour = parseInt (time/3600);
    let remaininSeconds  = time % 3600;
    const minutes = parseInt(remaininSeconds/60);
    remaininSeconds = remaininSeconds%60;
    return`${hour} hour ${minutes} minutes ${remaininSeconds} seconds ago`
}

const removeActive =() =>{
    const buttons = document.getElementsByClassName("category-btn");

    for(let btn of buttons){
        btn.classList.remove("active");
    }
};

const loadCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json() )
    .then((data)=> displayCategories(data.categories))
    .catch((error) =>console.log("error"));
    
};


const loadDetails = async (videoId)=>{
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res  = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);

}

const displayDetails = (video)=>{
    console.log(video);
    const detailsContainer = document.getElementById("modal-content");

    detailsContainer.innerHTML = `
        <img src= ${video.thumbnail}/>
        <p>${video.description}</p>
    `

    document.getElementById("showModal").click();
}



const displayCategories = (categories)=>{
    const categoryContainer = document.getElementById("categories");
    categories.forEach( (item) => {
        console.log(item);

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = 
        `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class= "btn category-btn">
                ${item.category}
            </button>
        `;

        categoryContainer.append(buttonContainer);
    });
};

const loadVideos = (searchText="")=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json() )
    .then((data)=> displayVideos(data.videos))
    .catch((error) =>console.log("error"));
    
}

// const cardDemo = {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//             "profile_name": "Kevin Hart",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
// }

const loadCategoryVideos = (id)=>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json() )
    .then((data)=> {

        removeActive();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active");
        displayVideos(data.category)
    })
    .catch((error) =>console.log("error"));
    
}

const displayVideos = (videos)=>{
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
            <div class = "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
                <img src = "assets/icon.png"/>
                <h2 class= "text-center font-bold text-xl">
                    No Content Here
                </h2>
            </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add("grid");
    }

    videos.forEach( (video) => {
        // console.log(video);

        const card = document.createElement("div");
        card.classList = "card card-compact"
        card.innerHTML = `
    <figure class = "h-[200px] relative">
     <img class = "h-full w-full object-cover"
      src= ${video.thumbnail}
      alt="Shoes" />
      ${video.others.posted_date?.length==0 ? "" :
      `<span class= "absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>`}
    </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
            <img class = "w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
        </div>
        <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
                <p class= "text-gray-400 ">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true ?`<img class = "w-5"  src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">`: " "}
            </div>
            <p><button onclick = "loadDetails('${video.video_id}')" class = "btn btn-sm btn-error">Details</button></p>
        </div>
    
  </div>`

        videoContainer.append(card);
    });
};

loadCategories();
loadVideos();

document.getElementById("search-input").addEventListener("keyup",(e)=>{
    loadVideos(e.target.value);

});


