const accessKey="el17bXsrP76F0gn3I8ADfBi4ctcP355oxS51hTZSkM8"
const searchForm=document.querySelector("form");
const searchInput=document.querySelector(".search-input");
const imagesContainer=document.querySelector(".images-container");
const loadMoreBtn=document.querySelector(".loadMoreBtn");
const modal = document.getElementById("imageModal");
const modalImg = document.querySelector(".modal-img");
const modalText = document.querySelector(".modal-text");
const closeModal = document.querySelector(".close-modal");


let page=1;
//function to fetch images using Unsplash API
const fetchImages=async (query,pageNo)=>{
    try{
        if (pageNo==1){
            imagesContainer.innerHTML="";
        }
       
        const url=`https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
        const response=await fetch(url);
        const data=await response.json();
        if (data.results.length>0){
            data.results.forEach((photo)=>{
    
                //creating image div
                const imageElement=document.createElement("div");
                imageElement.classList.add("imageDiv");
                
                imageElement.innerHTML=`<img src="${photo.urls.regular}"/>`;
                //creating overlay
                const overLayElement=document.createElement("div");
                overLayElement.classList.add("overlay")
        
                //creating overlay text
                const overlayText = document.createElement("h3");
                overlayText.innerText = photo.alt_description || "Download Image";

                const downloadBtn = document.createElement("a");
                downloadBtn.innerText = "⬇ Download";
                downloadBtn.href = photo.links.download;
                downloadBtn.target = "_blank"; //Download link new tab me khulega
                downloadBtn.classList.add("download-btn");
                overLayElement.appendChild(overlayText);
                overLayElement.appendChild(downloadBtn);

                imageElement.appendChild(overLayElement);
                imagesContainer.appendChild(imageElement);
            })
            
            if (data.total_pages==pageNo){
                loadMoreBtn.style.display="none";
            }
            else{
                loadMoreBtn.style.display="block";
        
            }
    
        }
        else{
            imagesContainer.innerHTML=`<h2>No Search Found</h2>`;
    
        }

    }
    catch(error){
        imagesContainer.innerHTML=`<h2>Failed to fetch images...Please Try Again later </h2>`;
        if (loadMoreBtn.style.display=="block"){
            loadMoreBtn.style.display=="none";

        }

    }
    
    
}


searchForm.addEventListener("submit",(e)=>{
    e.preventDefault(); //ye form ko auto submission se rokta h
    const inputText=searchInput.value.trim();
    if (inputText !=""){
        page=1;
        fetchImages(inputText,page)
    }
    else{
        imagesContainer.innerHTML=`<h2>Please Enter a search query</h2>`;
        if (loadMoreBtn.style.display=="block"){
            loadMoreBtn.style.display=="none";

        }

    }
})

//adiing Event Listner to load more button to fetch more images
loadMoreBtn.addEventListener("click",()=>{
    fetchImages(searchInput.value.trim(),++page);

})
