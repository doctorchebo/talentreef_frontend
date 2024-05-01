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

const DisplayWidget = ({ widget, onSave, handleRemove, error }) => {
  const { name, description: initialDescription, price: initialPrice } = widget;
  const [description, setDescription] = useState(initialDescription);
  const [price, setPrice] = useState(initialPrice);
  const [editMode, setEditMode] = useState(false);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const save = async () => {
    const updatedWidget = {
      ...widget,
      description,
      price,
    };
    const isSaved = await onSave(updatedWidget);
    if (isSaved === true) {
      setEditMode(!editMode);
    }
  };

  return (
    <Grid item xs={6}>
      <Card>
        <CardContent>
          <IconButton
            onClick={toggleEdit}
            size="small"
            data-testid="edit-button"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleRemove(name)}
            size="small"
            data-testid="delete-button"
          >
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
                  error={error?.price}
                />
                {error?.price && (
                  <Typography color="error">{error?.price}</Typography>
                )}
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  placeholder="Description"
                  required
                  error={error?.description}
                />
                {error?.description && (
                  <Typography color="error">{error?.description}</Typography>
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
