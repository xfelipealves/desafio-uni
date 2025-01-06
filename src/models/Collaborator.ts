export class Collaborator {
  fullName: string;
  birthDate: Date;
  jobId: number; 

  constructor(fullName: string, birthDate: Date, jobId: number) {
    this.fullName = fullName;
    this.birthDate = birthDate;
    this.jobId = jobId;
  }
}
