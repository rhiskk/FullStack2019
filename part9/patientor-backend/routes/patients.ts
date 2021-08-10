import express from 'express';
import patientService from '../services/patientService';
import toPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const { name, dateOfBirth, ssn, gender, occupation } = toPatient(req.body);
        const newPatient = patientService.addPatient(
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        );
        res.json(newPatient);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

export default router;