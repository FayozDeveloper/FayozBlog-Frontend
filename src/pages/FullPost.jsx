import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const [data, setData] = useState({});
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {
        axios.get(`/posts/${id}`).then(res => {
            setData(res.data);
            setComments(res.data.comments);
            setLoading(false);
        }).catch((err) => {
            console.warn(err);
            alert('Ошибка при получение статьм');
        })
    }, [id])

    const handleAddComment = async (text) => {
      try {
          const { data } = await axios.post(`/posts/${id}/comments`, {
            postId: id,
            text
          });
          setComments((prev) => [...prev, data]);;
      } catch (err) {
          console.warn('Ошибка при добавлении комментария:', err);
          alert('Не удалось добавить комментарий');
      }
    }

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost/>
    }

    return (
        <>
          <Post
            id={data._id}
            title={data.title}
            imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
            user={data.author}
            createdAt={data.createdAt}
            viewsCount={data.views}
            commentsCount={comments.length}
            tags={data.tags}
            isFullPost
          >
              <ReactMarkdown children={data.text}/>
          </Post>
          <CommentsBlock
            items={comments}
            isLoading={false}
          >
            <AddComment onAddComment={handleAddComment} />
          </CommentsBlock>
        </>
  );
};
