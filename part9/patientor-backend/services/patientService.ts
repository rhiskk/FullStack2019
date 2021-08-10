import patientData from '../data/patients.json';
import { Patient } from '../types';

const patients: Array<Omit<Patient, 'ssn'>> = patientData;

const getEntries = () => {
    return patients;
};

export default {
    getEntries
};