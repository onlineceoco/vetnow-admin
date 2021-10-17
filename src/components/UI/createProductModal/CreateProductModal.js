import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  makeStyles,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/actions/product.action";
import Alert from "../Alert";
import { Close } from "@material-ui/icons";

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
    imageBoxContainer: {
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
    box: {
      height: 200,
      width: 200,
      marginLeft: "1.5rem",
      border: "1px dotted #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1rem",
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
  };
});

function CreateProductModal({ openModalHandler, closeModalHandler }) {
  const [name, setName] = useState("");
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
  const descreption = editorState.getCurrentContent().getPlainText();
  const classes = styles();
  const alertState = useSelector(state => state.alert);
  const productState = useSelector(state => state.product);
  const progress = useSelector(state => state.product.progress);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productState.done) {
      closeModalHandler();
      setName("");
      setQuantity("");
      setPrice("");
      setEditorState(EditorState.createEmpty());
      setImage1(null);
      setImage2(null);
      setImage3(null);
      setImage4(null);
      setImagePreview1(null);
      setImagePreview2(null);
      setImagePreview3(null);
      setImagePreview4(null);
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
    dispatch(createProduct(formData));
  };

  const body = (
    <>
      <Card className={classes.card}>
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
                  ایجاد محصول جدید
                </Typography>
              </Grid>
              <Grid item>
                <Paper style={{ marginLeft: "15px", cursor: "pointer" }}>
                  <Close onClick={() => closeModalHandler()} />
                </Paper>
              </Grid>
            </Grid>
            {alertState.error && (
              <Alert
                error={alertState.error && alertState.error}
                kind={alertState.error && alertState.kind}
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
                    <MenuItem value="کنسانتره">مکمل</MenuItem>
                    <MenuItem value="مکمل">کنسانتره</MenuItem>
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

            <InputLabel style={{ margin: "25px 15px 15px 15px" }}>
              عکس محصول :
            </InputLabel>
            <Grid container className={classes.imageBoxContainer}>
              <Grid item>
                <Card
                  className={classes.box}
                  variant="elevation"
                  component="label"
                >
                  {imagePreview1 ? (
                    <img
                      className={classes.image}
                      src={imagePreview1}
                      alt={imagePreview1.name}
                    />
                  ) : (
                    " کلیک برای آپلود"
                  )}

                  <input
                    type="file"
                    hidden
                    onChange={e => {
                      setImage1(e.target.files[0]);
                      setImagePreview1(URL.createObjectURL(e.target.files[0]));
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
                  {imagePreview2 ? (
                    <img
                      className={classes.image}
                      src={imagePreview2}
                      alt={imagePreview2.name}
                    />
                  ) : (
                    " کلیک برای آپلود"
                  )}

                  <input
                    type="file"
                    hidden
                    onChange={e => {
                      setImage2(e.target.files[0]);
                      setImagePreview2(URL.createObjectURL(e.target.files[0]));
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
                  {imagePreview3 ? (
                    <img
                      className={classes.image}
                      src={imagePreview3}
                      alt={imagePreview3.name}
                    />
                  ) : (
                    " کلیک برای آپلود"
                  )}

                  <input
                    type="file"
                    hidden
                    onChange={e => {
                      setImage3(e.target.files[0]);
                      setImagePreview3(URL.createObjectURL(e.target.files[0]));
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
                  {imagePreview4 ? (
                    <img
                      className={classes.image}
                      src={imagePreview4}
                      alt={imagePreview4.name}
                    />
                  ) : (
                    " کلیک برای آپلود"
                  )}

                  <input
                    type="file"
                    hidden
                    onChange={e => {
                      setImage4(e.target.files[0]);
                      setImagePreview4(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </Card>
              </Grid>
            </Grid>

            <CardActions className={classes.confirmBtnWrapper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.confirmBtn}
                type="submit"
              >
                ایجاد محصول
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
        disableEnforceFocus
        open={openModalHandler}
        onClose={closeModalHandler}
        className={classes.modal}
      >
        {body}
      </Modal>
    </>
  );
}

export default CreateProductModal;
