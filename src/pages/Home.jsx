import React, {useEffect, useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags} from "../redux/slices/posts";
export const Home = () => {
    const dispatch = useDispatch();
    const {posts, tags} = useSelector(state => state.posts);
    const userData = useSelector(state => state.auth.data)
    const isPostsLoading = posts.status === 'loading';
    const isTagsLoading = tags.status === 'loading';
    const [selectedTab, setSelectedTab] = useState(0);

    const TabEnum = {
      NEW: 0,
      POPULAR: 1
    }

    useEffect(() => {
        dispatch(fetchPosts(selectedTab));
        dispatch(fetchTags());
    }, [dispatch, selectedTab])


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={selectedTab} aria-label="basic tabs example">
        <Tab label="Новые" onClick={() => setSelectedTab(TabEnum.NEW)}/>
        <Tab label="Популярные" onClick={() => setSelectedTab(TabEnum.POPULAR)}/>
      </Tabs>
      <Grid container spacing={4}>
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
                  commentsCount={item.comments.length}
                  tags={item.tags}
                  isEditable={userData?._id === item.author._id}
              />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
