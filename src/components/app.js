import React, {useState, useEffect} from 'react';
import CardStyled from './card/card';
import SimpleSelect from './select/select';
import NasaService from '../services/nasa-service';
import './app.css';
import {styled, makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import {Input} from '@material-ui/core';

const LoadMoreButton = styled(Button)({});

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        marginRight: 40
    },
    inputSolDay: {
        border: 'none',
        backgroundColor: grey[300],
        width: 50,
        height: 20,
        marginLeft: 10
    },
}));

const App = () => {

    const classes = useStyles();
    const service = new NasaService();
    const [photos, setPhotos] = useState(null);
    const [activeRover, setActiveRover] = useState('');
    const [activeCamera, setActiveCamera] = useState('');
    const [activePhotos, setActivePhotos] = useState(6);
    const [sol, setSol] = useState(1);
    const optionsRovers = ['Curiosity', 'Opportunity', 'Spirit'];
    let optionsCameras = [];

    if (photos) {
        photos.forEach(photo => {
            if (!optionsCameras.includes(photo.camera.name)) {
                optionsCameras.push(photo.camera.name)
            }
        });
    }

    const getFilteredPhotos = () => {
        if (activeCamera === '') {
            return photos;
        }
        const filteredPhotos = photos.filter(photo => photo.camera.name === activeCamera.toLocaleUpperCase());
        return filteredPhotos;
    };


    const setRover = (event) => {
        setActiveRover(event.target.value);
        setActiveCamera('');
    };

    const setCamera = (event) => {
        setActiveCamera(event.target.value);
    };

    const getCardsPerLoad = () => {
        return getFilteredPhotos().slice(0, activePhotos)
    };

    const pagination = () => {

        if (activePhotos === photos.length) {
            return
        }

        const visiblePhotos = activePhotos + 6;

        if (visiblePhotos > photos.length) {
            setActivePhotos(photos.length);
            return;
        }

        setActivePhotos(visiblePhotos);
    };

    useEffect(function effectFunction() {
            function fetch() {
                service.getPhotos(activeRover, sol)
                    .then(
                        (photos) => {
                            setPhotos(photos);
                            setActiveCamera('');
                            setActivePhotos(6);
                        }
                    );
            }

            fetch()
        },
        [activeRover, sol]);


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
                    <Input
                        placeholder="solar day number"
                        value={sol}
                        className={classes.inputSolDay}
                        type={'number'}
                        onChange={(event) => {
                            if (event.target.value < 1 || event.target.value >= 1001) {
                                return
                            }
                            setSol(event.target.value)
                        }}
                    />

                </menu>
            </div>

            <main>

                {photos && photos.length===0&& 'no photo in this day...'}

                <div className="content-container">
                    {
                        photos ? getCardsPerLoad().map(photo =>
                            <CardStyled
                                imageSrc={photo.img_src}
                                cameraName={photo.camera.name}
                                earthDate={photo.earth_date}
                                key={photo.id}
                            />
                        ) : null
                    }
                </div>

                {
                    photos && activePhotos < getFilteredPhotos().length ? <LoadMoreButton
                        variant="contained"
                        color="primary"
                        onClick={pagination}
                    >
                        Load more
                    </LoadMoreButton> : null
                }

            </main>

            <footer></footer>

        </div>
    )
};

export default App;
