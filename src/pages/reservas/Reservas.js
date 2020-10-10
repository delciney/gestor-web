import React, { useEffect, useState } from "react";
import { Grid, Drawer } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import ToastNotification from "../../components/ToastNotification";

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [openedModal, setOpenedModal] = useState(false);
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
          setOpenedModal(true);
        }}
      />

      {type.length > 0 && <ToastNotification message={message} type={type} />}

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
        open={openedModal}
        onClose={() => {
          setOpenedModal(false);
        }}
      >
        <div>
          
        </div>
      </Drawer>
    </>
  );
}
