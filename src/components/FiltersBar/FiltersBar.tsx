import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Typography,
  Paper,
} from "@mui/material";
import { GetCountries } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import styles from "./FiltersBar.styles";

interface FiltersBarProps {
  onApplyFilters: (filters: FiltersState) => void;
  onClearFilters: () => void;
}

export interface FiltersState {
  minDays?: number;
  maxDays?: number;
  maxPrice?: number;
  country?: string;
  city?: string;
}

interface Country {
  id: number;
  name: string;
  iso2: string;
}

const FiltersBar: React.FC<FiltersBarProps> = ({
  onApplyFilters,
  onClearFilters,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filters, setFilters] = useState<FiltersState>({
    minDays: undefined,
    maxDays: undefined,
    maxPrice: undefined,
    country: undefined,
    city: undefined,
  });

  // Fetch countries on mount
  useEffect(() => {
    GetCountries().then((result: Country[]) => {
      setCountries(result);
    });
  }, []);

  const handleApply = () => {
    const activeFilters: FiltersState = {};

    if (filters.minDays !== undefined && filters.minDays > 0) {
      activeFilters.minDays = filters.minDays;
    }
    if (filters.maxDays !== undefined && filters.maxDays > 0) {
      activeFilters.maxDays = filters.maxDays;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      activeFilters.maxPrice = filters.maxPrice;
    }
    if (filters.country) {
      activeFilters.country = filters.country;
    }
    if (filters.city) {
      activeFilters.city = filters.city;
    }

    onApplyFilters(activeFilters);
  };

  const handleClear = () => {
    setFilters({
      minDays: undefined,
      maxDays: undefined,
      maxPrice: undefined,
      country: undefined,
      city: undefined,
    });
    setSelectedCountry(null);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== ""
  );

  return (
    <Paper sx={styles.root} elevation={0}>
      <Box sx={styles.filtersContainer}>
        <TextField
          label="Min Days"
          type="number"
          size="small"
          value={filters.minDays ?? ""}
          onChange={e =>
            setFilters(prev => ({
              ...prev,
              minDays: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          inputProps={{ min: 1 }}
          sx={styles.inputField}
        />
        <TextField
          label="Max Days"
          type="number"
          size="small"
          value={filters.maxDays ?? ""}
          onChange={e =>
            setFilters(prev => ({
              ...prev,
              maxDays: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          inputProps={{ min: filters.minDays || 1 }}
          sx={styles.inputField}
        />
        <TextField
          label="Max Price"
          type="number"
          size="small"
          value={filters.maxPrice ?? ""}
          onChange={e =>
            setFilters(prev => ({
              ...prev,
              maxPrice: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          inputProps={{ min: 0 }}
          slotProps={{
            input: {
              startAdornment: <Typography sx={styles.currency}>$</Typography>,
            },
          }}
          sx={styles.inputField}
        />
        <Autocomplete
          options={countries}
          value={selectedCountry}
          getOptionLabel={(option: Country) => option.name}
          onChange={(_, newValue) => {
            setSelectedCountry(newValue);
            setFilters(prev => ({
              ...prev,
              country: newValue?.name || undefined,
              city: undefined,
            }));
          }}
          renderInput={params => (
            <TextField {...params} label="Country" size="small" />
          )}
          sx={styles.autocomplete}
        />
        <TextField
          label="City"
          size="small"
          value={filters.city ?? ""}
          onChange={(e) =>
            setFilters(prev => ({
              ...prev,
              city: e.target.value || undefined,
            }))
          }
          disabled={!selectedCountry}
          placeholder={!selectedCountry ? "Select country first" : ""}
          sx={styles.inputField}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={handleClear}
          disabled={!hasActiveFilters}
          sx={styles.button}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleApply}
          disabled={!hasActiveFilters}
          sx={styles.button}
        >
          Apply
        </Button>
      </Box>
    </Paper>
  );
};

export default FiltersBar;
