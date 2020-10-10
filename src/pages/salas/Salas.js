import React, { useEffect, useState } from "react";
import { Grid, Drawer } from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import ToastNotification from "../../components/ToastNotification";
import Widget from "../../components/Widget";
import Table from "./components/Table/Table";

export default function Salas() {
  const [salas, setSalas] = useState([]);
  const [dataVerificada, setDataVerificada] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [openedModal, setOpenedModal] = useState(false);
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
          setOpenedModal(true);
        }}
      />

      {type.length > 0 && <ToastNotification message={message} type={type} />}

      <Grid container spacing={4}>
        <button style={{ display: "none" }} onClick={sendNotification}>
          Teste de notificação
        </button>
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
        open={openedModal}
        onClose={() => {
          setOpenedModal(false);
        }}
      >
        <div>
          <h1>Teste</h1>
        </div>
      </Drawer>
    </>
  );
}
