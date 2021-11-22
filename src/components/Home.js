import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  TableBody,
  Input,
  InputLabel,
  FormControl,
  FormGroup,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import moment from "moment";
import TextField from "@mui/material/TextField";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
const useStyles = makeStyles({
  table: {
    width: "80%",
    margin: "50px 0 0 175px",
  },
  thead: {
    "& > *": {
      fontSize: 20,
      background: "#000000",
      color: "#FFFFFF",
    },
  },
  row: {
    "& > *": {
      fontSize: 18,
    },
  },
  container: {
    width: "105%",
    margin: "0 0 0 0",
    "& > *": {
      marginRight: 30,
      marginLeft: 30,
    },
  },
  button: {
    width: "33%",
    margin: "10px 0 0 0",
    "& > *": {},
  },
});
const Home = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");

  const [birthDate, setBirthDate] = useState(null);
  const clearDate = () => {
    setBirthDate(null);
  };
  const clearPhoneNumber = () => {
    setPhoneSearch("");
  };

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteContact = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
    toast.success(`Contact deleted successfully!!!`);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        style={{ margin: "50px 0 0 175px", width: "80%" }}
      >
        <Grid item lg={8} md={12} sm={12} xs={12}>
          <Grid container>
            <Grid item>
              <FormGroup className={classes.container}>
                <FormControl>
                  <InputLabel htmlFor="my-input">
                    Search By Name And Email
                  </InputLabel>
                  <Input
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                  />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item>
              <FormControl className={classes.container}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label=" Search By Birth Date"
                    value={birthDate}
                    inputVariant="outlined"
                    onChange={(newBirthDate) => {
                      setBirthDate(moment(newBirthDate).format("YYYY-MM-DD"));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <Button
                  color="secondary"
                  variant="contained"
                  title="Clear Date"
                  onClick={clearDate}
                  style={{ marginTop: 10 }}
                >
                  Clear Date
                </Button>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.container}>
                {/* <InputLabel>Search By Phone Number</InputLabel>
                <Input
                  type="number"
                  onChange={(event) => {
                    setPhoneSearch(event.target.value);
                  }}
                /> */}
                <PhoneInput
                  placeholder="Search By Phone Number"
                  value={phoneSearch}
                  onChange={setPhoneSearch}
                  style={{ marginTop: 20 }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  title="Clear Date"
                  onClick={clearPhoneNumber}
                  style={{ marginTop: 10 }}
                >
                  Clear PhoneNumber
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={4} md={12} sm={12} xs={12}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            title="Add Contact"
            component={Link}
            to={`/add`}
          >
            Add Contact
          </Button>
        </Grid>
      </Grid>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>BirthDate</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts
            .filter((contact) => {
              if (
                searchTerm === "" &&
                birthDate === null &&
                phoneSearch === ""
              ) {
                return contact;
              } else if (
                (contact.birthDate.includes(birthDate) || birthDate === null) &&
                (contact.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                  contact.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  searchTerm === "") &&
                (contact.phone.includes(phoneSearch) ||
                  contact.phoneSearch === "")
              ) {
                return contact;
              }
              return false;
            })
            .map((contact, id) => (
              <TableRow className={classes.row} key={id}>
                <TableCell>{id + 1}</TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.birthDate}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    title="Edit"
                    style={{ marginRight: 10 }}
                    component={Link}
                    to={`/edit/${contact.id}`}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    title="Delete"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        `Do you really want to delete Contact of ${
                          contact.name.split(" ")[0]
                        }'s`
                      );
                      if (confirmBox === true) {
                        deleteContact(contact.id);
                      } else {
                        return toast.error(
                          `Canceled deleting ${
                            contact.name.split(" ")[0]
                          }'s contact`
                        );
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Home;
