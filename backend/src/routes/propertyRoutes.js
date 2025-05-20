// src/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Alle Hausobjekte abrufen
router.get('/properties', propertyController.getAllProperties);

// Hausobjekt nach ID abrufen
router.get('/properties/:id', propertyController.getPropertyById);

// Hausobjekte nach Account-ID abrufen
router.get('/accounts/:accountId/properties', propertyController.getPropertiesByAccountId);

// Neues Hausobjekt erstellen
router.post('/properties', propertyController.createProperty);

// Hausobjekt aktualisieren
router.put('/properties/:id', propertyController.updateProperty);

// Hausobjekt löschen
router.delete('/properties/:id', propertyController.deleteProperty);

module.exports = router;
