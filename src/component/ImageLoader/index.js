import React from 'react';
import './imageLoader.css'
import ProgressBar from "../ProgressBar";
import axios from 'axios';

class ImageLoader  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            url: "",
            downloading: false,
            image: process.env.PUBLIC_URL + "/placeholder.png",
            loaded: 0
        }
        this.urlChange = this.urlChange.bind(this);
        this.replaceImage = this.replaceImage.bind(this);
    }

    urlChange(e){
        this.setState( {
            url: e.target.value
        });
    }

    createImageStyle(){
        let style = {
            display: "block"
        }
        style.width = this.props.width || "375px";
        style.height = this.props.height || "375px";
        if (this.state.image) {
            style.objectFit = this.props.fit || "cover";
        } else {
            style.objectFit = "none";
        }
        if (this.state.fileImg) {
            style.filter = "grayscale(70%)";
        }
        return style;
    }

    replaceImage(){
        axios.get(this.setState.url, {
            responseType: 'arraybuffer',
            onDownloadProgress: e =>{
                let progress = (e.loaded * 100) / e.total;
                console.log(progress);
                this.setState({
                    downloading: true,
                    loaded: progress
                });
            }
        }).then(response => {
            let base64 = "data:" +
                response.headers['content-type'] + ";base64," +
                Buffer.from(response.data, 'binary').toString('base64');

            this.setState({
                downloading: false,
                image: base64,
                loaded: 0
            })

            if (this.props.onload){
                this.props.onload();
            }
        })
    }

    createImageStyle(){

    }

    render(){
        const title = this.props.title;
        const alt = this.props.alt || title;
        return (
          <div className="ImageLoader">
              <div className="control">
                  <input type="input" className="txtUrl" value={this.state.url} onChange={this.urlChange} placeholder="Enter the image URL here!"/>
                  <input type="button" className="btnUrl" value="Get" onClick={this.replaceImage}/>
              </div>
              <img style={this.createImageStyle()} src={this.state.image} title={title} alt={alt}/>
              {!this.state.downloading || <div className="barContainer"><ProgressBar width="auto" height="18px" percent={this.state.loaded}/></div>}
          </div>
        );
    }
}

export default ImageLoader;
