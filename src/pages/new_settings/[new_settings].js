import { useRouter } from "next/router";
import Head from "next/head";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "src/components/dashboard-layout";
import { useSelector, useDispatch } from "react-redux";
import { SettingItems } from "src/components/settings/settings-items";
import { storeAction } from "src/store/state-slice";
import { isInteger } from "formik";
import store from "src/store";

const newSetteings = () => {
  const router = useRouter();
  const { new_settings } = router.query;
  const storeState = useSelector((state) => state.state);
  const storeConfig = storeState.config;

  if (!storeConfig[new_settings]) {
    return (
      <>
        <Backdrop open={true} sx={{ color: "#eeee", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Grid container flexDirection="column" alignItems="center">
            <Grid item>
              <CircularProgress color="inherit" />
            </Grid>
            <Grid item>
              <Typography variant="h4" sx={{ mt: 3 }}>
                LOADING...
              </Typography>
            </Grid>
          </Grid>
        </Backdrop>
      </>
    );
  }

  const { title, subheader, settings } = storeConfig[new_settings];

  const dispatch = useDispatch();

  function handleChange(event) {
    let target = event.target;
    let setting = Object.assign({}, settings[target.name]);
    if (target.type === "number") {
      if (!isNaN(target.value)) {
        setting.value = isInteger(target.value) ? parseInt(target.value) : parseFloat(target.value);
      }
    } else if (target.type == "checkbox") {
      setting.value = !setting.value;
    } else setting.value = target.value;

    let _settings = {
      ...settings,
      [event.target.name]: setting,
    };

    let _storeConfig = {
      ...storeConfig[new_settings],
      settings: _settings,
    };

    let payload = {
      ...storeConfig,
      [new_settings]: _storeConfig,
    };
    dispatch(storeAction.setSaved(false));
    dispatch(storeAction.setConfig(payload));
  }

  async function handleSave() {
    const storedData = store.getState();
    const url = new URL(storedData.state.domain);
    const configData = storedData.state.config;
    const hostname = url.hostname;

    await fetch(`http://${hostname}/api/config`, {
      method: "POST",
      dataType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(configData),
    })
      .then((response) => {
        console.log(response.status);
        dispatch(storeAction.setSaved(true));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Head>
        <title>{new_settings} | Settings</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md" sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Card>
            <List>
              {Object.keys(settings).map((key, index) => (
                <>
                  {index > 0 && <Divider />}
                  <SettingItems
                    key={key}
                    id={key}
                    label={settings[key].label}
                    description={settings[key].description}
                    value={settings[key].value}
                    handleChange={handleChange}
                  />
                </>
              ))}
            </List>
          </Card>
          <Grid container justifyContent="flex-end">
            <Button disabled={storeState.saved} onClick={handleSave} sx={{ mt: 1 }}>
              {storeState.saved ? "SAVED" : "SAVE"}
            </Button>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

// export async function getStaticPaths() {
//   // When this is true (in preview environments) don't
//   // prerender any static pages
//   // (faster builds, but slower initial page load)
//   if (process.env.SKIP_BUILD_STATIC_GENERATION) {
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }

//   // Call an external API endpoint to get posts
//   const res = await fetch(api_config.config, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Context-Type": "application/json",
//     },
//   });
//   const posts = await res.json();

//   // Get the paths we want to prerender based on posts
//   // In production environments, prerender all pages
//   // (slower builds, but faster initial page load)
//   const paths = Object.keys(posts).map((key) => ({
//     params: { new_settings: key },
//   }));

//   // { fallback: false } means other routes should 404
//   return { paths, fallback: false };
// }

// export async function getStaticProps() {
//   const res = await fetch(api_config.config, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Context-Type": "application/json",
//     },
//   });
//   const posts = await res.json();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       posts,
//     },
//   };
// }

newSetteings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default newSetteings;
