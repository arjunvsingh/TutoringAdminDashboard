import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ChevronRight } from "lucide-react";

const flagged = [
    {
        id: "flag_1",
        issue: "Late Start (+10m)",
        student: "Jordan P.",
        tutor: "Alex R.",
        time: "10:30 AM Today",
        severity: "warning",
    },
    {
        id: "flag_2",
        issue: "Low Rating (2/5)",
        student: "Emma W.",
        tutor: "Sarah J.",
        time: "Yesterday",
        severity: "poor",
    },
    {
        id: "flag_3",
        issue: "Video Disconnect",
        student: "Lucas T.",
        tutor: "Mike K.",
        time: "Yesterday",
        severity: "warning",
    }
];

export function QualityAssurance() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Needs Review</CardTitle>
                <CardDescription>Flagged sessions requiring admin attention.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {flagged.map((item) => (
                        <div key={item.id} className="flex items-center justify-between space-x-4 border-b pb-4 last:border-0 last:pb-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{item.issue}</span>
                                    <Badge variant={item.severity === "poor" ? "poor" : "warning"} className="px-1.5 py-0">
                                        {item.severity === "poor" ? "Crit" : "Warn"}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    {item.student} • {item.tutor}
                                </p>
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                                {item.time}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-2">
                    <button className="w-full text-xs text-center text-muted-foreground hover:text-foreground transition-colors">
                        View All Flagged Sessions
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
