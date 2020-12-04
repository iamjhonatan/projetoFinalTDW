import React, {useState, useEffect} from 'react'
import {db} from "../../firebase";
import Post from "../../component/Post"
import {Link, useParams} from "react-router-dom";
import {Clock, useClock} from "../../component/Clock";
import "./PostForm.css";

function useInputs(initialState = {}) {
    const [inputs, setInputs] = useState(initialState);

    const onInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    }

    return {
        inputs,
        setInputs,
        onInputChange
    };
}

async function addPost(date, post) {
    post.tags = post.tags.split(" ");

    let added = await db.collection("post").add({
        date: date,
        userId: "1",
        ...post
    });
    alert("Adicionado: " + added.id);
}

function PostForm(props) {
    let params = useParams();
    let {inputs, setInputs, onInputChange} = useInputs(
        {
            title: "",
            body: "",
            tags: "",
            autor: localStorage.getItem('user')
        }
    );
    let date = useClock();
    useEffect(() => {
        const {id} = params;
        if (id === 'new') {
            return;
        }

        db.collection("post")
            .doc(id).get().then(data => {
            let post = data.data();
            if (post) setInputs(post);
        });
    }, []);

    return (
        <div class="container">
            <Clock />
            <p><label htmlFor="txtTitle">Título: </label><input name="title" value={inputs.title} type="text" onChange={onInputChange}/></p>
            <p><label htmlFor="txtBody">Post: </label></p>
            <p>
                <textarea rows="10" name="body" value={inputs.body} onChange={onInputChange} />
            </p>
            <p><label htmlFor="txtTags">Tags: </label><input name="tags" value = {inputs.tags} type="text" onChange={onInputChange}/></p>
            <p><input type="button" value="Postar" onClick={() => addPost(date, inputs)}/></p>
            <p><Link to="/Menu">Fechar</Link></p>
            <p />
            <p>Preview</p>
            <div>
                <Post data={{name: "Undefined", ...inputs}} />
            </div>
        </div>
    );
}

export default PostForm;