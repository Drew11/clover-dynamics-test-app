const apiKey = 'igzYcA993EHzsWqm4OZKEwIY1zVrCWa0nXGuq0J9';

class NasaService {
    url ='https://api.nasa.gov/mars-photos/api/v1/';

    getPhotos = async (rover, camera)=> {
        if(!rover.length){
            return
        }
        // if(camera.length){
        //    camera = `&camera=${camera}`;
        // }
       const promise = await fetch(this.url + `rovers/${rover}/photos?&sol=1000${camera}&api_key=`+apiKey);
       const data = await promise.json();
       return data.photos;
    }
}

export default NasaService;