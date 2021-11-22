import React, { useState } from "react";
import validator from "validator";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import moment from "moment";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  FormControl,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  makeStyles,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "33%",
    margin: "3% 0 0 35%",
    "& > *": {
      marginTop: 20,
    },
  },
});
const AddContact = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [birthDate, setBirthDate] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    const checkPhone = contacts.find(
      (contact) => contact.phone === phone && phone
    );

    if (!name || !email || !phone || !birthDate) {
      return toast.warning("pls fill the all fields!!!");
    }
    if (checkEmail) {
      return toast.error("this email is already exists!!!");
    }
    if (checkPhone) {
      return toast.error("this phone number is already exists!!");
    }
    if (!validator.isEmail(email)) {
      return toast.warning("pls fill valid email!!");
    }
    if (!validator.isDate(birthDate)) {
      return toast.warning("pls fill valid birthDate!!");
    }
    if (phone.length !== 13) {
      return toast.warning("pls fill valid mobile number!!!");
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      name,
      email,
      phone,
      birthDate,
    };

    dispatch({ type: "ADD_CONTACT", payload: data });
    toast.success("Contact added successfully!!");
    navigate("/");
  };
  return (
    <>
      <Grid container direction="row" display="flex" justifyContent="center">
        <Typography variant="h4" style={{ marginTop: 50 }}>
          Add Contact
        </Typography>
      </Grid>

      <Grid container>
        <FormGroup className={classes.container}>
          <FormControl>
            <InputLabel htmlFor="my-input">Name</InputLabel>
            <Input
              id="my-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <Input
              id="my-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            style={{ marginTop: 20 }}
          >
            <DatePicker
              label="Birth Date"
              value={birthDate}
              inputVariant="outlined"
              onChange={(newBirthDate) => {
                setBirthDate(moment(newBirthDate).format("YYYY-MM-DD"));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <FormControl>
            {/* <InputLabel htmlFor="my-input">Phone Number</InputLabel>
            <Input
              id="my-input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /> */}
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              onChange={setPhone}
              style={{ marginTop: 25 }}
            />
          </FormControl>

          <FormControl>
            <Button
              variant="contained"
              color="primary"
              title="Add Contact"
              style={{ marginTop: 25 }}
              onClick={handleSubmit}
            >
              Add Contact
            </Button>
          </FormControl>
        </FormGroup>
      </Grid>
    </>
  );
};

export default AddContact;
