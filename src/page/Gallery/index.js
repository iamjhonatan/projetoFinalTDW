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
            files: [],
            filesAutor:[],
            imagens:[]
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

            var autor =  {customMetadata:{autor:localStorage.getItem('user')}};
            await folder.child(file.name).put(file,autor);
            await this.listFiles();
        } catch (err) {
            alert(err);
        }
    }

    async listFiles() {
        const folder = storage.ref().child("/images");
        const list = await folder.listAll();

        let filePromises = [];
        let filesPromisesAutor=[]
        list.items.forEach((ref,index) => {

            filePromises.push(ref.getDownloadURL());
            filesPromisesAutor.push(ref.getMetadata());

        });

        const files = await Promise.all(filePromises)
        const filesAutor = await Promise.all(filesPromisesAutor);
        this.setState({files});
        this.setState({filesAutor});

        const imagens = []
        this.state.filesAutor.map((f,index1) =>{
            this.state.files.map((i,index2) =>{
                if(index1 ==index2) {

                    if(f.customMetadata){
                        imagens[index1] = {img:i,autor:f.customMetadata.autor};
                    }


                }

            });

        });
        this.setState({imagens});

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

                        {  this.state.imagens.map(x=>{
                            return (<li><img src={x.img} alt="photo"/>{x.autor}</li>)
                        })

                        }
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