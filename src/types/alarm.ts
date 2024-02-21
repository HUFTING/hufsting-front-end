export type HuftingAlarmIconType = '매칭 요청' | '매칭 수락';
export interface AlarmListType {
  count: number;
  data: Array<{
    id: number;
    title: string;
    alarmType: HuftingAlarmIconType;
    createdAt: Date;
  }>;
}

// export type AlarmType<T extends 'Accept' | 'New'> = T extends 'Accept'
//   ? AcceptAlarmType
//   : NewAlarmType;
export type AlarmType = AgreedAlarmType | NewAlarmType;
export interface AgreedAlarmType {
  id: number;
  openTalkLink: string;
}

export interface NewAlarmType {
  matchingRequestId: number;
  matchingRequestTitle: string;
  participants: ParticipantInfo[];
  matchingAcceptance: string;
  hosts: ParticipantInfo[];
}

interface ParticipantInfo {
  id: number;
  name: string;
  major: string;
  gender: string;
  studentNumber: string;
  age: string;
  mbti: string;
  content: string;
}
