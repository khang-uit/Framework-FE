import React, { useEffect, useState} from 'react'
import { Paper, Typography, CircularProgress, Divider, Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import ReportIcon from '@material-ui/icons/Report';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import CommentSection from './CommentSection';
import { getPost, getPostsBySearch, report } from '../../actions/posts';
import useStyles from './styles';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const { id } = useParams();
    const [isVisible, setIsVisible] = useState(false);
    const [msg, setMsg] = useState("");
    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if(post) {
            // dispatch(getPostsBySearch( { search: 'none', tags: post?.tags.join(',') } ));
        }
    }, [post])

    if(!post) return null;

    if(isLoading) {
        return (
        <Paper elevation={6} className={classes.loadingPage}>
            <CircularProgress size={'7em'} />
        </Paper>
        );
    }
    console.log(post)
    const recommendedPosts = posts.filter(({ id }) => id !== post.id);
    const reportId = (id) => {
        setIsVisible(true)
    }
    const openPost = (id) => history.push(`/posts/${id}`);
    const reports = () => {
        dispatch(report(post.id, msg))
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    {/* <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Button style={{color: 'red'}} onClick={() => reportId(post.id)}>
                        <ReportIcon fontSize="small" />
                    </Button>
                    <Divider style={{ margin: '20px 0' }} />
                    {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} /> */}
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(({ title, name, message, likes, selectedFile, id }) => (
                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(id)} key={id}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                        <img src={selectedFile} alt="recommendedPosts" width="200px" />
                    </div>
                    ))}
                </div>
                </div>
            )}
            <Modal
                centered
                width={'full'}
                title={<h3 className="text-[22px] font-bold">Nhập nội dung báo cáo</h3>}
                closeIcon={<CloseIcon style={{ fontSize: '22px' }} />}
                style={{
                borderRadius: '10px',
                overflow: 'hidden',
                padding: 0,
                }}
                visible={isVisible}
                onCancel={() => setIsVisible(false)}
                footer={
                    <div>
                        <TextField
                            name="message"
                            id="outlined-basic"
                            label="Report"
                            multiline
                            rows={4}                 
                            variant="outlined"
                            fullWidth
                            inputProps={{
                                maxlength: 300
                            }}
                            helperText={`${msg.length}/${300}`}
                            onChange={(e) => setMsg(e.target.value )}
                        />
                        <Button
                            type="primary"
                            style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            width: '100%',
                            height: 'auto',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            borderRadius: '5px',
                            color: "red"
                            }}
                            onClick={() => reports()}
                        >
                            Báo cáo
                        </Button>
                    </div>
                }
                >
                <div id="canvas_container"></div>
                </Modal>
        </Paper>
    )
}

export default PostDetails;
