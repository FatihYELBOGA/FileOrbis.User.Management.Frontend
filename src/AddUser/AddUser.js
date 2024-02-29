import React, { useState } from 'react';
import {
  Box, TextField, Grid,
  Button, createTheme, ThemeProvider, Avatar, Paper,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2150eb',
    },
    secondary: {
      main: '#ffffff',
    },
  },
  components: {
    // Your theme overrides here
  },
});

const AddUser = () => 
{
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleProfilePhoto = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file size
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB in bytes
      if (selectedFile.size <= fileSizeLimit) {
        setAvatar(selectedFile);
      } else {
        // File size exceeds the limit
        alert("File size exceeds the limit of 5MB.");
      }
    }
  };

  const handleAddUser = () => 
  {
    const formData = new FormData();
    formData.append("FirstName", name);
    formData.append("LastName", surname);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("Profile", avatar);
   
    fetch("https://localhost:7138/users", 
    {
      method: "POST",
      body: formData
    })
    .then((res) => res.json()) 
    .then((data) => {
      alert("the user informations added successfully!");
      console.log(data);
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setAvatar(null);
    })
    .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3, marginTop: 6, borderRadius: 2, width: '40%', marginLeft: '30%', marginRight: '30%' }}>
        <Paper sx={{ p: 3, padding: 6, backgroundColor: "transparent", border: 0, boxShadow: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                onChange={handleProfilePhoto}
                style={{ display: "none" }}
              />
              <Avatar alt="User Avatar" src={avatar ? URL.createObjectURL(avatar) : ""} sx={{ width: 150, height: 150, margin: "auto" }} />
              
              <Button variant="contained" size="small" sx={{ ml:"30%", mt: 1, width: "40%", color: "white", backgroundColor: "#7D7D7D", fontWeight: "bold" }} onClick={() => document.getElementById('avatar-upload').click()}>Upload Photo</Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="surname"
                label="Surname"
                fullWidth
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
                sx={{ width: "100%", backgroundColor: "#7D7D7D", fontWeight: "bold" }}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AddUser;
