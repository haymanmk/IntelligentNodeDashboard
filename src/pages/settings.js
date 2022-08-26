import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { SettingsNotifications } from "../components/settings/settings-notifications";
import { SettingsPassword } from "../components/settings/settings-password";
import { SettingRS232 } from "src/components/settings/settings-rs232";
import { isInteger } from "formik";

const Settings = (props) => {
  const [values, setValue] = useState(props.values);

  function handleChange(event) {
    event.preventDefault();
    let target = event.target;
    let value;

    switch (target.type) {
      case "checkbox":
        setValue({
          ...values,
          [target.name]: !values[target.name],
        });
        break;
      case "number":
        if (!isNaN(target.value)) {
          value = isInteger(target.value) ? parseInt(target.value) : parseFloat(target.value);
        }
        setValue({
          ...values,
          baudRate: value,
        });
        break;
    }

    console.log(values);
  }

  async function postData(event) {
    console.log(event.target);
    event.preventDefault();
    await fetch("http://localhost:80/api/config", {
      method: "POST",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => console.log(response.status))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Head>
        <title>Settings | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Settings
          </Typography>
          <SettingsNotifications />
          <Box sx={{ pt: 3 }}>
            <SettingRS232
              title={props.title}
              subheader={props.subheader}
              values={values}
              handleChange={handleChange}
              onSubmit={postData}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export async function getStaticProps() {
  // fetch configuration file from node.js server
  let JSONData;

  await fetch("http://localhost/api/config", {
    method: "GET",
    dataType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // use method json() to read the response stream
      // and parse the body part as JSON.
      return response.json();
    })
    .then((response) => {
      console.log(response);
      JSONData = response;
    });

  return {
    props: {
      title: JSONData.RS232.title,
      subheader: JSONData.RS232.subheader,
      values: {
        baudRate: JSONData.RS232.settings.baudRate.value,
        parity: JSONData.RS232.settings.parity.value,
      },
    },
    // revalidate: 100,
  };
}

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
