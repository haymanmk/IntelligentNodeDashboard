import {
  checkboxClasses,
  FormControlLabel,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { LabeledAntSwitch } from "../ant-switch";
import { GreyTextField } from "../grey-text-field";
import { useState } from "react";

export const SettingItems = (props) => {
  function handleChecked(props) {
    return props.handleChange({
      target: { type: "checkbox", name: props.id },
    });
  }

  switch (typeof props.value) {
    case "number":
      return (
        <ListItem
          secondaryAction={
            <GreyTextField
              variant="outlined"
              size="small"
              name={props.id}
              type="number"
              onChange={props.handleChange}
              value={props.value}
            />
          }
        >
          {props.description ? (
            <ListItemText primary={props.label} secondary={props.description} />
          ) : (
            <ListItemText primary={props.label} />
          )}
        </ListItem>
      );
    case "string":
      return (
        <ListItem
          secondaryAction={
            <GreyTextField
              variant="outlined"
              size="small"
              name={props.id}
              type="string"
              onChange={props.handleChange}
              value={props.value}
            />
          }
        >
          {props.description ? (
            <ListItemText primary={props.label} secondary={props.description} />
          ) : (
            <ListItemText primary={props.label} />
          )}
        </ListItem>
      );
    case "boolean":
      return (
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleChecked(props)} name={props.id}>
            <Grid container justifyContent={"space-between"} alignItems={"center"}>
              <Grid item>
                {props.description ? (
                  <ListItemText primary={props.label} secondary={props.description} />
                ) : (
                  <ListItemText primary={props.label} />
                )}
              </Grid>
              <Grid item>
                <LabeledAntSwitch checked={props.value} />
              </Grid>
            </Grid>
          </ListItemButton>
        </ListItem>
      );
  }

  return <></>;
};
