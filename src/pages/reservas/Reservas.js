import React, { useEffect, useState } from "react";
import { Grid, Drawer, TextField, Button,
InputAdornment } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import ToastNotification from "../../components/ToastNotification";

// services
import api from "../../services/api";

import useStyles from "./styles";

export default function Reservas() {
    const classes = useStyles();

    const [reservas, setReservas] = useState([]);
    const [message, setMessage] = useState("");
    const [sala, setSala] = useState("");
    const [type, setType] = useState("");
    const [openedModalReservas, setOpenedModalReservas] = useState(false);
    const [dataReserva,setDataReserva ] = useState("");
    const [dataInicio,setDataInicio ] = useState("");
    const [dataEncerramento,setDataEncerramento ] = useState("");
    const [TitleReserva,setTitleReserva] = useState("");

  useEffect(() => {
    async function searchInfo(){
      const responseBookings = await api.get("v1/Bookings");
      console.log(responseBookings);
      const data = responseBookings.data.map(b=>{
        const date = b.bookingDate.replace("T00:00:00","").split("-");

        return[b.title,b.livingRoom,`${date[1]}/${date[2]}/${date[0]}`,`${String(b.start).replace(".",":")}h`,`${String(b.end).replace(".",":")}h`];
      });
      setReservas(data);
    }
    searchInfo();
   
    //setReservas(data);
  }, []);

  function cancelarReserva(params) {
    console.log(params);
  }

  async function handleSubmit (e){
    e.preventDefault();
    
    const response = await api.post("v1/Bookings",{
      Title:"Reunião da diretoria",
      BookingDate:"07/10/2020",
      Start:10.30,
      End:15.00,
      LivingRoomId:1
    });

    if(response.data.message === "Não foi possível realizar a reserva, sala já reservada"){
      const data = response.data.data[0];
      
      sendNotification(`Reservado para ${data.title} em ${data.bookingDate} das ${String(data.start).replace(".",":")} às ${String(data.end).replace(".",":")}`, "feedback");

    }else if(response.data.message === "Reserva realizada com sucesso!"){
      sendNotification("Reserva realizada com sucesso", "success");
    }else{
      sendNotification("Não foi possível realizar a reserva", "feedback");
    }

    setOpenedModalReservas(false);
    setDataReserva("");
    setDataInicio("");
    setSala("");
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
          <form onSubmit={handleSubmit}>

         <div className={classes.paper}>
        <div className={classes.mB}>
        <TextField
        className={classes.margin}
        id="title"
        label="Descrição"
        type="text"
        value={TitleReserva}
        onChange={(e)=>{setTitleReserva(e.target.value)}}
        //required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      />
            <TextField
        className={classes.margin}
        id="Data"
        label="Data"
        type="date"
        value={dataReserva}
        onChange={(e)=>{setDataReserva(e.target.value)}}
        //required
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
        //required
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
        //required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      />
      <Autocomplete
      id="combo-box-demo"
      options={[
        { title: "Sala A", id: 1 },
        { title: "Sala B", id: 2 },
        { title: "Sala C", id: 3 },
        { title: "Sala D", id: 4 },
        { title: "Sala E", id: 5 }]
    }
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} 
      //required 
      value={sala} onChange={(e)=>{setSala(e.target.value)}} label="Sala"  />}
    />
        </div>
  
           <Button variant="contained" type="submit" color="primary">Solicitar</Button>
     
      
    </div>
      </form>
      </Drawer>

    </>
  );
}
