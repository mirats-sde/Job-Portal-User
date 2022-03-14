import React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';
const ToolTip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    arrow
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 600 }}
    followCursor
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default ToolTip;
