import React, { useEffect, useState } from "react";
import HeadTitle from "../components/HeadTitle";
import Layout from "../components/Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getComments,
  updateComment,
} from "../redux/actions/comment.action";
import { Button } from "@material-ui/core";
import YesOrNoDialog from "../components/UI/YesOrNoDialog/YesOrNoDialog";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: "2rem",
  },
  table: {
    minWidth: 650,
  },
  paginate: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "center",
  },
});

function Comments() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { comments, done, allDocs } = useSelector(state => state.comment);
  useEffect(() => {
    dispatch(getComments(page));
  }, []);

  useEffect(() => {
    dispatch(getComments(page));
  }, [openDeleteDialog, done]);

  useEffect(() => {
    if (done) {
      setOpenDeleteDialog(false);
    }
  }, [done]);

  const handleApproveComment = id => dispatch(updateComment(id));

  const DialogHandleClose = () => {
    setOpenDeleteDialog(false);
  };

  const DeleteProductHandler = id => {
    dispatch(deleteComment(id));
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    dispatch(getComments(value));
  };

  return (
    <Layout>
      <HeadTitle title="کامنت ها" />
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>متن کامنت</TableCell>
              <TableCell align="right">نوشته شده توسط</TableCell>
              <TableCell align="right">برای محصول</TableCell>
              <TableCell align="center">تایید کامنت</TableCell>
              <TableCell align="center">حذف کامنت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments &&
              comments.map(comment => (
                <TableRow key={comment._id}>
                  <TableCell>{comment.body}</TableCell>
                  <TableCell align="right">
                    {comment.user && comment.user.phone}
                  </TableCell>
                  <TableCell align="right">
                    {comment.product && comment.product.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={handleApproveComment.bind(null, comment._id)}
                      color="primary"
                    >
                      تایید
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      حذف
                    </Button>
                    <YesOrNoDialog
                      open={openDeleteDialog}
                      DialogHandleClose={DialogHandleClose}
                      dispatch={DeleteProductHandler.bind(null, comment._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className={classes.paginate}>
          <Pagination
            count={Math.ceil(allDocs / 10)}
            page={page}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            onChange={handlePageChange}
          />
        </div>
      </TableContainer>
    </Layout>
  );
}

export default Comments;
