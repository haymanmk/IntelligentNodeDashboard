import { useEffect, useState, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  Grid,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import { Cog as CogIcon } from "../icons/cog";
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector";
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { stateContext } from "src/store/state-context";
import { useSelector, useDispatch } from "react-redux";
import { storeAction } from "src/store/state-slice";
import api_config from "src/pages/api_config";

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/customers",
    icon: <UsersIcon fontSize="small" />,
    title: "Customers",
  },
  {
    href: "/products",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "Products",
  },
  {
    href: "/account",
    icon: <UserIcon fontSize="small" />,
    title: "Account",
  },
  // {
  //   href: "/settings",
  //   icon: <CogIcon fontSize="small" />,
  //   title: "Settings",
  // },
  {
    href: "/login",
    icon: <LockIcon fontSize="small" />,
    title: "Login",
  },
  {
    href: "/register",
    icon: <UserAddIcon fontSize="small" />,
    title: "Register",
  },
  {
    href: "/404",
    icon: <XCircleIcon fontSize="small" />,
    title: "Error",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const [loginInfo, setInfo] = useState({
    department: "PDO",
    userName: "Alley",
  });

  // const ctx = useContext(stateContext);
  // const [_items, setItems] = useState(items);
  const _items = useSelector((state) => {
    return [
      ...items,
      ...Object.keys(state.state.config).map((key) => ({
        href: `/new_settings/${key}`,
        icon: <CogIcon fontSize="small" />,
        title: key,
      })),
    ];
  });
  const storeDomain = useSelector((state) => state.state.domain);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(storeAction.setDomainName(location.href));

      fetch(api_config.config, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Context-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // console.log(response);
          dispatch(storeAction.setConfig(response));
        });

      // console.log(ctx.domainName, ctx.config);
      // setItems([
      //   ...items,
      //   ...Object.keys(ctx.config).map((key) => ({
      //     href: `/new_settings/${key}`,
      //     icon: <CogIcon fontSize="small" />,
      //     title: key,
      //   })),
      // ]);
      // console.log(_items);
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <Box sx={{ p: 3 }}>
                <NextLink href="/" passHref>
                  <a>
                    <Logo variant="light" />
                  </a>
                </NextLink>
              </Box>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Hi {loginInfo.userName}
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  {loginInfo.department}
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {_items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider
          sx={{
            my: 3,
            borderColor: "#2D3748",
          }}
        />
        <Box sx={{ p: 3 }}>
          <Box sx={{ height: "5rem" }}></Box>
          <Typography align="center" color="neutral.400" variant="subtitle2">
            PDO 2022 &reg;
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
