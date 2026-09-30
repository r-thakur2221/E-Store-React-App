import { Button } from "@mui/material";
import React from "react";


export const ButtonComponent = (props) => {
    const label = props.label || "Sign In"

    let btn = props.isSubmitting ?
        <Button type="submit"
            fullWidth
            disabled
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>Submitting...
            </Button>
            :
        <Button type="submit"
            fullWidth
            disabled={props.isDisabled}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>{label}
        </Button>;
    return (btn)
}