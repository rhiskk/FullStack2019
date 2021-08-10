import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientService.getEntries());
});

export default router;