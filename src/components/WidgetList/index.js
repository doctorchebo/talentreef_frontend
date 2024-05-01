import AddIcon from "@mui/icons-material/Add";
import { Container, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

import { addWidget, deleteWidget, fetchAllWidgets } from "../../lib/apiConnect";
import WidgetDisplay from "../WidgetDisplay";

const WidgetList = () => {
  const [widgets, setWidgets] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchAllWidgets()
      .then(setWidgets)
      .catch((error) => console.error("Error fetching widgets", error));
  }, []);

  const handleAdd = () => {
    const newWidget = {
      name: "New Widget " + (parseInt(widgets.length) + 1),
      description: "Description",
      price: 1.0,
    };
    setWidgets((widgets) => [newWidget, ...widgets]);
  };

  const onSave = async (newWidget) => {
    try {
      await addWidget(newWidget);
      setWidgets((prevWidgets) => [
        newWidget,
        ...prevWidgets.filter((w) => w.name !== newWidget.name),
      ]);
      setError(null);
      return true;
    } catch (error) {
      setError(error.response?.data);
      return false;
    }
  };

  const handleRemove = (index) => {
    deleteWidget(widgets[index].name)
      .then(
        setWidgets(
          widgets.filter((widget) => widget.name !== widgets[index].name)
        )
      )
      .catch((error) => console.error(`Error deleting widget`, error));
  };

  return (
    <Stack
      spacing={4}
      sx={{ margin: "auto", maxWidth: 900, paddingTop: "4em", width: "100%" }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h3">
        List of widgets:
      </Typography>
      <Container>
        <IconButton onClick={handleAdd} size="small">
          <AddIcon />
        </IconButton>
      </Container>
      <Grid
        container
        justifyContent="center"
        spacing={4}
        sx={{ paddingRight: 4, width: "100%" }}
      >
        {widgets.map((widget, index) => (
          <WidgetDisplay
            key={widget.name + index}
            widget={widget}
            onSave={onSave}
            handleRemove={() => handleRemove(index)}
            error={error}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default WidgetList;
