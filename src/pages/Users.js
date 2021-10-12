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
import { getComments } from "../redux/actions/comment.action";
import { Pagination } from "@material-ui/lab";
import { getAllUsers } from "../redux/actions/user.action";
import UpdateUserModal from "../components/UI/updateUserModal/UpdateUserModal";

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

function Users() {
  const [openModal, setOpenModal] = useState(false);
  const [doctorDocId, setDoctorDocId] = useState(null);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUsers(page));
  }, []);

  const openModalHandler = id => {
    setDoctorDocId(id);
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    dispatch(getComments(value));
  };

  const turnToFarsi = user => {
    if (user === "user") {
      return "کاربر";
    } else if (user === "doctor") {
      return "دکتر";
    }
  };

  return (
    <Layout>
      <HeadTitle title="کامنت ها" />
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>شماره تماس</TableCell>
              <TableCell>سطح</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map(user => (
                <TableRow
                  key={user._id}
                  onClick={() => openModalHandler(user._id)}
                >
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{turnToFarsi(user.role)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className={classes.paginate}>
          <Pagination
            count={Math.ceil(users && users.length / 10)}
            page={page}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            onChange={handlePageChange}
          />
        </div>
      </TableContainer>
      <UpdateUserModal
        doctorDocId={doctorDocId}
        openModalHandler={openModal}
        closeModalHandler={closeModalHandler}
      />
    </Layout>
  );
}

export default Users;
