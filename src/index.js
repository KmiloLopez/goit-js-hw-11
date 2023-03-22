console.log("CONFIO EN MI HABILIDADES")
const doc = document
const searchBtn = doc.querySelector('button')
const searchForm = doc.getElementById('search-form')
const galleryImage = doc.querySelector('.gallery')
searchBtn.addEventListener('click', ()=>{
    console.log("Hicimos click y con lo ya escrito buscamos o hacemos algo")
    //no veo necesario agregar el click por que el envio ya se hace en el submit con la info de busqueda.
})

const API_KEY = '34614174-fcdfb58168b28ad843b7da5c7';


/* $.getJSON(URL, function(data){
if (parseInt(data.totalHits) > 0)
    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
else
    console.log('No hits');
}); */



const searchText = document.querySelector('[name="searchQuery"]');
function encodeURIComponent(text){
    console.log("Dentro de la funcion",text)
    const encodedText = text.trim().split(" ").join("+")
    console.log(encodedText)
    return encodedText
}
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const enteredText = searchText.value
    console.log(enteredText)
    const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(enteredText)+"&image_type=photo&orientation=horizontal&safesearch=true";
    console.log("este es el URL: ", URL)
    fetchImage(URL)
    .then((varA)=>{
        console.log("que es lo que llego aca?",varA.hits)//aca ya tengo el array de la busqueda
        printImageCard(varA.hits)
    })
    .catch((error)=>console.log(error))
})
function fetchImage (theUrl){
    return fetch(`${theUrl}`)
    .then(
        response => {
          if (!response.ok) {
            console.log('Oops, there is no country with that name');
            throw new Error(response.status);  
               
          }
          return response.json();

        }
      );

}
function printImageCard(arrayImages){//aca llega el array de lo que encontro la busqueda
    //aca ponemos el if si no encontro nada manda alerta
    const neededInfo=arrayImages.map(imageFound => {
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
    console.log(arrayImages[0])
    console.log("DESDE ACA",neededInfo)
    galleryImage.innerHTML = neededInfo

}
/* esta seria la direccion de busqueda q=
https://pixabay.com/api/?key=34614174-fcdfb58168b28ad843b7da5c7&q=yellow+flowers&image_type=photo */

/* {
     updateDebounceText(e.target.value) //lo que ingresa lo manda a la constante
    let imputt = e.target.value;
    console.log("imputt.value: ",imputt.value);
    console.log("imputt: ",imputt);
    
  }); */