import React from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useAuthKey } from '../../../../contexts/AuthContext';
import { usePopup } from '../../../../contexts/PopupContext'
import { useProvidedCompany } from '../../../../contexts/ProvidedCompanyContext'
import Api from '../../../../utils/api/Api';
import { RoadmapModel, SocialModel } from '../../../../utils/api/types/Company';
import RoadmapEditor from './RoadmapEditor';
import SocialEditor from './SocialEditor';

function extractValue<T = string>(object: Object, path: string): T {
  const p = path.split(".");
  let tmp: any = object;

  for (let i = 0; i < p.length; i++) {
    tmp = tmp[p[i]];
    if (tmp === undefined) return tmp;
  }

  return tmp;
}

function put(object: any, key: string, value: any) {
  const path = key.split(".");
  let tmp: any = object;

  for (let i = 0; i < path.length; i++) {
    const keyItem = path[i];
    if (tmp[keyItem] === undefined) {
      if (path.length - 1 === i) {
        tmp[keyItem] = value;
      } else {
        tmp[keyItem] = {};
      }
    }
    tmp = tmp[keyItem];
  }

}

function buildObject(src: { id: string, value: any, type: string }[]) {
  let buff: any = Object({});


  for (let i = 0; i < src.length; i++) {
    const path = src[i].id;
    let value: any;

    if (src[i].type === "string") {
      value = src[i].value;
    } else if (src[i].type === "boolean") {
      value = Boolean(
        src[i].value === "true"
          ? true
          : src[i].value === "false"
            ? false
            : parseInt(src[i].value))
    }
    put(buff, path, value);
  }
  console.log(buff);
  return buff;
}


type PropertyProps = {
  name: string
  description?: string
  readOnly?: boolean
  type?: string
  onInput?: (text: string) => void
  onChange?: (text: string) => void
}

const CompanyEditor = () => {
  const { company, setCompany } = useProvidedCompany()
  const back = () => setCompany(undefined)
  const { setPopup } = usePopup()
  const { authKey } = useAuthKey();
  const [roadmap, setRoadmap] = React.useState<RoadmapModel[]>(company ? company.roadmap : []);
  const [social, setSocial] = React.useState<SocialModel>(company ? company.social : {feed: [], links: []});


  const LogoProperty = () => {
    const [logoUrl, setLogoUrl] = React.useState<string>('');

    return <>
       <Property name="logoUrl" onChange={setLogoUrl} />
        <Col lg="6">
          <img alt="logo" src={logoUrl} width="100" height="100" />
          <img alt="logo" src={logoUrl} width="80" height="80" />
          <img alt="logo" src={logoUrl} width="60" height="60" />
          <img alt="logo" src={logoUrl} width="30" height="30" />
        </Col>
    </>
  }

  const Property = ({
    name,
    description,
    readOnly,
    type = "string",
    onInput,
    onChange
  }: PropertyProps) => {
    const defaultValue = company ? extractValue<string>(Object(company), name) : ""

    React.useEffect(() => {
      onInput && onInput(defaultValue);
      onChange && onChange(defaultValue)

    }, [onInput, onChange, defaultValue]);
    return (
      <Col lg="6">
        <Form.Group>
          <Form.Label>{(name[0].toUpperCase() + name.slice(1)).replaceAll(".", " ")}</Form.Label>

          <InputGroup>
            <Form.Control
              id={name}
              readOnly={readOnly}
              type="text"
              placeholder={`Enter ${name}`}
              defaultValue={defaultValue}
              data-type={type}
              onInput={(e: any) => onInput && onInput(e.target.value)}
              onChange={(e: any) => onChange && onChange(e.target.value)}
            />
          </InputGroup>

          {description && <Form.Text className="text-muted">{description}</Form.Text>}
        </Form.Group>
      </Col>
    )
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!authKey) {
      setPopup(<span>Your access key not provided</span>, "Error");
      return;
    }

    if (!company) {
      setPopup(<span>Your company not provided</span>, "Error");
      return;
    }
    const api = new Api(authKey);
    console.log(event.currentTarget.elements);

    const elements = Object.keys(event.currentTarget.elements)
      .map(key => parseInt(key))
      .filter(key => !isNaN(key))
      .map(key => key.toString())
      .map(key => Object(event.currentTarget.elements)[key as string])
      .map(item => {
        return {
          value: item.value,
          id: item.id,
          type: item.dataset.type || "string"
        }
      })

    console.log(elements);

    const object = {
      ...buildObject(elements),
      roadmap,
      social
    };

    api.updateCompany(company._id, object);
  }

  return (
    <div>
      <div>
        <span>{company ? company.name : "New company"}</span>
        <span style={{ right: '15px', position: 'absolute' }}>
          <a href="#" onClick={back}>
            Back
          </a>
        </span>
      </div>

      <Form onSubmit={submitHandler}>

        <Row>
          <Property name="name" />
          <Property name="token" />
          <Property name="active" type="boolean" />
          <Property name="description" />
          <LogoProperty />
          <Property name="videoUrl" />
          <Property name="homePageUrl" />
          <Property name="details.additional.platform" />
          <Property name="details.company.foundedDate" />
          <Property name="details.company.registredCountry" />
          <Property name="details.company.registredName" />
        </Row>
        <Row>
          <RoadmapEditor defaultRoadmap={roadmap} onChange={setRoadmap} />
        </Row>

        <Row>
          <SocialEditor defaultSocial={social} onChange={setSocial} />
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Button type="submit" variant="primary" style={{ marginTop: '10px', width: '100%' }}>
                Change
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default CompanyEditor
