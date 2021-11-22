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

import moment from "moment";
import TextField from "@mui/material/TextField";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
const useStyles = makeStyles({
  table: {
    width: "80%",
    margin: "50px 0 0 100px",
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
    width: "10%",
    margin: "0 0 0 0",
    "& > *": {
      marginRight: 20,
    },
  },
});
const Home = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  const [birthDate, setBirthDate] = useState(null);
  const clearDate = () => {
    setBirthDate(null);
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
        direction="row"
        display="flex"
        justifyContent="center"
        style={{ marginTop: 25 }}
      >
        <FormGroup className={classes.container}>
          <FormControl>
            <InputLabel htmlFor="my-input">Search By Name</InputLabel>

            <Input
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </FormControl>
        </FormGroup>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          style={{ marginTop: 20 }}
        >
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
        >
          {" "}
          Clear Date{" "}
        </Button>
        <Button
          color="primary"
          variant="contained"
          title="Add Contact"
          component={Link}
          to={`/add`}
          style={{ marginTop: 20, marginLeft: 750 }}
        >
          Add Contact
        </Button>
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
              if (searchTerm === "" && birthDate === null) {
                return contact;
              } else if (
                (contact.birthDate.includes(birthDate) || birthDate === null )&&
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return contact;
              }
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
