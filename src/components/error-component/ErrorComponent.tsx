import { Container, Paper, Typography } from "@mui/material";
import React, { ComponentType } from "react";
import "./ErrorComponent.css";

interface Props {
    title: string;
    description: string;
    ActionComponent?: ComponentType;
}

const ErrorComponent : React.FC<Props> = ({title, description, ActionComponent}) => {
    return (
        <Paper elevation={3} className="error-card-paper">
            <Container>
                <Typography variant={"h5"} className="error-card-typography">
                    {title}
                </Typography>
                <Typography className="error-card-typography">
                    {description}
                </Typography>
                {ActionComponent && <ActionComponent />}
            </Container>
        </Paper>
    );
}

export default ErrorComponent;