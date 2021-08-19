import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

import { useStateValue, setPatientState } from "../state";

const PatientPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();
    const setPatient = async () => {
        try {
            const { data: foundPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(setPatientState(foundPatient));
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
        }
    };

    useEffect(() => {
        if (!patient || id !== patient.id) {
            void setPatient();
        }
    }, [id]);

    if (!patient) return null;

    return (
        <div>
            <h2>{`${patient.name} `}
            { patient.gender === "male" && <Icon name='mars'/> }
            { patient.gender === "female" && <Icon name='venus'/> }
            { patient.gender === "other" && <Icon name='mars stroke vertical'/> }
            </h2>
            {patient.ssn && <p>{`ssn: ${patient?.ssn}`}</p>}
            <p>{`occupation: ${patient.occupation}`}</p>
        </div>
    );
};

export default PatientPage;