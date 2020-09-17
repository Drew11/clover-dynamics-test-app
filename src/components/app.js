import React, {useState, useEffect} from 'react';
import MediaCard from './card/card';
import SimpleSelect from './select/select';
import NasaService from '../services/nasa-service';
import './app.css';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        marginRight: 40
    },
}));

const App = ()=> {
  const classes = useStyles();

  const service = new NasaService();

  const [photos, setPhotos] = useState(null);
  const [activeRover, setActiveRover] = useState('');
  const [activeCamera, setActiveCamera] = useState('');
  const [activePhotos, setActivePhotos] = useState(6);

  const [sol, setSol] = useState(0);


  const optionsRovers = ['Curiosity', 'Opportunity', 'Spirit'];

  let optionsCameras = [];

  if(photos){
      photos.forEach(photo=>{
          if(!optionsCameras.includes(photo.camera.name)){
              optionsCameras.push(photo.camera.name)
          }
      });
  }

  const getFilteredPhotos=()=>{
      if(activeCamera===''){
          return photos;
      }


      const filteredPhotos = photos.filter(photo=>photo.camera.name === activeCamera.toLocaleUpperCase());
      return filteredPhotos;
  };


  const setRover = (event)=> {
    setActiveRover(event.target.value);
    setActiveCamera('');
  };

  const setCamera = (event)=> {
    setActiveCamera(event.target.value);
 };

  const getCardsPerLoad = ()=>{
      console.log(getFilteredPhotos().slice(0, activePhotos));

     return getFilteredPhotos().slice(0, activePhotos)
  };

  const pagination = ()=>{

      let photosPerLoad = activePhotos + 6;

      if(photosPerLoad*6 === photos.length) return;

      if(photosPerLoad*6 > photos.length){
          photosPerLoad = photos.length;
      }

      setActivePhotos(photosPerLoad);
  };

  useEffect(function effectFunction() {
      function fetch() {
          service.getPhotos(activeRover)
              .then((photos)=>setPhotos(photos));
      }
      fetch()},
  [activeRover]);

  console.log(photos, activePhotos)

      return (
          <div className="App">
              <header></header>

              <div className="menu-container">
                  <menu>
                      <SimpleSelect
                          name={"Rover"}
                          callback={setRover}
                          activeQuery={activeRover}
                          options={optionsRovers}
                      />

                      <SimpleSelect
                          name={"Camera"}
                          callback={setCamera}
                          activeQuery={activeCamera}
                          options={optionsCameras}
                      />

                      <input type="number"

                      />
                  </menu>
              </div>
              {
                  photos ?
                      <div>
                          {activePhotos + ' from ' + photos.length }
                      </div>:
                      null
              }


              <main>
                  <div className="content-container">
                      {
                          photos? getCardsPerLoad().map(photo=>
                              <MediaCard
                                  imageSrc={photo.img_src}
                                  cameraName={photo.camera.name}
                                  key={photo.id}
                              />
                          ): null
                      }


                  </div>

                  <div className="btn-container">
                      {
                          photos && activePhotos < photos.length ? <ColorButton
                              variant="contained"
                              color="primary"
                              className={classes.margin}
                              onClick={pagination}
                          >
                              Load more
                          </ColorButton>: null
                      }
                  </div>

              </main>
          </div>
      )


};

export default App;



