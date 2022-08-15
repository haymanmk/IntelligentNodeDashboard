import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { SettingsNotifications } from "../components/settings/settings-notifications";
import { SettingsPassword } from "../components/settings/settings-password";
import { SettingRS232 } from "src/components/settings/settings-rs232";

const Settings = (props) => (
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
            values={props.values}
            onSubmit={postData}
          />
        </Box>
      </Container>
    </Box>
  </>
);

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
      // console.log(response);
      JSONData = response;
    });

  return {
    props: {
      title: JSONData.RS232.title,
      subheader: JSONData.RS232.subheader,
      values: { baudRate: JSONData.RS232.settings.baudRate.value },
    },
    // revalidate: 100,
  };
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
    body: JSON.stringify({ baudRate: event.target.value }),
  })
    .then((response) => console.log(response.status))
    .catch((err) => console.log(err));
}

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
