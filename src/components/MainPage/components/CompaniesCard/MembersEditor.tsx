import React from "react";
import { Badge, Button, Form, InputGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { InterviewModel, MemberModel, QuestionModel } from "../../../../utils/api/types/Company";
import Alert from "../../../Alert";

type MembersEditorProps = {
    defaultMembers?: MemberModel[],
    onChange?: (members: MemberModel[]) => void
}

type InterviewEditorProps = {
    questions: QuestionModel[],
    setQuestions: React.Dispatch<React.SetStateAction<QuestionModel[]>>
}

const baseNewMember = {
    advisor: false,
    name: "",
    position: "",
    avatarUrl: "",
    interview: {
        questions: []
    }
}

const InterviewEditor = ({questions, setQuestions}: InterviewEditorProps) => {
    const [newQuestion, setNewQuestion] = React.useState<QuestionModel>({question: "", answear: ""});

    const updateQuestion = (data: any) => {
        setNewQuestion(prev => {
            return {
                ...prev,
                ...data
            }
        })
    }

    const addQuestion = () => {
        setQuestions(prev => {
            return [
                ...prev,
                newQuestion
            ]
        })
        setNewQuestion({question:"", answear: ""})
    }

    return <>
        <h3>Questions</h3>
        {questions.map((quest, index) => {
            return <Form.Group key={index}><Alert variant="success" title={quest.question}>{quest.answear}</Alert></Form.Group>
        })}
        <Form.Group>
            <Form.Label>Question</Form.Label>
            <InputGroup>
                <Form.Control type="text" value={newQuestion.question} onInput={(e: any) => updateQuestion({question: e.target.value})} />
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Answear</Form.Label>
            <InputGroup>
                <Form.Control type="text" value={newQuestion.answear} onInput={(e: any) => updateQuestion({answear: e.target.value})} />
            </InputGroup>
        </Form.Group>



        <Form.Group className="mt-3">
            {/* {error && <Alert variant="danger" title="Error" onClose={() => setError(undefined)}>{error}</Alert>} */}
            <Button variant="success" onClick={addQuestion}>Add Question</Button>
        </Form.Group>
    </>
}

const MembersEditor = ({ onChange, defaultMembers = [] }: MembersEditorProps) => {
    const [members, setMembers] = React.useState<MemberModel[]>(defaultMembers);

    const [newMemberItem, setNewMemberItem] = React.useState<MemberModel>(baseNewMember);
    const [questions, setQuestions] = React.useState<QuestionModel[]>([]);
    React.useEffect(() => {
        setQuestions(newMemberItem.interview.questions);
    }, [newMemberItem])

    React.useEffect(() => {
        onChange && onChange(members);
    }, [members])

    const updateNewMemberName = (e: any) => {
        setNewMemberItem({
            ...newMemberItem,
            name: e.target.value
        })
    }

    const updateNewMemberPosition = (e: any) => {
        setNewMemberItem({
            ...newMemberItem,
            position: e.target.value
        })
    }

    const updateNewMemberAvatarUrl = (e: any) => {
        setNewMemberItem({
            ...newMemberItem,
            avatarUrl: e.target.value
        })
    }

    const updateNewMemberAdvisor = (e: any) => {
        setNewMemberItem({
            ...newMemberItem,
            advisor: e.target.checked
        })
    }

    const addMemberItem = () => {
        const item = {
            ...newMemberItem,
            interview: {
                questions
            }
        }
        console.log(item);

        setMembers(prev => {
            return [
                ...prev,
                item
            ]
        })

        setNewMemberItem(baseNewMember);
    }

    return <>
        <h2>Members</h2>

        {members.map((member, index) => {
            return <Form.Group key={index}>
                <Alert title={member.name}>
                    <img src={member.avatarUrl} alt="avatar" style={{padding: "5px"}} />
                    {member.position}

                    {member.interview.questions.map((quest, index) => {
                        return <p key={index}>
                            {index + 1}. {quest.question}<br></br>{quest.answear}
                        </p>
                    })}

                </Alert>
            </Form.Group>
        })}
        <Form.Group>
            <Form.Check style={{display: "inline-block"}} id="advisor-check" value={newMemberItem.advisor ? "on" : "off"} onInput={updateNewMemberAdvisor} />
            <Form.Label htmlFor="advisor-check" style={{display: "inline-block", marginLeft: "10px"}}>Advisor</Form.Label>
        </Form.Group>

        <Form.Group>
            <Form.Label>Name</Form.Label>
            <InputGroup>
                <Form.Control type="text" value={newMemberItem.name} onInput={updateNewMemberName} />
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Position</Form.Label>
            <InputGroup>
                <Form.Control value={newMemberItem.position} onInput={updateNewMemberPosition} />
            </InputGroup>
        </Form.Group>

        <Form.Group>
            <Form.Label>Avatar url</Form.Label>
            <InputGroup>
                <Form.Control value={newMemberItem.avatarUrl} onInput={updateNewMemberAvatarUrl} />
            </InputGroup>
        </Form.Group>



        <InterviewEditor questions={questions} setQuestions={setQuestions} />
        <Form.Group className="mt-3">
            {/* {error && <Alert variant="danger" title="Error" onClose={() => setError(undefined)}>{error}</Alert>} */}
            <Button variant="success" onClick={addMemberItem}>Add Member Item</Button>
        </Form.Group>
    </>;
}

export default MembersEditor;
