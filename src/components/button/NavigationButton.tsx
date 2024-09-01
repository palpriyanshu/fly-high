import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

type Props = {
  path: string,
  label: string
};
const NavigationButton: React.FC<Props> = ({path, label}) => {
    const navigate = useNavigate();
    return <Button variant={"contained"} sx={{background: "#319795"}} onClick={() => navigate(path)}>{label}</Button>;
};

export default NavigationButton;