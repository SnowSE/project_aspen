import axios from "axios";
import React, { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

const EditTeam = () => {
    const [searchParams] = useSearchParams();
    const list = []
    for (var entry of searchParams.entries()) {
        console.log(entry[1]);
        list.push(entry[1])
    }
    var tId = parseInt(list[0]);
    if (list[0] !== null) {
        tId = parseInt(list[0]);   // parse the string back to a number.
    }
   


    const api = process.env.PUBLIC_URL + `/api/teams/${tId}`;
    const [currentTeam, setCurrentTeam] = useState<any>();
    const [tempImage, setTempImage] = useState<string>("");
    const [teamImage, setTeamImage] = useState<File | undefined>(undefined);

    const baseImageUrl = process.env.PUBLIC_URL + "/assets/";

    const [image, setImage] = useState<File>()

    useEffect(() => {
        const fetchTeam = async () => {
            const response = await fetch(api);
            const data = await response.json();
            setCurrentTeam(data);
            setTeamImage(data.mainImage);
        };

        const callServise = async () => {
            await fetchTeam();
        };
        callServise();

    }, [api]);

   

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        var assetsUrl = process.env.PUBLIC_URL + "/api/asset"
        if (!image) {
            return
        }

        const data = new FormData();
        data.append('asset', image, image.name);
        const imageResponse = await fetch(assetsUrl, {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
        })

        const result = await imageResponse.json()
        console.log('upload result:', result)

            try {
                const response = await axios.put(api, currentTeam);
                console.log(response);
                alert("Team information updated successfully!");
            } catch (error) {
                console.error(error);
                alert("An error occurred while updating the team information.");
            }      

    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

   

    return (
        <div>
            {currentTeam ? (

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={5} xs={6}>
                                <Label>
                                    Team Name
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={currentTeam.name}
                                    onChange={(event) =>
                                        setCurrentTeam({
                                            ...currentTeam,
                                            name: event.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Row>
                    </FormGroup> 
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={6} xs={8}>
                                <Label>
                                </Label>
                                <Input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {image ? (
                                    <img
                                       
                                        className="team-image-preview"
                                       /* src={image}*/
                                        alt="Team Preview"
                                    />
                                ) : null}
                                
                                <FormText>
                                    You can change the team image in here
                                </FormText>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={6} xs={8}>
                                <Label>
                                </Label>
                                <Input
                                    id="description"
                                    value={currentTeam.description}
                                    onChange={(event) =>
                                        setCurrentTeam({
                                            ...currentTeam,
                                            description: event.target.value,
                                        })
                                    }/>
                                <FormText>
                                    You can edit the team description
                                </FormText>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row className="FormRowOne">
                            <Col md={6} xs={8}>
                                <Label>
                                </Label>
                                <Input
                                    type="number"
                                    id="donation-goal"
                                    value={currentTeam.donationTarget}
                                    onChange={(event) => setCurrentTeam({
                                        ...currentTeam,
                                        donationTarget: event.target.value,
                                    })
                                    } />
                                <FormText>
                                    Current donation goal
                                </FormText>
                                
                            </Col>
                        </Row>
                    </FormGroup>

                    
                    <button type="submit">Save</button>

                </Form>

            ) : (
                "Loading..."
            )}
        </div>
    );

}
export default EditTeam;
