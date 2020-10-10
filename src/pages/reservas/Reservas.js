import React, { useEffect, useState } from "react";
import { Grid, Drawer, TextField, Button,
InputAdornment  } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import ToastNotification from "../../components/ToastNotification";

import useStyles from "./styles";

export default function Reservas() {
    const classes = useStyles();

    const [reservas, setReservas] = useState([]);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [openedModalReservas, setOpenedModalReservas] = useState(false);
    const [dataReserva,setDataReserva ] = useState("");
    const [dataInicio,setDataInicio ] = useState("");
    const [dataEncerramento,setDataEncerramento ] = useState("");

  useEffect(() => {
    const data = [
      ["Reunião da diretoria", "Sala A", "07/10/2020", "10:30", "15:00"],
      ["Reunião de marketing", "Sala B", "04/10/2020", "11:30", "13:00"],
      [
        "Reunião de prestação de contas",
        "Sala C",
        "05/10/2020",
        "18:30",
        "21:00",
      ],
      ["Reunião do conselho", "Sala D", "07/10/2020", "13:30", "15:00"],
      ["Reunião orçamentária", "Sala E", "02/10/2020", "16:30", "19:00"],
      ["Reunião de departamentos", "Sala B", "08/10/2020", "13:30", "15:00"],
      ["Reunião de marketing", "Sala C", "01/10/2020", "11:30", "14:00"],
      ["Reunião da departamentos", "Sala D", "09/10/2020", "18:30", "23:00"],
    ];
    setReservas(data);
  }, []);

  function cancelarReserva(params) {
    console.log(params);
  }

  function hendleSubmit (e){
    e.preventDefault();
    sendNotification("Reserva realizada com sucesso", "success");
    setOpenedModalReservas(false);
    setDataReserva("");
    setDataInicio("");
    setDataEncerramento("");
  }

  function sendNotification(msg, type) {
    // type success, feedback
    setMessage(msg);
    setType(type);
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 6000);
  }

  return (
    <>

      <PageTitle
        title="Reservas"
        button="Nova reserva"
        buttonFunction={() => {
          setOpenedModalReservas(true);
        }}
      />

      {type !== "" && <ToastNotification message={message} type={type} />}

      <Grid container spacing={4}>
        <button style={{ display: "none" }} onClick={sendNotification}>
          Teste de notificação
        </button>
        <Grid item xs={12}>
          <MUIDataTable
            data={reservas}
            columns={["Descrição", "Sala", "Data", "Inicio", "Encerramento"]}
            options={{
              filterType: "checkbox",
              onRowsDelete: cancelarReserva,
            }}
          />
        </Grid>
      </Grid>

        <Drawer
        anchor="bottom"
        open={ openedModalReservas }
        onClose={() => {
          setOpenedModalReservas(false);
        }}
      >
          <form onSubmit={hendleSubmit}>
         <div className={classes.paper}>
        <div className={classes.mB}>
            <TextField
        className={classes.margin}
        id="Data"
        label="Data"
        type="date"
        value={dataReserva}
        onChange={(e)=>{setDataReserva(e.target.value)}}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      />
      <TextField
        className={classes.margin}
        id="Inicio"
        label="Inicio"
        type="time"
        value={dataInicio}
        onChange={(e)=>{setDataInicio(e.target.value)}}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      />
         <TextField
        className={classes.margin}
        id="Encerramento"
        label="Encerramento"
        type="time"
        value={dataEncerramento}
        onChange={(e)=>{setDataEncerramento(e.target.value)}}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      />
        </div>
  
           <Button variant="contained" type="submit" color="primary">Solicitar</Button>
     
      
    </div>
      </form>
      </Drawer>

    </>
  );
}
