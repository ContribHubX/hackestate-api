export interface TestResultDto {
    id : string;
    base64pdf : string
}

export interface TestResultDtoMinimal {
    id: string;
    userPid: string;
    testName: string;
    testDate: Date;
}
