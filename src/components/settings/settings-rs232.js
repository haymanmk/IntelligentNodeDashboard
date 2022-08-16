import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { Form } from "formik";
import { useEffect, useState } from "react";

export const SettingRS232 = (props) => {
  return (
    <form {...props}>
      <Card>
        <CardHeader title={props.title} subheader={props.subheader} />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Baud Rate"
            margin="normal"
            name="baudRate"
            onChange={props.handleChange}
            type="number"
            value={props.values.baudRate}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="parity"
                color="primary"
                checked={props.values.parity}
                onClick={props.handleChange}
              />
            }
            label="Parity"
          />
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <Button type="submit">Save</Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};
