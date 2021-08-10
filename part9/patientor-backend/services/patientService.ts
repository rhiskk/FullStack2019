import patientData from '../data/patients.json';
import {v1 as uuid} from 'uuid';
import { Patient, Gender } from '../types';

const patients: Array<Omit<Patient, 'ssn'>> = patientData as Array<Patient>;

const getPatients = (): Array<Omit<Patient, 'ssn'>> => {
    return patients;
};

const addPatient = ( name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string): Patient => {
    const id = uuid();
    const newPatient = {id, name, dateOfBirth, ssn, gender, occupation };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};