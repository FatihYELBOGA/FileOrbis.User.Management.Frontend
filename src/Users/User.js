import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { Avatar } from '@mui/material';
import Photo from '../FileReader/Photo'

export default function User(props) 
{
  const {user, isRender, setIsRender} = props
  const [id, setId] = useState(user.id);
  const [firstname, setFirstName] = useState(user.firstName)
  const [surname, setSurname] = useState(user.lastName)
  const [email,setEmail] = useState(user.email)

  const [isDetail, setIsDetail] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editName, setEditName] = useState(firstname)
  const [editSurname, setEditSurname] = useState(surname)
  const [editEmail,setEditEmail] = useState(email)
  const [avatar, setAvatar] = useState(null);

  useEffect(() => 
  {
    if(user.profile != null){
      setAvatar(Photo(user.profile.content, user.profile.name))
    }
  }, [])

  const handleDelete = () =>
  {
    fetch(`https://localhost:7138/users/${id}`, {
    method: 'DELETE',
    })
    .then((result) =>{
      console.log(result);
      
      alert("Deleted!")
      
    }).then(()=>{
      setIsRender(!isRender);
    });
  }

  const handleUpdate = () => 
  {
    setEditing(true);
    setIsDetail(true);
  };

  const handleSubmit = (e) => 
  {
    setEditing(false);
    setFirstName(editName);
    setSurname(editSurname);
    setEmail(editEmail);
    
    e.preventDefault();
  
    // Construct the data you want to update
    const formData = new FormData();
    formData.append("FirstName",firstname);
    formData.append("LastName",surname);
    formData.append("Email",email);
    console.log(email,surname,firstname,id)
    
    fetch(`https://localhost:7138/users/${id}`, {
      method: 'PUT', // Use PUT method for update
      body: formData, // Convert data to JSON string
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update'); // Throw error if response is not ok
        }
        return res.json(); // Return JSON parsed response
      })
      .then((res) => {
        alert("User Updated Successfully!");
        setEditEmail(email)
        setEditName(firstname)
        setEditSurname(surname) // Clear comment field or update state as needed
      })
      .catch((err) => console.error(err)); // Catch and log any errors
  };

  const handleCancel = () => 
  {
    setEditing(false);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        width: "25%",
        minWidth: "350px",
        backgroundColor: "#fbfdfd",
        ml: 1,
        marginBottom: 2,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity (0.7 in this case)
        transition: 'transform 0.3s ease-in-out', // Add a smooth transition for scaling
        display: 'flex',
        justifyContent: 'center', // Align buttons to the right
        '&:hover': {
          transform: 'scale(1.1)', // Increase the size on hover
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {!isDetail ? (
          <>
            <div style={{ marginBottom: "10px" }}>
            <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{ display: "none" }}
              />
              <Avatar alt="User Avatar" src={avatar} sx={{ width: 150, height: 150, margin: "auto" }} />
              {editing && (
                <label htmlFor="profile-photo-input">
                  <IconButton component="span">
                    <EditIcon />
                  </IconButton>
                </label>
              )}
            </div>
            <Typography color="black" variant="h7" component="div" sx={{ marginBottom: 1 }}>
              {firstname} {surname}
            </Typography>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton onClick={handleUpdate}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => setIsDetail(true)}>
                <VisibilityIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <div>
            <div style={{ marginBottom: "10px" }}>
            <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{ display: "none" }}
              />
              <Avatar alt="User Avatar" src={avatar} sx={{ width: 150, height: 150, margin: "auto" }} />
            </div>
            <div style={{ marginBottom: "10px", textAlign: "center" }}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                defaultValue={firstname}
                onChange={(e) => setEditName(e.target.value)}
                disabled={!editing}
              />
              <TextField
                name="surname"
                label="Surname"
                fullWidth
                defaultValue={surname}
                onChange={(e) => setEditSurname(e.target.value)}
                disabled={!editing}
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                defaultValue={email}
                onChange={(e) => setEditEmail(e.target.value)}
                disabled={!editing}
              />
            </div>
            <div style={{ marginTop: "auto", marginBottom: "10px" }}>
              {editing ? (
                <>
                  <IconButton onClick={handleSubmit}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancel}>
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => setIsDetail(false)}>
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
