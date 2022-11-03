type Company = {
  _id: string
  active: boolean
  status: StageStatus
  name: string
  token: string
  lastHoldersCountUpdate: number
  holdersCount: number
  sellType: string[]
  description: string
  homePageUrl: string
  videoUrl: string
  logoUrl: string
  social: SocialModel
  documents: DocumentModel[]
  about: AboutModel
  details: DetailsModel
  stages: StageModel[]
  roadmap: RoadmapModel[]
  activity: ActivityModel
  members: MemberModel[]
}

export interface SocialModel {
  links: SocialModelSub[]
  feed: SocialModelSub[]
}

export interface UrlField {
  url: string
}

export interface SocialModelSub extends UrlField {
  type: string
}

export interface DocumentModel extends UrlField {
  name: string
}

export interface AboutModel {
  text: string
}

export interface DetailsModel {
  token: TokenModel
  company: CompanyModel
  additional: AdditionalCompanyDetails
}

export interface TokenModel {
  ticker: string
  supply: string
  distribution: string[]
}

export interface CompanyModel {
  registredName: string
  registredCountry: string
  foundedDate: string
}

export interface AdditionalCompanyDetails {
  platform: string
}

export interface WhitelistModel {
  fromDate: string
  tillDate: string
  categories: string
}

export interface StageModel {
  type: StageType
  startDate: string
  endDate: string
  progress: number
  goal: number
  raisedFunds: number
  cap: number
  hardcap: number
  status: StageStatus
  price: string
}

export interface RoadmapModel {
  title: string
  description: string
}

export interface ActivityModel extends UrlField {
  socials: SocialStatisModel[]
}

export interface SocialStatisModel extends UrlField {
  title: string
  type: string
  url: string
}

export interface MemberModel {
  advisor: boolean
  name: string
  position: string
  avatarUrl: string
  interview: InterviewModel
}

export interface InterviewModel {
  questions: QuestionModel[]
}

export interface QuestionModel {
  question: string
  answear: string
}

export enum StageType {
  IDO = 'IDO',
  PRIVATE_SALE = 'Private Sale',
  PRE_SALE = 'Pre Sale',
  RELEASE = 'Release',
}

export enum StageStatus {
  PAST = 'past',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
}

export default Company
