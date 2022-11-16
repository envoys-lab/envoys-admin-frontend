import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { usePopup } from "../../../../contexts/PopupContext";
import { RoadmapModel } from "../../../../utils/api/types/Company";
import Alert from "../../../Alert";

type RoadmapEditorProps = {
    defaultRoadmap?: RoadmapModel[]
    onChange?: (roadmap: RoadmapModel[]) => void
}

const RoadmapEditor = ({defaultRoadmap = [], onChange}: RoadmapEditorProps) => {
    const [roadmap, setRoadmap] = React.useState<RoadmapModel[]>(defaultRoadmap);
    const [newRoadmapItem, setNewRoadmapItem] = React.useState<RoadmapModel>({title:'', description: ''});
    const [error, setError] = React.useState<string | undefined>();
    const updateNewRoadmapItem = (event: any) => {
        const value = event.target.value
        const key = event.target.type === "text" ? "title" : "description"

        setNewRoadmapItem((prev: RoadmapModel) => {
            return {
                ...prev,
                [key]: value,
            }
        })
    }

    React.useEffect(() => {
        onChange !== undefined && onChange(roadmap);
    }, [roadmap])

    const addRoadmapItem = () => {
        setError(undefined)
        if(
            newRoadmapItem.title.trim().length === 0 || 
            newRoadmapItem.description.trim().length === 0
        ) {
            return setError("Title and description must be used");
        }
        setRoadmap(prev => [...roadmap, newRoadmapItem]);
        setNewRoadmapItem({title: '', description: ''})
    }

    const removeItem = (index: number) => {
        setRoadmap(prev => {
            return [
                ...prev.slice(0, index),
                ...prev.slice(index+1)
            ]
        })
    }

    const RoadmapItem = ({title, children, index}: {title: string, children: string, index: number}) => {
        return <Form.Group><Alert onClose={() => removeItem(index)} title={`${index+1}. ${title}`}>{children}</Alert></Form.Group>
    }

    return <>
        <h2>Roadmap</h2>

        {roadmap.map((item, index) => {

            return <RoadmapItem index={index} key={`${item.title}//${item.description}`} title={item.title}>{item.description}</RoadmapItem>
        })}

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={newRoadmapItem.title} onInput={updateNewRoadmapItem} />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Text</Form.Label>
          <InputGroup>
            <Form.Control as="textarea" value={newRoadmapItem.description} onInput={updateNewRoadmapItem} rows={3} />
          </InputGroup>
        </Form.Group>

        
        <Form.Group className="mt-3">
            {error && <Alert variant="danger" title="Error" onClose={() => setError(undefined)}>{error}</Alert>}
            <Button variant="success" onClick={addRoadmapItem}>Add Roadmap Item</Button>
        </Form.Group>
    </>;
}
 
export default RoadmapEditor;