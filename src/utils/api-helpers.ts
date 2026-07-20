export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface PatientContainer {
  id: string;
  name: string;
  mrn: string;
  dob: string;
  lastVisit: string;
  bloodType?: string;
  patientStatus?: string;
  healthInsurance?: string;
  primaryRiskFactor?: string;
}

export interface AssessmentRecord {
  id: string;
  date: string;
  probability: number;
  riskLabel: string;
  narrative: string;
}

export function mapToPatientContainer(raw: any): PatientContainer {
  const dob = raw.dateOfBirth || '1990-01-01';
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  const formattedDob = new Date(dob).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const lastVisit = raw.createdAt
    ? new Date(raw.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '-';

  return {
    id: String(raw.id),
    name: raw.patientName,
    mrn: raw.medicalRecordNumber,
    dob: `${formattedDob} (${age} Tahun)`,
    lastVisit,
    bloodType: raw.bloodType,
    patientStatus: raw.patientStatus,
    healthInsurance: raw.healthInsurance,
    primaryRiskFactor: raw.primaryRiskFactor,
  };
}

export function mapToAssessmentRecord(raw: any): AssessmentRecord {
  const date = raw.createdAt
    ? new Date(raw.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '-';

  return {
    id: String(raw.assessmentId || raw.id), // support both formats
    date,
    probability: Math.round((raw.probability ?? 0) * 100),
    riskLabel: raw.riskLabel ?? 'LOW',
    narrative: raw.narrativeExplanation ?? 'Narasi tidak tersedia.',
  };
}
