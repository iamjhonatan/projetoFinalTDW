import React from 'react';
import list from "../../dao";
import Post from '../../component/Post';
import './PostList.css';
import {Link} from "react-router-dom";


class PostList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filter: ""
        };
        this.filterChange = this.filterChange.bind(this); // o estado que será chamado na função filterChange
    }

    filterChange(e){
        this.setState(
            {
                filter: e.target.value //alterando somente a propriedade FILTER
            }
        )
    }

    render() {
        let {posts, filter} = this.state;

        if (filter) { // filtrando pelo título
            posts = posts.filter(({title = ""}) => title.includes(filter));
        }
        return (
            <div>
                <div>
                    Filtro: <input type="text" value={this.state.filter} onChange={this.filterChange}/>
                </div>
                <div class="imagens">
                    {posts.map(
                        p => <Post key={p.id} data={p}/> // o objeto P é o POST, tem o ID e passa como KEY na tag POST
                    )}
                </div>
                <p><Link to="/Menu">Fechar</Link></p>
            </div>
        );
    }

    componentDidMount() {
        list().then(posts => {
            this.setState({posts: posts })
        });
    }
}

export default PostList;