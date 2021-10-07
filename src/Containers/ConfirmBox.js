import React from "react";

const ConfirmBox = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Open My Custom Dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Greetings from GeeksforGeeks</DialogTitle>
                <DialogContent>
                    <DialogContentText>Do you do coding ?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmBox;
