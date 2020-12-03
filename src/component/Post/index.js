import React from "react";
import WrittenBy from "../WrittenBy";


function Post(props) {
    const post = props.data;

    return (<article>
        <h1>{post.title}</h1>
        <WrittenBy name={post.autor} email={post.autor} />
        {post.body}
    </article>);
}

export default Post;