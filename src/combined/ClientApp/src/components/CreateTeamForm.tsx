import Button from "@mui/material/Button";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

const CreateTeamForm = () => {
    return (
        <div style={{display:'flex', justifyContent:'center'}}>

        <Form style={{width:'90vw', border:'solid #673ab7', borderRadius:'30px'}}>
            <FormGroup>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>

                    <Label
                        for="exampleFile"
                        sm={2}
                    >
                    </Label>
                        <Input
                            id="exampleFile"
                            name="file"
                            type="file"
                            placeholder="Team Logo"
                        />
                        <FormText>
                            This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.
                        </FormText>
                    </Col>
                </Row>
            </FormGroup>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col md={6} xs={8}>
                    <FormGroup>
                        <Label for="exampleEmail">
                            Team Name
                        </Label>
                        <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="Team Name"
                            type="email"
                        />
                    </FormGroup>
                </Col>

            </Row>
            <FormGroup>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>

                    <Col md={6} xs={8}>


                        <Label
                            for="exampleText"
                            sm={2}
                        >
                            Team Description
                        </Label>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                        />

                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    <Col md={6} xs={8}>

                        <Label for="exampleAddress">
                            Donation Goal
                        </Label>
                        <Input
                            id="exampleAddress"
                            name="donationGoal"
                            placeholder="$"
                            type="number"
                        />
                    </Col>
                </Row>
            </FormGroup>
            <Col md={12} xs={8} style={{ display: 'flex', justifyContent: 'center' }}>

                <Button variant='contained' sx={{backgroundColor:'orange'}}>Submit</Button>
            </Col>
        </Form>
        </div>

    );
}

export default CreateTeamForm;