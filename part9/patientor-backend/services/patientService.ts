import patientData from '../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, PublicPatient, Gender } from '../types';

const publicPatients: Array<PublicPatient> = patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    })) as Array<PublicPatient>;

const getPatients = (): Array<PublicPatient> => {
    return publicPatients;
};

const getPatient = (id: string): Patient | undefined => {
    return patientData.find(p => p.id === id);
};

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string): Patient => {
    const id = uuid();
    const newPatient = { id, name, dateOfBirth, ssn, gender, occupation, entries: [] };
    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient,
    getPatient
};