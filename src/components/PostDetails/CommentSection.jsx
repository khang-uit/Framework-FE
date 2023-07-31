import  React, { useState, useRef } from 'react';
import { message } from 'antd';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    console.log(post.comments)
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const commentsRef = useRef();


    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        message.loading({ content: 'Loading...', key: 'comment' });
        const response = await dispatch(commentPost(finalComment, post.id));
        setComment('');
        
        if (response.error === true) {
            setTimeout(() => {
              message.error({ content: response.msg, key: 'comment', duration: 2 });
            }, 1000);
            return;
        }
        if (response.error === false) {
            setComments(response.post.comments);
        }

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>
                                {c.userId}
                            </strong>
                            : {c.content}
                            
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                    
                {user?.result?.name && (
                    <div style={{width: '70%'}}>
                        <Typography gutterBottom variant="h6">Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" color="primary" onClick={handleClick}>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;