import axios, { AxiosInstance, AxiosResponse } from 'axios'
import Company, {
  AboutModel,
  ActivityModel,
  DetailsModel,
  DocumentModel,
  MemberModel,
  RoadmapModel,
  SocialModel,
  StageModel,
  StageStatus,
} from './types/Company'
import Meta from './types/Meta'

export type GetCompaniesProps = {
  page?: number
  size?: number
  search?: string
}

export class CompanyProps {
  active?: boolean
  status?: number
  sellType?: string[]
  name?: string
  token?: string
  description?: string
  homePageUrl?: string
  videoUrl?: string
  logoUrl?: string
  social?: SocialModel
  documents?: DocumentModel[]
  about?: AboutModel
  details?: DetailsModel
  stages?: StageModel[]
  roadmap?: RoadmapModel[]
  activity?: ActivityModel
  members?: MemberModel[]
}

export type DeleteCompanyProps = {
  companyId: string
}

class Api {
  public readonly endpoint: string
  private readonly net: AxiosInstance

  constructor(accessToken: string, url?: string) {
    this.endpoint = url ? url : (process.env.REACT_APP_API_URL as string)
    console.log(`Api inited in endpoint ${this.endpoint}`)
    this.net = axios.create({
      baseURL: this.endpoint,
      timeout: 5000,
      headers: {
        authorization: `Token ${accessToken}`,
      },
    })
  }

  public async companies(params?: GetCompaniesProps) {
    return await this._page<Company>(this._resp(this.net.get('/companies', { params })))
  }

  public async getCompany(companyId: string) {
    return await this._resp(this.net.get(`/companies/${companyId}`))
  }

  public async deleteCompany(companyId: string) {
    return await this._resp(this.net.delete(`/admin/companies/${companyId}`))
  }

  public async updateCompany(companyId: string, params: CompanyProps) {
    return await this._resp(this.net.patch(`/admin/companies/${companyId}`, params))
  }

  public async addCompany(params: CompanyProps) {
    if (params.active) params.active = Boolean(params.active)
    return await this._resp(this.net.post(`/admin/companies`, params))
  }

  private async _page<T>(src: any | Promise<any>): Promise<{ meta: Meta; items: T[] }> {
    if (src.then !== undefined && src.catch !== undefined) {
      return await this._page<T>(await src)
    }
    const items = src.items as T[]
    const meta = src.meta as Meta
    return {
      items,
      meta,
    }
  }

  private async _resp(resp: Promise<AxiosResponse>) {
    try {
      const data = (await resp).data
      if ((await resp).status == 200) {
        if (data.message) {
          console.log(`[API_MESSAGE] ${data.message}`)
        }
        return data
      } else {
        throw new Error((await resp).statusText)
      }
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        console.log('REQUEST')
        console.log(e.request._header)

        if (e.response.data.statusCode) {
          console.log(`Status code: ${e.response.data.statusCode}`)
        }
        if (e.response.data.error) {
          console.log(e.response.data.error)
        }

        console.log(`Data: ${e.response.data.message}\n\n`)
      }
      throw new Error(e)
    }
  }
}

export default Api
