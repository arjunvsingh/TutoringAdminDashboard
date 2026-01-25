export interface ComplianceMetric {
    districtId: string;
    period: 'Weekly' | 'Monthly' | 'YTD';
    stats: {
        totalStudents: number;
        compliantStudents: number; // Met the 3x30min mandate
        atRiskStudents: number;    // Missed > 1 session
        targetMinutes: number;     // e.g. 90
        deliveredMinutes: number;
        complianceRate: number;    // 0-100
    };
    trend: number; // +5.2% vs last week
}

export const GRANT_COMPLIANCE_DATA: ComplianceMetric = {
    districtId: "D-101",
    period: 'Weekly',
    stats: {
        totalStudents: 2450,
        compliantStudents: 2082, // ~85%
        atRiskStudents: 368,
        targetMinutes: 90,
        deliveredMinutes: 84, // avg per student
        complianceRate: 85,
    },
    trend: 2.1
};
