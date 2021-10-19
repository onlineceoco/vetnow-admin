import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState } from "draft-js";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Paper,
  Box,
  LinearProgress,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  updateProduct,
} from "../../../redux/actions/product.action";
import Alert from "../Alert";
import { baseUrl } from "../../../UrlConfig";
import { Close, DeleteForever } from "@material-ui/icons";
import YesOrNoDialog from "../YesOrNoDialog/YesOrNoDialog";

const styles = makeStyles(theme => {
  return {
    modal: {
      overflowY: "scroll",
    },
    row: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
    box: {
      maxWidth: 200,
      width: 200,
      height: 200,
      margin: "1.5rem",
      border: "1px dotted #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    image: {
      width: "100%",
      objectFit: "contain",
    },
    confirmBtnWrapper: {
      dispaly: "flex",
      justifyContent: "center",
    },
    confirmBtn: {
      width: "inherit",
    },
    lastSectionContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  };
});

function UpdateProductModal({
  openModalHandler,
  closeModalHandler,
  idForUpdateProduct,
}) {
  const productState = useSelector(state => state.product);
  const [name, setName] = useState(
    idForUpdateProduct.row && idForUpdateProduct.row.name,
  );
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [imagePreview1, setImagePreview1] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [imagePreview4, setImagePreview4] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const descreption = editorState.getCurrentContent().getPlainText();
  const classes = styles();
  const alertState = useSelector(state => state.alert);
  const dispatch = useDispatch();
  const des = idForUpdateProduct && idForUpdateProduct.row.descreption;
  const content = ContentState.createFromText(des);
  const progress = useSelector(state => state.product.progress);

  useEffect(() => {
    setName(idForUpdateProduct && idForUpdateProduct.row.name);
    setQuantity(idForUpdateProduct && idForUpdateProduct.row.quantity);
    setCategory(idForUpdateProduct && idForUpdateProduct.row.category);
    setPrice(idForUpdateProduct && idForUpdateProduct.row.price);
    setEditorState(EditorState.createWithContent(content));
    setImage1(idForUpdateProduct && idForUpdateProduct.row.images[0]);
    setImage2(idForUpdateProduct && idForUpdateProduct.row.images[1]);
    setImage3(idForUpdateProduct && idForUpdateProduct.row.images[2]);
    setImage4(idForUpdateProduct && idForUpdateProduct.row.images[3]);
  }, [openModalHandler]);

  useEffect(() => {
    if (productState.done) {
      setOpenDeleteDialog(false);
      closeModalHandler();
      setName(idForUpdateProduct && idForUpdateProduct.row.name);
      setQuantity(idForUpdateProduct && idForUpdateProduct.row.quantity);
      setCategory(idForUpdateProduct && idForUpdateProduct.row.category);
      setPrice(idForUpdateProduct && idForUpdateProduct.row.price);
      setEditorState(EditorState.createWithContent(content));
    }
  }, [productState.done]);

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("images", image1);
    formData.append("images", image2);
    formData.append("images", image3);
    formData.append("images", image4);
    formData.append("descreption", descreption);
    dispatch(
      updateProduct(formData, idForUpdateProduct && idForUpdateProduct.row._id),
    );
  };
  const deleteDialogHandleClose = () => {
    setOpenDeleteDialog(false);
  };

  const DeleteProductHandler = id => {
    dispatch(deleteProduct(id));
  };
  const body = (
    <>
      <Card>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={submitHandler}>
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Typography
                  style={{ marginRight: "15px", fontWeight: "bold" }}
                  variant="h5"
                  gutterBottom
                  align="center"
                >
                  به روز رسانی محصول
                </Typography>
              </Grid>
              <Grid item>
                <Paper style={{ marginLeft: "15px", cursor: "pointer" }}>
                  <Close onClick={() => closeModalHandler()} />
                </Paper>
              </Grid>
            </Grid>
            {alertState.kind && (
              <Alert
                error={alertState.kind && alertState.error}
                kind={alertState.kind && alertState.kind}
              />
            )}
            {/* row One */}
            <Grid container>
              <Grid item xs={12} className={classes.row}>
                <TextField
                  className={classes.input}
                  fullWidth
                  variant="outlined"
                  label="نام محصول"
                  size="small"
                  onChange={e => setName(e.target.value)}
                  required
                  value={name}
                />
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.formControl}
                  size="small"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    دسته بندی
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="دسته بندی"
                    variant="outlined"
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                  >
                    <MenuItem>
                      <em>- داروخانه</em>
                    </MenuItem>
                    <MenuItem value="افزودنی ها">افزودنی ها</MenuItem>
                    <MenuItem value="واکسن ها">واکسن ها</MenuItem>
                    <MenuItem value="ویتامین ها">ویتامین ها</MenuItem>
                    <MenuItem value="آنتی بیوتیک ها">آنتی بیوتیک ها</MenuItem>
                    <MenuItem value="ضد عفونی کننده ها">
                      ضد عفونی کننده ها
                    </MenuItem>
                    <MenuItem>
                      <em>-- فروشگاه</em>
                    </MenuItem>
                    <MenuItem value="کنسانتره">کنسانتره</MenuItem>
                    <MenuItem value="مکمل">مکمل</MenuItem>
                    <MenuItem value="دان آماده">دان آماده</MenuItem>
                    <MenuItem value="تجهیزات پرورشی">تجهیزات پرورشی</MenuItem>
                    <MenuItem value="پرندگان زینتی">پرندگان زینتی</MenuItem>
                    <MenuItem>
                      <em>--- جوجه گوشتی</em>
                    </MenuItem>
                    <MenuItem value="راس 308">راس 308</MenuItem>
                    <MenuItem value="کاپ">کاپ</MenuItem>
                    <MenuItem value="هوبارد">هوبارد</MenuItem>
                    <MenuItem value="آرین">آرین</MenuItem>
                    <MenuItem value="آبراکرز پلاس">آبراکرز پلاس</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {/* row two */}
            <Grid container>
              <Grid item xs={12} className={classes.row}>
                <TextField
                  className={classes.input}
                  fullWidth
                  variant="outlined"
                  label="تعداد محصول"
                  size="small"
                  required
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
                <TextField
                  className={classes.input}
                  fullWidth
                  label="قیمت"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item style={{ margin: "15px" }}>
              <InputLabel style={{ marginBottom: "1rem" }}>
                توضیحات محصول :
              </InputLabel>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "2px",
                  minHeight: "300px",
                }}
              >
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                />
              </div>
            </Grid>

            <Grid
              className={classes.lastSectionContainer}
              container
              style={{ margin: "15px" }}
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                item
              >
                <InputLabel>عکس محصول :</InputLabel>
                <Grid className={classes.imagesContainer} item>
                  <Card
                    className={classes.box}
                    variant="elevation"
                    component="label"
                  >
                    {image1 ? (
                      <img
                        className={classes.image}
                        src={`${baseUrl}/img/products/${image1}`}
                        alt={image1}
                      />
                    ) : (
                      <p>کلیک برای آپلود</p>
                    )}

                    <input
                      type="file"
                      hidden
                      onChange={e => {
                        setImage1(e.target.files[0]);
                        setImagePreview1(
                          URL.createObjectURL(e.target.files[0]),
                        );
                      }}
                    />
                  </Card>
                </Grid>
                <Grid item>
                  <Card
                    className={classes.box}
                    variant="elevation"
                    component="label"
                  >
                    {image2 ? (
                      <img
                        className={classes.image}
                        src={`${baseUrl}/img/products/${image2}`}
                        alt={image2}
                      />
                    ) : (
                      <p>کلیک برای آپلود</p>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={e => {
                        setImage2(e.target.files[0]);
                        setImagePreview2(
                          URL.createObjectURL(e.target.files[0]),
                        );
                      }}
                    />
                  </Card>
                </Grid>
                <Grid item>
                  <Card
                    className={classes.box}
                    variant="elevation"
                    component="label"
                  >
                    {image3 ? (
                      <img
                        className={classes.image}
                        src={`${baseUrl}/img/products/${image3}`}
                        alt={image3}
                      />
                    ) : (
                      <p>کلیک برای آپلود</p>
                    )}

                    <input
                      type="file"
                      hidden
                      onChange={e => {
                        setImage3(e.target.files[0]);
                        setImagePreview3(
                          URL.createObjectURL(e.target.files[0]),
                        );
                      }}
                    />
                  </Card>
                </Grid>
                <Grid item>
                  <Card
                    className={classes.box}
                    variant="elevation"
                    component="label"
                  >
                    {image4 ? (
                      <img
                        className={classes.image}
                        src={`${baseUrl}/img/products/${image4}`}
                        alt={image4}
                      />
                    ) : (
                      <p>کلیک برای آپلود</p>
                    )}

                    <input
                      type="file"
                      hidden
                      onChange={e => {
                        setImage4(e.target.files[0]);
                        setImagePreview4(
                          URL.createObjectURL(e.target.files[0]),
                        );
                      }}
                    />
                  </Card>
                </Grid>
              </Grid>
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  height: "auto",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
                item
              >
                <Typography gutterBottom>محصول حذف شود ؟</Typography>
                <Button
                  color="secondary"
                  endIcon={<DeleteForever />}
                  variant="outlined"
                  onClick={() => {
                    setOpenDeleteDialog(true);
                  }}
                >
                  حذف
                </Button>
                <YesOrNoDialog
                  open={openDeleteDialog}
                  DialogHandleClose={deleteDialogHandleClose}
                  dispatch={DeleteProductHandler.bind(
                    null,
                    idForUpdateProduct && idForUpdateProduct.row._id,
                  )}
                />
              </Grid>
            </Grid>
            <CardActions className={classes.confirmBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.confirmBtn}
                type="submit"
              >
                به روز رسانی
              </Button>
            </CardActions>
            {progress > 0 && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );

  return (
    <>
      <Modal
        open={openModalHandler}
        onClose={closeModalHandler}
        className={classes.modal}
      >
        {body}
      </Modal>
    </>
  );
}

export default UpdateProductModal;
