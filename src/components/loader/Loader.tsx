import React from "react";
import { LinearProgress, Stack } from "@mui/material";

export default function Loader() {
    return (
        <Stack sx={{ width: '80%', color: '#61dafb', margin: 'auto'}} spacing={2} data-testid='linear-loader'>
            <LinearProgress color="inherit" sx={{ height: '10px', borderRadius: '8px'}}/>
            <LinearProgress color="inherit" sx={{ height: '10px', borderRadius: '8px'}}/>
            <LinearProgress color="inherit" sx={{ height: '10px', borderRadius: '8px'}}/>
        </Stack>
    );
}