export interface Resource {
    type: string;
    title: string;
    platform: string;
    link: string;
}

export interface Project {
    title: string;
    description: string;
}

export interface LearningPathStage {
    stage: string;
    duration_months: number;
    focus: string[];
    skills: string[];
    resources: Resource[];
    projects: Project[];
}

export interface MetaData {
    goal: string;
    duration_months: number;
    weekly_time_hours: number;
    level: string;
}

export interface LearningPathResponse {
    meta: MetaData;
    learning_path: LearningPathStage[];
}
