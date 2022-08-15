import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from "@mui/material";
import { Form } from "formik";
import { useState } from "react";

export const SettingRS232 = (props) => {
  const [values, setValue] = useState(props.values);

  function handleChange(event) {
    let target = event.target;
    console.log(target);
    setValue({ baudRate: target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
  }

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
            onChange={handleChange}
            type="number"
            value={values.baudRate}
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
