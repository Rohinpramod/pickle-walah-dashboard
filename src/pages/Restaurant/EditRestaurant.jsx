import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { axiosInstance } from "../../config/axiosInstance";
import { Trash } from "lucide-react";
import { Description } from "@mui/icons-material";

const EditPickle = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const data = location?.state?.data;
  const isEdit = Boolean(data);

  const [formData, setFormData] = useState({
    name: data?.name || "",
    price: data?.price || "",
    isAvailable: data?.isAvailable || "",
    category:data?.category || [""],
    image: data?.image || "",
    description: data?.description || "",
    isAvailable: data?.isAvailable || [""],
    quantity: data?.quantity || "",
    ingredients: data?.ingredients || "",  
  
  });

  const [imagePreview, setImagePreview] = useState(data?.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contact.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        const uploadedImage = upload.target.result;
        setImagePreview(uploadedImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const form = new FormData();
      // Append text fields
      form.append("name", formData.name);
      form.append("price", formData.price);
      form.append("isAvailable", formData.isAvailable);
      form.append('quantity',formData.quantity);
      form.append('ingredients',formData.ingredients);
      form.append('description',formData.description);
      form.append('category',formData.category);
  
      // Append the image file if it exists
      if (formData.image) {
        const file = formData.image;
        form.append("image", file);
      }
  
      const endpoint = isEdit ? `/menu-items/updateMenu/${data._id}` : `/menu-items/create-menu`;
      const method = isEdit ? "PUT" :"POST"
  
      const response = await axiosInstance.request({
        method,
        url: endpoint,
        data: form, 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
   
      navigate("/pickles");
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };
  

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            {isEdit ? "Edit Pickle" : "Add New Pickle"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <TextField
                size="small"
                label="Pickle Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                size="small"
                label="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                size="small"
                label="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                size="small"
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                size="small"
                label="Ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </FormControl>
            
            <FormControl fullWidth margin="normal">
                    <FormControl fullWidth margin="normal">
                      <TextField
                        size="small"
                        label="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                size="small"
                select
                label="isAvailable"
                name="isAvailable"
                value={formData.isAvailable}
                onChange={handleChange}
              >
                <MenuItem value="true">Avaliable</MenuItem>
                <MenuItem value="false">Out of stock</MenuItem>
              </TextField>
            </FormControl>
              <Button
                variant="contained"
                component="label"
                sx={{ textAlign: "left" }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    handleImageChange(e);
                    e.target.value = "";
                  }}
                />
              </Button>
              {imagePreview && (
                <Box mt={2} textAlign="center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width:"200px",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
              <Trash className="text-red-500 cursor-pointer" onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({ ...prev, image: "" }));
                    }}/>
                </Box>
              )}
            </FormControl>

            
            <Box mt={3} textAlign="center">
              <Button variant="contained" type="submit" color="primary">
                {isEdit ? "Update Pickle " : "Add Pickels"}
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};
export default EditPickle;
