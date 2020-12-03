import React from 'react';
import {storage} from '../../firebase';
import './Gallery.css';
import Post from "../../component/Post";
import list from "../../dao";

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            txtFile: "",
            file: null,
            posts: [],
            files: []
        }
        this.onChoseFile = this.onChoseFile.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onChoseFile(e) {
        this.setState({
            txtFile: e.target.value,
            file: e.target.files[0]
        })
    }

    async onUpload() {
        const {file} = this.state;
        if (!file) return;

        try {
            const folder = storage.ref().child("/images");
            await folder.child(file.name).put(file);
            await this.listFiles();
        } catch (err) {
            alert(err);
        }
    }

    async listFiles() {
        const folder = storage.ref().child("/images");
        const list = await folder.listAll();

        let filePromises = [];
        list.items.forEach(ref => {
            filePromises.push(ref.getDownloadURL());
        });

        const files = await Promise.all(filePromises);
        this.setState({files})
    }

    onBack() {
        this.props.history.push("/Menu");
    }

    render() {
        //let {posts} = this.state;
        return (
            <div>
                <div className="fileChoser">
                    <p>
                        <label>File: </label>
                        <input type="file" name="txtFile" value={this.state.txtFile} onChange={this.onChoseFile}
                               accept=".jpg, .jpeg, .png"/>
                        <p>
                        <input value="Enviar" className="btnUpload" type="button" onClick={this.onUpload}/>
                        <input value="Voltar" type="button" onClick={this.onBack}/>
                        </p>
                    </p>
                </div>
                <div className="gallery">
                    <ul>
                        {this.state.files.map(f =>
                            <li><img src={f} alt="photo"/></li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        //list().then(posts => {
            //this.setState({posts: posts})
        //});
        this.listFiles().then();
    }
}


export default Gallery;