import {useState} from "react";
import {
  Paper,
  TextField,
  Typography
} from '@mui/material';
import AppButton from "../components/AppButton";

import Head from 'next/head'
import axios from "axios";
import {isANumber} from "../utils/isANumber";


const Index = () => {
  // Form fields settings
  const [fields, setFields] = useState({
    cardNumber: {value: "", isWasBlur: false, isCorrect: false, errorMessage: "Обязательно поле"},
    expirationDate: {value: "", isWasBlur: false, isCorrect: false, errorMessage: "Обязательно поле"},
    cvv: {value: "", isWasBlur: false, isCorrect: false, errorMessage: "Обязательно поле"},
    amount: {value: "", isWasBlur: false, isCorrect: false, errorMessage: "Обязательно поле "}
  });

  // Returns true if all fields are correct
  const isCorrectValidation = fields.cardNumber.isCorrect && fields.expirationDate.isCorrect && fields.cvv.isCorrect && fields.amount.isCorrect;

  const normalizeCardNumber = (value) => {
    const normalized = value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";
    const valueWithoutSpaces = value.split(" ").join("");
    if (valueWithoutSpaces.length > 16){
      return false;
    }
    if (isANumber(valueWithoutSpaces) && valueWithoutSpaces.length === 16){
      setFields({...fields, cardNumber: {...fields.cardNumber, value: normalized, isCorrect: true, errorMessage: ""}});
    } else {
      setFields({...fields, cardNumber: {...fields.cardNumber, value: normalized, isCorrect: false, errorMessage: "Номер карты должен состоять из 16 цифр"}});
    }
  }

  const normalizeCardDate = (value) => {
    if (value.length === 8){
      return value;
    }
    else if (value.length === 3){
      value = value.split("").slice(0, 2).join("");
    }
    else if (value.length === 2){
      value = [...value.split(""), "/"].join("");
    }
    if (isANumber(value.slice(0, 1) + value.slice(3, 7)) && value.length === 7){
      setFields({...fields, expirationDate: {...fields.expirationDate, value: value, isCorrect: true, errorMessage: ""}});
    } else {
      setFields({...fields, expirationDate: {...fields.expirationDate, value: value, isCorrect: false, errorMessage: "Неверный формат даты"}});
    }
  }

  const normalizeCardCvv = (value) => {
    if (value.length > 3){
      return value;
    }
    if (isANumber(value) && value.length === 3){
      setFields({...fields, cvv: {...fields.cvv, value: value, isCorrect: true, errorMessage: ""}});
    } else {
      setFields({...fields, cvv: {...fields.cvv, value: value, isCorrect: false, errorMessage: "Это поле должно содержать 3 цифры"}});
    }
  }

  const normalizeAmount = (value) => {
    if (isANumber(value) && Number(value) > 0){
      setFields({...fields, amount: {...fields.amount, value: value, isCorrect: true, errorMessage: ""}});
    } else {
      setFields({...fields, amount: {...fields.amount, value: value, isCorrect: false, errorMessage: "Введите корректную сумму"}});
    }
  }

  const submitHandler = (e) =>{
    const valueWithoutSpaces = fields.cardNumber.value.split(" ").join("");
    const data = {
      cardNumber: String(valueWithoutSpaces),
      expirationDate: String(fields.expirationDate.value),
      cvv: String(fields.cvv.value),
      amount: String(fields.amount.value)
    }
    e.preventDefault();
    axios.post("http://localhost:3050", data)
        .then(response => console.log(response.data));
  }
  return (
      <>
        <Head>
          <meta keywords="payment form, payment"></meta>
          <title>Payment form</title>
        </Head>
        <div>
          <Paper sx={{padding: "40px 35px", minHeight: 500, width: 450,}}>
            <Typography sx={{textAlign: "center", marginBottom: 3}} variant="h4">Оплата</Typography>
            <form onSubmit={e => submitHandler(e)}>
              <TextField sx={{marginBottom: 2}} error={!!fields.cardNumber.errorMessage && fields.cardNumber.isWasBlur} helperText={fields.cardNumber.isWasBlur && fields.cardNumber.errorMessage } type="tel" fullWidth={true}
                         value={fields.cardNumber.value} onChange={e => normalizeCardNumber(e.target.value)} label="Card number"
                         onBlur={() => setFields({...fields, cardNumber: {...fields.cardNumber, isWasBlur: true}})}
                         name="number" placeholder="0000 0000 0000 0000" variant="outlined"/>
              <TextField sx={{marginBottom: 2}} error={!!fields.expirationDate.errorMessage && fields.expirationDate.isWasBlur} helperText={fields.expirationDate.isWasBlur && fields.expirationDate.errorMessage} type="tel" fullWidth={true} value={fields.expirationDate.value}
                         onChange={e => normalizeCardDate(e.target.value)} label="Expiration Date" name="expirationDate"
                         onBlur={() => setFields({...fields, expirationDate: {...fields.expirationDate, isWasBlur: true}})}
                         placeholder="MM/YYYY" variant="outlined"/>
              <TextField sx={{marginBottom: 2}} error={!!fields.cvv.errorMessage && fields.cvv.isWasBlur} helperText={fields.cvv.isWasBlur && fields.cvv.errorMessage} type="tel" fullWidth={true} value={fields.cvv.value}
                         onChange={e => normalizeCardCvv(e.target.value)}
                         onBlur={() => setFields({...fields, cvv: {...fields.cvv, isWasBlur: true}})}
                         label="CVV" name="cvv" placeholder="CVV" variant="outlined"/>
              <TextField sx={{marginBottom: 3}} error={!!fields.amount.errorMessage && fields.amount.isWasBlur} helperText={fields.amount.isWasBlur && fields.amount.errorMessage} type="tel" fullWidth={true} value={fields.amount.value}
                         onChange={e => normalizeAmount(e.target.value)}
                         onBlur={() => setFields({...fields, amount: {...fields.amount, isWasBlur: true}})}
                         label="Amount" name="amount" placeholder="Amount" variant="outlined"/>
              <AppButton type="submit" text="Оплатить" disabled={!isCorrectValidation}/>
            </form>
          </Paper>
        </div>
      </>
  );
};

export default Index;
