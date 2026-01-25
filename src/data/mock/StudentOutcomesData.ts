export interface SkillGap {
    id: string;
    name: string;
    subject: string;
    grade: string;
    masteryRate: number; // 0-100
    impact: number;      // Number of students struggling
}

export const SKILLS_GAP_DATA: SkillGap[] = [
    { id: 's1', name: 'Linear Equations', subject: 'Math', grade: '9th', masteryRate: 42, impact: 158 },
    { id: 's2', name: 'Reading Comprehension (Inference)', subject: 'ELA', grade: '7th', masteryRate: 55, impact: 120 },
    { id: 's3', name: 'Quadratic Functions', subject: 'Math', grade: '10th', masteryRate: 48, impact: 95 },
    { id: 's4', name: 'Fractions & Decimals', subject: 'Math', grade: '6th', masteryRate: 60, impact: 88 },
    { id: 's5', name: 'Essay Structure', subject: 'ELA', grade: '9th', masteryRate: 65, impact: 76 },
];

export interface StudentAcademicProfile {
    studentId: number;
    masteryScore: number;
    assessments: { date: string; name: string; score: number }[];
    recentSessions: { date: string; topic: string; mastery: number }[];
}

// Generate a random profile for a given ID
export const getStudentProfile = (id: number): StudentAcademicProfile => ({
    studentId: id,
    masteryScore: 60 + Math.floor(Math.random() * 35), // Random 60-95
    assessments: [
        { date: '2023-09-15', name: 'Diagnostic', score: 55 },
        { date: '2023-10-30', name: 'Mid-Term', score: 68 },
        { date: '2023-12-15', name: 'Winter Benchmark', score: 74 },
    ],
    recentSessions: [
        { date: '2 days ago', topic: 'Linear Equations', mastery: 80 },
        { date: '5 days ago', topic: 'Graphing', mastery: 65 },
        { date: '1 week ago', topic: 'Word Problems', mastery: 90 },
    ]
});
