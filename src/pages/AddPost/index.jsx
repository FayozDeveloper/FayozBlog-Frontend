import React, {useState, useRef, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/auth";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
    const {id} = useParams();
    const isAuth = useSelector(selectIsAuth);
    const navigate = useNavigate();
    // const [isLoading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef = useRef(null);
    const isEditing = Boolean(id)
  const handleChangeFile = async (event) => {
      try {
          const formData = new FormData();
          const file = event.target.files[0];
          formData.append('image', file);
          // POST /UPLOAD URL FAQATGINA IMAGE UPLOAD QIVOLISH UCHUN KERE
          const {data} = await axios.post('/upload', formData)
          await setImageUrl(data.url)
          await console.log(data)
      } catch (e){
          console.warn(e)
          alert('Error on uploading file!')
      }
  };

  const onClickRemoveImage = () => {
      setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);


  const onSubmit = async () => {
      try {
          const fields = {
              title,
              text,
              imageUrl,
              tags
          }
          // POST /posts URL bizaga yozvotgan postimizani upload qilib Id ovolib navigate qivolish uchun kere, BUNGA TITLE, TEXT, IMAGE, TAG la ketadi 
          const {data} = isEditing
              ? await axios.patch(`/posts/${id}`, fields)
              : await axios.post('/posts', fields)

          const _id = isEditing ? id : data._id
          navigate(`/posts/${_id}`)
      } catch (e) {
          console.warn(e);
          alert('Error on creating post')
      }
  }


  useEffect(() => {
      if (id){
          axios.get(`/posts/${id}`).then(({data}) => {
              setTitle(data.title);
              setText(data.text);
              setTags(data.tags.join(','));
              setImageUrl(data.imageUrl)
          }).catch((error) => {
              console.log(error)
          })
      }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
    console.log(title, tags, text)
  if (!window.localStorage.getItem('token') && !isAuth){
      return <Navigate to={'/'}/>
  }

  return (
    <Paper  style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
          <>
             <Button variant="contained"  color="error" onClick={onClickRemoveImage}>
               Удалить
              </Button>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
         </>
      )}
      <br />
      <br />
      <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Заголовок статьи..."
            fullWidth
      />
      <TextField
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" onClick={onSubmit} variant="contained">
            {isEditing ? 'Сохранить' :'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
