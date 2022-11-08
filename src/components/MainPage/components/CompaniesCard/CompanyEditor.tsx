import { Button, Col, Form, FormText, InputGroup, Row } from 'react-bootstrap'
import { usePopup } from '../../../../contexts/PopupContext'
import { useProvidedCompany } from '../../../../contexts/ProvidedCompanyContext'

const CompanyEditor = () => {
  const { company, setCompany } = useProvidedCompany()
  const back = () => setCompany(undefined)
  const { setPopup } = usePopup()


  if (!company) {
    return <div>Error! Company not loaded</div>
  }

  const Property = ({ name, description, readOnly }: { name: string; description?: string; readOnly?: boolean }) => {
    return (
      <Col lg="6">
        <Form.Group controlId="formAccessToken">
          <Form.Label>{name[0].toUpperCase() + name.slice(1)}</Form.Label>

          <InputGroup>
            <Form.Control
              readOnly={readOnly}
              type="text"
              placeholder={`Enter ${name}`}
              defaultValue={Object(company)[name]}
            />
          </InputGroup>

          {description && <Form.Text className="text-muted">{description}</Form.Text>}
        </Form.Group>
      </Col>
    )
  }


  const onChange = () => {
    setPopup(<span>Hello world)</span>);
    
  }

  return (
    <div>
      <div>
        <span>{company.name}</span>
        <span style={{ right: '15px', position: 'absolute' }}>
          <a href="#" onClick={back}>
            Back
          </a>
        </span>
      </div>

      <Form>
        <Row>
          <Property name="name" />
          <Property name="token" />
          <Property name="active" />
          <Property name="description" />
          <Property name="logoUrl" />
          <Property name="videoUrl" />
          <Property name="homePageUrl" />
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Button variant="primary" style={{ marginTop: '10px', width: '100%' }} onClick={onChange}>
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
