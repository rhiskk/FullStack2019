import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";
import { Icon } from "semantic-ui-react";

import { useStateValue, setPatientState, setDiagnoseList } from "../state";
import { EntryDetails } from "../components/EntryDetails";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient, diagnoses }, dispatch] = useStateValue();
    const setPatient = async () => {
        try {
            const { data: foundPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(setPatientState(foundPatient));
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
        }
    };

    const setDiagnoses = async () => {
        try {
            const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
            dispatch(setDiagnoseList(diagnoses));
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
        }
    };

    useEffect(() => {
        void setDiagnoses();
    }, []);

    useEffect(() => {
        if (!patient || id !== patient.id) {
            void setPatient();
        }
    }, [id]);

    if (!patient) return null;

    return (
        <div>
            <h2>
                {`${patient.name} `}
                {patient.gender === "male" && <Icon name='mars' />}
                {patient.gender === "female" && <Icon name='venus' />}
                {patient.gender === "other" && <Icon name='mars stroke vertical' />}
            </h2>
            {patient.ssn && <p>{`ssn: ${patient.ssn}`}</p>}
            <p>{`occupation: ${patient.occupation}`}</p>
            <h4>entires</h4>
            {patient.entries.map((entry: Entry) =>
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
            )}
        </div>
    );
};

export default PatientPage;