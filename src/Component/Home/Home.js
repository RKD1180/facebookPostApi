import { Alert, CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
const Home = () => {
  const { register, reset, handleSubmit } = useForm();
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false)
  // console.log(image)
  const uploadImage = (e) => {
    // console.log('click')
    setLoading(true)
    const image = e.target.files[0];
    // console.log(image)
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "donor-photo-uploads");
    data.append("cloud_name", "dydja7ouv");
    fetch("https://api.cloudinary.com/v1_1/dydja7ouv/image/upload", {
      method: "post",
      body: data
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url?.toString());
        setLoading(false)
      });
  };
  // console.log(process.env.REACT_APP_ACCESS_TOKEN)

  const onSubmit = data => {
    // const url3 = `https://graph.facebook.com/v13.0/105601905421801/photos?url=http%3A%2F%2Ftinypic.com%2Fimages%2Fgoodbye.jpg&message=helloword%20test%20project&access_token=EAAFC9tiW2P0BAO5IaAEz6syHAnY2GA9lsCuBwUiSeOEpDANwJRCKXXttej1Iog3gZCGrjnOCfmakjs7wvK8ekwOuC2ZCxrI4C2dLHCCRFvsY4S8DUtuGg82iGZB0v3vKhREEoguRUoJz1ZCZC4aUrrqCHnoCri5MgurSUCiPgK0zAZCk5eTdkkZCfqdO3ZCiScvuZBy3ApbRn40mZC5rA1LqZAV`
    if (url) data.img = url;
    if (!url) {

      fetch(`https://graph.facebook.com/v13.0/${process.env.REACT_APP_PAGE_ID}/feed?message=${data?.text}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`, {
        method: "post"
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data?.error?.message)
          }
          if (data?.data) {
            reset()
            setSuccess('You have successfully added facebook posts')
          }
        })
    }
    if (url) {
      fetch(`https://graph.facebook.com/v13.0/${process.env.REACT_APP_PAGE_ID}/photos?url=${data?.img}&message=${data?.text}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`, {
        method: "post"
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data?.error?.message)
          }
          if (data?.data) {
            reset()
            setSuccess('You have successfully added facebook posts')
          }
        })
    }

  }
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginLeft: 50,
            marginTop: 10,
          }}
        >
          {url ? <img src={url} width="100px" height="100px" alt="" /> : ''
          }
          {loading ? <CircularProgress /> : !url && <Button sx={{ mt: 3 }} variant="contained" component="label">
            Upload Images
            <input type="file" hidden onChange={uploadImage} />
          </Button>}
          <br />
          <br />
          <TextField
            fullWidth
            multiline
            rows={4}
            maxrows={4}
            label="text"
            id="fullWidth"
            {...register("text", { min: 0 })} required
          />

          <Button type="submit" sx={{ mt: 2 }} variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      <br />

      {error && <Alert severity="error" autohideduration={5000} style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>{error}</Alert>}
      {success && <Alert severity="success" autohideduration={5000} style={{ textAlign: 'center', width: '80%', margin: '0 auto' }}>{success}</Alert>}
    </div>
  );
};

export default Home;
