import React, { FormEvent, FormEventHandler } from 'react';
import { Button, Col, Form, FormText, InputGroup, Row } from 'react-bootstrap'
import { useAuthKey } from '../../../../contexts/AuthContext';
import { usePopup } from '../../../../contexts/PopupContext'
import { useProvidedCompany } from '../../../../contexts/ProvidedCompanyContext'
import Api from '../../../../utils/api/Api';
import RoadmapEditor from './RoadmapEditor';

function extractValue<T = string>(object: Object, path: string): T {
  const p = path.split(".");
  let tmp: any = object;

  for (let i = 0; i < p.length; i++) {
    tmp = tmp[p[i]];
    if(tmp === undefined) return tmp;
  }

  return tmp;
}

function put(object: any, key: string, value: any) {
  const path = key.split(".");
  let tmp: any = object;

  for (let i = 0; i < path.length; i++) {
    const keyItem = path[i];
    if(tmp[keyItem] === undefined) {
      if(path.length - 1 == i) {
        tmp[keyItem] = value;
      } else {
        tmp[keyItem] = {};
      }
    }
    tmp = tmp[keyItem];
  }

}

function buildObject(src: {id: string, value: any, type: string}[]) {
  let buff: any = Object({});


  for (let i = 0; i < src.length; i++) {
    console.log("type", src[i].type);
    const path = src[i].id;
    const value = src[i].value;
    put(buff, path, value);
  }
  return buff;
}

const CompanyEditor = () => {
  const { company, setCompany } = useProvidedCompany()
  const back = () => setCompany(undefined)
  const { setPopup } = usePopup()
  const {authKey} = useAuthKey();



  const Property = ({ name, description, readOnly }: { name: string; description?: string; readOnly?: boolean }) => {
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
              defaultValue={company ? extractValue<string>(Object(company), name) : ""}
            />
          </InputGroup>

          {description && <Form.Text className="text-muted">{description}</Form.Text>}
        </Form.Group>
      </Col>
    )
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!authKey) {
      setPopup(<span>Your access key not provided</span>, "Error");
      return;
    }

    if(!company) {
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
                      .map(item => {return {
                        value: item.value,
                        id: item.id,
                        type: item.dataset
                      }})

    console.log(elements);

    const object = buildObject(elements);
    
    
    
  
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
          <Property name="active" data-type="boolean" />
          <Property name="description" />
          <Property name="logoUrl" />
          <Property name="videoUrl" />
          <Property name="homePageUrl" />
          <Property name="details.additional.platform" />
          <Property name="details.company.foundedDate" />
          <Property name="details.company.registredCountry" />
          <Property name="details.company.registredName" />
        </Row>
        <Row>
          <RoadmapEditor />
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
