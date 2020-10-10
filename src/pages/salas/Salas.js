import React, { useEffect, useState } from "react";
import { Grid, Drawer, TextField, Button,
InputAdornment} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import ToastNotification from "../../components/ToastNotification";
import Widget from "../../components/Widget";
import Table from "./components/Table/Table";

import useStyles from "./styles";
 
export default function Salas() {
    const classes = useStyles();
    const [salas, setSalas] = useState([]);
    const [dataVerificada, setDataVerificada] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [openedModalSalas, setOpenedModalSalas] = useState(false);
    const [dataConsulta,setDataConsulta ] = useState("");
    const [dataInicio,setDataInicio ] = useState("");
    const [dataEncerramento,setDataEncerramento ] = useState("");
    useEffect(() => {
        const data = [
        {
            id: 0,
            sala: "Sala A",
            equipamentos: "Televisão",
            inicio: "-",
            encerramento: "-",
            status: "Sent",
        },
        {
            id: 1,
            sala: "Sala B",
            equipamentos: "Projetor",
            inicio: "-",
            encerramento: "-",
            status: "Sent",
        },
        {
            id: 2,
            sala: "Sala C",
            equipamentos: "Televisão",
            inicio: "-",
            encerramento: "-",
            status: "Pending",
        },
        {
            id: 3,
            sala: "Sala D",
            equipamentos: "Projetor",
            inicio: "-",
            encerramento: "-",
            status: "Pending",
        },
        {
            id: 4,
            sala: "Sala E",
            equipamentos: "Televisão",
            inicio: "-",
            encerramento: "-",
            status: "Sent",
        },
        ];
        setSalas(data);
        const d = new Date();
        const dia = d.getDay() < 10 ? `0${d.getDay()}`: d.getDay();
        const mes = d.getMonth() + 1;
        const ano = d.getFullYear();
        const inicio = d.getHours();
        const encerramento = d.getHours() + 1;
        setDataVerificada(
        `${dia}/${mes}/${ano} das ${inicio}h às ${encerramento}h`, 
        );
    }, []);

  function hendleSubmit (e){
    e.preventDefault();
    sendNotification("Consulta realizada com sucesso", "success");
    let dataArray = dataConsulta.split("-");  
    dataArray = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
     setDataVerificada(
        `${dataArray} das ${dataInicio}h às ${dataEncerramento}h`,
    );
    setOpenedModalSalas(false);
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
        title="Salas"
        button="Consultar Horários"
        buttonFunction={() => {
          setOpenedModalSalas(true);
        }}
      />

      {type.length > 0 && <ToastNotification message={message} type={type} />}

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title={`Reservas ${dataVerificada}`}
            disableWidgetMenu
            upperTitle
            noBodyPadding
           
          >
            {salas.length > 0 && <Table  data={salas} />}
          </Widget>
        </Grid>
      </Grid>

      <Drawer
        anchor="bottom"
        open={openedModalSalas}
        onClose={() => {
          setOpenedModalSalas(false);
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
        value={dataConsulta}
        onChange={(e)=>{setDataConsulta(e.target.value)}}
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
  
           <Button variant="contained" type="submit" color="primary">Consultar</Button>
     
    </div>
      </form>
      </Drawer>
    </>
  );
}
