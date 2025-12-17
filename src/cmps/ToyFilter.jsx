import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toyService } from "../../services/toy.service";


import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";


export function ToyFilter({ filterBy, onSetFilterBy }) {
  const allLabels = toyService.labels;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(20, "Name must be under 20 characters"),
    price: Yup.number()
      .min(0, "Price cannot be negative"),
    labels: Yup.array().of(Yup.string()),
    inStock: Yup.boolean(),
  });

  
  const formik = useFormik({
    initialValues: {
      name: filterBy.name || "",
      price: filterBy.price || "",
      labels: filterBy.labels || [],
      inStock: filterBy.inStock || false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSetFilterBy(values); 
    },
  });

  return (
    <Card>
      <CardHeader title="Filter Toys" sx={{ textAlign: "center" }} />

      <CardContent>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            name="name"
            type="search"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            placeholder="Search by name..."
          />

          <TextField
            label="Price"
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            placeholder="Minimum price"
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Checkbox
              name="inStock"
              checked={formik.values.inStock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span>In stock</span>
          </Box>

          <Select
            multiple
            name="labels"
            value={formik.values.labels}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            displayEmpty
            renderValue={(selected) =>
              selected.length === 0 ? (
                <span style={{ color: "#aaa" }}>Select labels</span>
              ) : (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {selected.map((label) => (
                    <Chip key={label} label={label} />
                  ))}
                </Box>
              )
            }
          >
            {allLabels.map((label) => (
              <MenuItem key={label} value={label}>
                {label}
              </MenuItem>
            ))}
          </Select>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="outlined">
              Apply
            </Button>

            <Button component={Link} to="/toy/edit/" variant="contained">
              Add Toy
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
