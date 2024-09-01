import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <AppBar position="static" className="header" data-testid='app-header'>
            <Toolbar sx={{margin: "auto 20px"}}>
                <Typography variant="h2" component="div" className="title" color='white'>
                    Fly High
                </Typography>
                <FlightRoundedIcon className="flight-logo" sx={{height: "4rem", width: "4rem"}} data-testid='flight-logo'/>
            </Toolbar>
        </AppBar>
    );
};

export default Header;