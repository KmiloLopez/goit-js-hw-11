console.log("CONFIO EN MI HABILIDADES")
import Notiflix from 'notiflix';
const doc = document
const searchBtn = doc.querySelector('button')
const searchForm = doc.getElementById('search-form')
const galleryImage = doc.querySelector('.gallery')
const loadMoreBtn = doc.querySelector('.load-more')
const API_KEY = '34614174-fcdfb58168b28ad843b7da5c7';
loadMoreBtn.hidden=true; 
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",loadMoreBtn)
let pageNumber=1;
let perPage =40;
let newUrl=("")
///falta agregar axios, buscador deplegue 4 imagenes en fila, centrar buscador
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN
//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN//TODO BIEN

const searchText = document.querySelector('[name="searchQuery"]');
function encodeURIComponent(text){
    console.log("Dentro de la funcion",text)
    const encodedText = text.trim().split(" ").join("+")
    console.log(encodedText)
    return encodedText
}
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    galleryImage.innerHTML = null;
    const enteredText = searchText.value
    console.log(enteredText)
    const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(enteredText)+"&image_type=photo&orientation=horizontal&safesearch=true"+`&per_page=${perPage}`+`&page=${pageNumber}`;
    console.log("este es el URL: ", URL)
    newUrl ="https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(enteredText)+"&image_type=photo&orientation=horizontal&safesearch=true"+`&per_page=${perPage}`;
    fetchImage(URL);
   /*  fetchImage(URL)
    .then((varA)=>{
        console.log("que es lo que llego aca?",varA.hits)//aca ya tengo el array de la busqueda
        printImageCard(varA.hits)
    })
    .catch((error)=>console.log(error.message))
    
    loadMoreBtn.hidden=false; */
})
async function fetchImage(URL){
  try{
    const foundArray = await fetchImages(URL)
    printImageCard(foundArray)
  }
  catch(err){
      console.log(err)
  }
  
}
const fetchImages = async(theUrl)=>{
  
  const foundArray = await fetch(`${theUrl}`)//busqueda de la url en la API
  const foundArrayJson= await foundArray.json()
  return foundArrayJson 
}
/* fetchImage (theUrl){
    return fetch(`${theUrl}`)//busqueda de la url en la API
    .then(
        response => {
          if (!response.ok) {
            console.log('empty array with response always ok');
            throw new Error(response.status);  
               
          }
          return response.json();

        }
      );
      

} */
function printImageCard(arrayImages){//aca llega el array de lo que encontro la busqueda
    //aca ponemos el if si no encontro nada manda alerta
    const totalphotos = arrayImages.totalHits
    console.log("totalPhotos Encontramos esta cantidad de fotos con la busqueda",totalphotos)
    arrayImages=arrayImages.hits
    if(totalphotos===0){
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    
   
    else if(totalphotos>0){const neededInfo=arrayImages.map(imageFound => {
       
      return `    <div class="photo-card">
      <img class="image" src="${imageFound.webformatURL}" alt="" loading="lazy" />
      <div class="info">
        <div class="info-item"> 
          <p>
              <b>Likes</b>
              
          </p>
          <div>${imageFound.likes}</div>
        </div>

        <div class="info-item"> <p>
          <b>Views</b>
          <p>${imageFound.views}</p>
        </p>
        </div>

        <div class="info-item"><p>
          <b>Comments</b>
          <p>${imageFound.comments}</p>
        </p>
        </div>

        <div class="info-item"><p>
          <b>Downloads</b>
          <p>${imageFound.downloads}</p>
        </p>
        </div>
      </div>
    </div>`;
    })
    .join("")
    Notiflix.Notify.success('Success search');
    if(pageNumber===1){
      galleryImage.innerHTML = neededInfo

    }
    if(pageNumber>1){
      galleryImage.insertAdjacentHTML('beforeend',neededInfo) 
    }
    console.log("este es el array que mapioo arrayImages:",arrayImages)
    /* console.log("esto es lo que se esta intentando inyectar con innerHTM neededInfo:", neededInfo) */
    if(totalphotos>40){
      loadMoreBtn.hidden=false;
      const totalPages =parseInt(totalphotos/40)+1
      console.log("El total de paginas es",totalPages)
      if(totalPages===pageNumber){
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hidden=true; 
      }
    } 
   
    }
    
    
    

}
// load more button
/* loadMoreBtn[0].hidden=false; */
loadMoreBtn.addEventListener('click',()=>{
  pageNumber=pageNumber+1;
  console.log(pageNumber)
  console.log("newUrl es:",newUrl+`&page=${pageNumber}`)
  newUrl=newUrl+`&page=${pageNumber}`
  fetchImage(newUrl);
})

/* if(arrayImages.length>39){
  loadMoreBtn.hidden=false;
  console.log("visible")
 }  */