export interface TutorImpact {
    id: string;
    name: string;
    subject: string;
    studentGrowthPercentile: number; // Avg growth of their students
    retentionRate: number; // % of students who keep returning
    topSkill: string;
}

export const TUTOR_IMPACT_DATA: TutorImpact[] = [
    { id: 't1', name: 'Sarah Jenkins', subject: 'Math', studentGrowthPercentile: 94, retentionRate: 98, topSkill: 'Algebra II' },
    { id: 't2', name: 'David Park', subject: 'Science', studentGrowthPercentile: 88, retentionRate: 92, topSkill: 'Physics' },
    { id: 't3', name: 'Emily Rogers', subject: 'ELA', studentGrowthPercentile: 85, retentionRate: 89, topSkill: 'Essay Writing' },
    { id: 't4', name: 'Mike Thompson', subject: 'Math', studentGrowthPercentile: 72, retentionRate: 85, topSkill: 'Geometry' },
    { id: 't5', name: 'Jessica Wong', subject: 'Math', studentGrowthPercentile: 68, retentionRate: 80, topSkill: 'Fractions' },
];
