import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Home = () => {
  return (
    <div className="form">
      <form action="">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginLeft: 50,
            marginTop: 10,
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            maxRows={4}
            label="text"
            id="fullWidth"
          />
          <Button sx={{ mt: 3 }} variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>{" "}
          <br />
          <Button sx={{ mt: 2 }} variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Home;
