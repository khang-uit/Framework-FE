import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import KeepIcon from '@material-ui/icons/Check';
import { Button, CardMedia } from '@material-ui/core';

import { getReports, deletePost} from  '../../../actions/posts.js';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
  });
  
const ListReport = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        const getListReports = async () => {
            const res = await dispatch(getReports())
            setData(res.data);
        };
        getListReports();
    }, []);

    const classes = useStyles();

    return(
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Creator</TableCell>
                        <TableCell align="right">Reported</TableCell>
                        <TableCell align="right">Message</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((report) => (
                        <TableRow key={report?.id}>
                        <TableCell component="th" scope="row">
                        <CardMedia className={classes.media} image={report?.post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={report?.post.title} />
                        </TableCell>
                        <TableCell align="right"><a href={`/posts/${report?.post.id}`} target="_blank">{report?.post.title}</a></TableCell>
                        <TableCell align="right">{report?.creator.email}</TableCell>
                        <TableCell align="right">{report?.reported.email}</TableCell>
                        <TableCell align="right">{report?.message}</TableCell>
                        <TableCell align="right">
                        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(report?.post.id))}>
                            <DeleteIcon fontSize="small" /> 
                            Delete
                        </Button>
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(report?.post.id))}>
                            <KeepIcon fontSize="small" /> 
                            Keep
                        </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default ListReport;