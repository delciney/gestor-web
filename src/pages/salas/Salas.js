import React, { useEffect, useState } from "react";
import { Grid, Drawer, TextField, Button,
InputAdornment} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import ToastNotification from "../../components/ToastNotification";
import Widget from "../../components/Widget";
import Table from "./components/Table/Table";

// services
import api from "../../services/api";

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
       

        async function searchInfo(){

          const dateInfo = new Date();
          const dia = dateInfo.getDay() < 10 ? `0${dateInfo.getDay()}` : dateInfo.getDay();
          const mes = dateInfo.getMonth() + 1;
          const ano = dateInfo.getFullYear();
          const hora = dateInfo.getHours();
          const inicio = dateInfo.getHours();
          const encerramento = dateInfo.getHours() + 1;

          setDataVerificada(
          `${dia}/${mes}/${ano} das ${inicio}h às ${encerramento}h`, 
          );

          const responseLivingRooms = await api.get("v1/LivingRooms");
          const responseConsultations = await api.post("v1/Consultations",{
            "Title":"Consulta de horários",
            "BookingDate":"07/10/2020",
            "Start":`${hora}.00`,
            "End":`${hora+1}.00`
          });
          
          const data = responseLivingRooms.data.map((d)=>{
            let inicio, encerramento, status;
            const findInfo = responseConsultations.data.data.find(e=> d.id === e.livingRoomId)
            
            if(findInfo !== undefined){
              

              inicio = String(findInfo.start).replace(".",":");
              encerramento = String(findInfo.end).replace(".",":");
              status = "Pending";
            }else{
              inicio = "-";
              encerramento = "-";
              status = "Sent";
            }
            return({
              
                id: d.id,
                sala: d.title,
                equipamentos: d.equipment,
                inicio,
                encerramento,
                status,
            
            })
          });

         
          setSalas(data);
          

        }
        searchInfo();
    }, []);

  async function handleSubmit (e){
    e.preventDefault();
    sendNotification("Consulta realizada com sucesso", "success");
    let dataArray = dataConsulta.split("-");  
    dataArray = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
     setDataVerificada(
        `${dataArray} das ${dataInicio}h às ${dataEncerramento}h`,
    );
    setOpenedModalSalas(false);
    
    console.log({
      dataInicio: dataInicio.replace(":","."),
      dataEncerramento: dataEncerramento.replace(":",".")
    });

    const responseConsultations = await api.post("v1/Consultations",{
      "Title":"Consulta de horários",
      "BookingDate":dataArray,
      "Start":dataInicio.replace(":","."),
      "End":dataEncerramento.replace(":",".")
    });
    
    
    const responseLivingRooms = await api.get("v1/LivingRooms");
  
    const data = responseLivingRooms.data.map((d)=>{
      let inicio, encerramento, status;
      const findInfo = responseConsultations.data.data.find(e=> d.id === e.livingRoomId)
      
      if(findInfo !== undefined){
        console.log({findInfo});

        inicio = String(findInfo.start).replace(".",":");
        encerramento = String(findInfo.end).replace(".",":");
        status = "Pending";
      }else{
        inicio = "-";
        encerramento = "-";
        status = "Sent";
      }
      return({
        
          id: d.id,
          sala: d.title,
          equipamentos: d.equipment,
          inicio,
          encerramento,
          status,
      
      })
    });

    console.log({data});

    setSalas(data);
    

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
     <form onSubmit={handleSubmit}>
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
