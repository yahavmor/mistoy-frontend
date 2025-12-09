import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toyService } from "../../services/toy.service";

import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@mui/material";

export function ToyFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const allLabels = toyService.labels;

  useEffect(() => {
    onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;
      case "checkbox":
        value = target.checked;
        break;
      case "select-multiple":
        value = Array.from(target.selectedOptions, (option) => option.value);
        break;
      default:
        break;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { name, price, labels, inStock } = filterByToEdit;

  return (
    <Card>
      <CardHeader title="Filter Toys" />
      <CardContent>
        <Box
          component="form"
          onSubmit={onSubmitFilter}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            type="search"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Search by name..."
          />

          <TextField
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Minimum price"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={inStock}
                onChange={handleChange}
                name="inStock"
              />
            }
            label="In stock"
          />

          <FormControl>
            <InputLabel id="labels-select-label">Filter by Labels</InputLabel>
            <Select
              labelId="labels-select-label"
              multiple
              name="labels"
              value={labels}
              onChange={handleChange}
            >
              {allLabels.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select one or more labels</FormHelperText>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button type="submit" variant="outlined" color="secondary">
              Apply
            </Button>
            <Button
              component={Link}
              to="/toy/edit/"
              variant="contained"
              color="primary"
            >
              Add Toy
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
