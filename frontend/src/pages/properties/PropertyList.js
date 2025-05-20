import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  TextField, 
  InputAdornment,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  CircularProgress,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API Service für Hausobjekte
const API_URL = 'http://localhost:3000/api';

// Styled-Komponente für den Header-Bereich
const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

// Styled-Komponente für die Suchleiste
const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const PropertyList = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Hausobjekte von der API abrufen
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // In einer vollständigen Implementierung würde hier ein API-Endpunkt für alle Hausobjekte verwendet werden
        // Da wir diesen noch nicht implementiert haben, simulieren wir die Daten
        // const response = await axios.get(`${API_URL}/properties`);
        
        // Simulierte Daten für die Demonstration
        const simulatedProperties = [
          {
            property_id: 1,
            account_id: 1,
            name: 'Wohnanlage Mitte',
            street: 'Berliner Str.',
            house_number: '123',
            postal_code: '10115',
            city: 'Berlin',
            notes: 'Wohnanlage mit 24 Wohneinheiten, Baujahr 1998, letzte Sanierung 2018.'
          },
          {
            property_id: 2,
            account_id: 1,
            name: 'Bürogebäude Kreuzberg',
            street: 'Oranienstr.',
            house_number: '45',
            postal_code: '10997',
            city: 'Berlin',
            notes: 'Bürogebäude mit 12 Einheiten, Baujahr 2005.'
          },
          {
            property_id: 3,
            account_id: 2,
            name: 'Wohnkomplex Süd',
            street: 'Hauptstraße',
            house_number: '45',
            postal_code: '80331',
            city: 'München',
            notes: 'Wohnkomplex mit 36 Wohneinheiten und Tiefgarage.'
          },
          {
            property_id: 4,
            account_id: 3,
            name: 'Geschäftshaus Zentrum',
            street: 'Gartenweg',
            house_number: '8',
            postal_code: '50667',
            city: 'Köln',
            notes: 'Gemischt genutztes Objekt mit Geschäften im EG und Wohnungen in den Obergeschossen.'
          }
        ];
        
        // Simulierte Account-Namen für die Demonstration
        const accountNames = {
          1: 'Hausverwaltung Schmidt GmbH',
          2: 'Immobilien Müller & Co.',
          3: 'Hausverwaltung Becker'
        };
        
        // Account-Namen zu den Hausobjekten hinzufügen
        const propertiesWithAccountNames = simulatedProperties.map(property => ({
          ...property,
          account_name: accountNames[property.account_id] || 'Unbekannter Account'
        }));
        
        setProperties(propertiesWithAccountNames);
        setLoading(false);
      } catch (err) {
        console.error('Fehler beim Abrufen der Hausobjekte:', err);
        setError('Fehler beim Laden der Hausobjekte');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Seitenänderung
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Anzahl der Zeilen pro Seite ändern
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Zur Hausobjekt-Detail-Seite navigieren
  const handleViewProperty = (id) => {
    navigate(`/properties/${id}`);
  };

  // Zur Hausobjekt-Bearbeiten-Seite navigieren
  const handleEditProperty = (id) => {
    navigate(`/properties/${id}/edit`);
  };

  // Hausobjekt löschen
  const handleDeleteProperty = async (id) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Hausobjekt löschen möchten?')) {
      try {
        // In einer vollständigen Implementierung würde hier ein API-Aufruf erfolgen
        // const response = await axios.delete(`${API_URL}/properties/${id}`);
        
        // Simulierte Löschung für die Demonstration
        setProperties(properties.filter(property => property.property_id !== id));
      } catch (err) {
        console.error('Fehler beim Löschen des Hausobjekts:', err);
        alert('Fehler beim Löschen des Hausobjekts');
      }
    }
  };

  // Neues Hausobjekt erstellen
  const handleCreateProperty = () => {
    navigate('/properties/new');
  };

  // Suche
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  // Zum Account navigieren
  const handleNavigateToAccount = (accountId) => {
    navigate(`/accounts/${accountId}`);
  };

  // Hausobjekte filtern
  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.street.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.account_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginierte Hausobjekte
  const paginatedProperties = filteredProperties.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <HeaderBox>
        <Typography variant="h4">
          Hausobjekte
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleCreateProperty}
        >
          Neues Hausobjekt
        </Button>
      </HeaderBox>

      <SearchBox>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Suche nach Name, Adresse, Stadt oder Account"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </SearchBox>

      <Paper elevation={2}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Adresse</strong></TableCell>
                    <TableCell><strong>Account</strong></TableCell>
                    <TableCell align="right"><strong>Aktionen</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedProperties.length > 0 ? (
                    paginatedProperties.map((property) => (
                      <TableRow key={property.property_id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <HomeWorkIcon sx={{ mr: 1, color: 'primary.main' }} />
                            {property.name}
                          </Box>
                        </TableCell>
                        <TableCell>{`${property.street} ${property.house_number}, ${property.postal_code} ${property.city}`}</TableCell>
                        <TableCell>
                          <Chip 
                            label={property.account_name} 
                            color="primary" 
                            variant="outlined" 
                            clickable
                            onClick={() => handleNavigateToAccount(property.account_id)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Details anzeigen">
                            <IconButton 
                              color="primary"
                              onClick={() => handleViewProperty(property.property_id)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Bearbeiten">
                            <IconButton 
                              color="primary"
                              onClick={() => handleEditProperty(property.property_id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Löschen">
                            <IconButton 
                              color="error"
                              onClick={() => handleDeleteProperty(property.property_id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Keine Hausobjekte gefunden
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredProperties.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Zeilen pro Seite:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} von ${count}`}
            />
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PropertyList;
