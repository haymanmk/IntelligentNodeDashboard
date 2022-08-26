import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const GreyTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    background: "rgb(0,0,0,0.1)",
    "& input": {
      textAlign: "right",
    },
  },
});
