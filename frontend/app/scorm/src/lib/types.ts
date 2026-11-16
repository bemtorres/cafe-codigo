export interface Lesson {
  slug: string;
  title: string;
  href: string;
}

export interface Course {
  slug: string;
  name: string;
  description: string;
  category: string;
  color: string;
  lessons: Lesson[];
}

export interface ScormBranding {
  institution: string;
  studentName: string;
  studentEmail: string;
  logoUrl: string;
  background: string;
  barColor: string;
  textColor: string;
  baseUrl: string;
}

export interface SelectedLesson {
  course: Course;
  lesson: Lesson;
}

export type ScormVersion = '1.2' | '2004';

export interface CompileOptions {
  branding: ScormBranding;
  selected: SelectedLesson[];
  version: ScormVersion;
  packagePerLesson: boolean;
  zipPrefix: string;
}
