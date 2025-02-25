import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Post} from "../../components";
import {useDispatch, useSelector} from "react-redux";
import {fetchPostByTag} from "../../redux/slices/posts";

export const TagPosts = () => {
    const {tag} = useParams()
    const dispatch = useDispatch();
    const {posts} = useSelector(state => state.posts);
    const userData = useSelector(state => state.auth.data)
    const isPostsLoading = posts.status === 'loading';

    useEffect(() => {
        dispatch(fetchPostByTag(tag));
    }, [dispatch, tag])

    return (
        <>
            <Grid xs={8} item>
                {( isPostsLoading ? [...Array(5)] : posts.items).map((item, index) =>
                    isPostsLoading ? <Post key={index} isLoading={true}/> :  (
                        <Post
                            key={item._id}
                            id={item._id}
                            title={item.title}
                            imageUrl={item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ''}
                            user={item.author}
                            createdAt={item.createdAt}
                            viewsCount={item.views}
                            commentsCount={3}
                            tags={item.tags}
                            isEditable={userData?._id === item.author._id}
                        />
                    ))}
            </Grid>
        </>
    )
}