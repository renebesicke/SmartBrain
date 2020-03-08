import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'cd1fdc72ef3f472cbe041d4cc621ddd8'
});

const  particlesOptions = {
    particles: {
        number: {
            value: 50,
            denisty: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
        }
    }

    calculateFaceLocation = (apidata) => {
        const clarifaiFace = apidata.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        console.log(apidata);
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height),
        };
    };

    displayFaceBox = (box) => {
        this.setState({box: box});
        console.log(box)
    };

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    };

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        console.log('click');
        app.models
            .predict(
                Clarifai.FACE_DETECT_MODEL,
                this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Particles className='particles'
                           params={particlesOptions} />
                <Navigation/>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
