import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Input } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { React, useState } from "react";

const DisplayWidget = ({ widget, onSave, handleRemove }) => {
  const { name, description: initialDescription, price: initialPrice } = widget;
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);
  const [editMode, setEditMode] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const validateDescription = () => {
    if (description.length < 5 || description.length > 1000) {
      setDescriptionError(true);
      return false;
    }
    setDescriptionError(false);
    return true;
  };

  const validatePrice = () => {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 1 || parsedPrice > 20000) {
      setPriceError(true);
      return false;
    }

    const decimalCount = price.split(".")[1]?.length || 0;
    if (decimalCount > 2) {
      setPriceError(true);
      return false;
    }

    setPriceError(false);
    return true;
  };

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const save = () => {
    if (!validateDescription() || !validatePrice()) {
      return;
    }
    const updatedWidget = {
      ...widget,
      description,
      price,
    };
    onSave(updatedWidget);
    setEditMode(!editMode);
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <IconButton onClick={toggleEdit} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleRemove(name)} size="small">
            <DeleteIcon />
          </IconButton>
          <Stack spacing={2}>
            {editMode ? (
              <>
                <Typography component="div" gutterBottom variant="h4">
                  {name}
                </Typography>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  placeholder="Price"
                  required
                  error={priceError}
                />
                {priceError && (
                  <Typography color="error">
                    Price must be a number between 1 and 20,000 with 2 decimal
                    places precision.
                  </Typography>
                )}
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  placeholder="Description"
                  required
                  error={descriptionError}
                />
                {descriptionError && (
                  <Typography color="error">
                    Description must be between 5 and 1000 characters.
                  </Typography>
                )}
                <Button onClick={save} size="small">
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography component="div" gutterBottom variant="h4">
                  {name}
                </Typography>
                <Typography component="div" gutterBottom variant="h5">
                  ${price}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {description}
                </Typography>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DisplayWidget;
