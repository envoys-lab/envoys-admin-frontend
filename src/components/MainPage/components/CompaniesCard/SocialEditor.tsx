import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { SocialModel, SocialModelSub } from "../../../../utils/api/types/Company";
import Alert from "../../../Alert";

type SocialEditorProps = {
    defaultSocial?: SocialModel,
    onChange?: (social: SocialModel) => void
}

type SocialItemProps = {
    link: SocialModelSub,
    feed: SocialModelSub,
    index: number
}

const baseNewSocialItem = {
    link: {
        type: "",
        url: ""
    },
    feed: {
        type: "",
        url: ""
    }
};

const SocialEditor = ({onChange, defaultSocial = {links: [], feed: []}}: SocialEditorProps) => {
    const [social, setSocial] = React.useState<SocialModel>(defaultSocial);
    const [newSocialItem, setNewSocialItem] = React.useState<{
        link: SocialModelSub, 
        feed: SocialModelSub
    }>(baseNewSocialItem);

    const removeItem = (index: number) => {
        setSocial(prev => {
            return {
                links: [
                    ...prev.links.slice(0, index),
                    ...prev.links.slice(index + 1)
                ],
                feed: [
                    ...prev.feed.slice(0, index),
                    ...prev.feed.slice(index + 1)
                ]
            }
        });
    }

    const SocialItem = ({link, feed, index}: SocialItemProps) => <>
        <Form.Group>
            <Alert onClose={() => removeItem(index)}
                title={`${index + 1}. ${feed.url} (${feed.type})`}
            >
                {`${link.url} (${link.type})`}
            </Alert>
        </Form.Group>
    </>

    const updateFeedType = (e: any) => {
        const text: string = e.target.value;
        setNewSocialItem(prev => {
            return {
                link: prev.link,
                feed: {
                    type: text,
                    url: prev.feed.url
                }
            }
        })
    }
    const updateFeedUrl = (e: any) => {
        const text: string = e.target.value;
        setNewSocialItem(prev => {
            return {
                link: prev.link,
                feed: {
                    type: prev.feed.type,
                    url: text
                }
            }
        })
    }
    const updateLinkType = (e: any) => {
        const text: string = e.target.value;
        setNewSocialItem(prev => {
            return {
                link: {
                    type: text,
                    url: prev.link.url
                },
                feed: prev.feed
            }
        })
    }
    const updateLinkUrl = (e: any) => {
        const text: string = e.target.value;
        setNewSocialItem(prev => {
            return {
                link: {
                    type: prev.link.type,
                    url: text
                },
                feed: prev.feed
            }
        })
    }

    const addSocialItem = () => {
        if(
            newSocialItem.feed.url.trim().length === 0 || 
            newSocialItem.feed.type.trim().length === 0 || 
            newSocialItem.link.url.trim().length === 0 || 
            newSocialItem.link.type.trim().length === 0
        ) {
            return alert("error")
        }
        if( !newSocialItem.feed.url.startsWith('http') ||
            !newSocialItem.link.url.startsWith('http')
        ) return alert("url must be start at http");

        setSocial(prev => {
            return {
                feed: [...prev.feed, newSocialItem.feed],
                links: [...prev.links, newSocialItem.link],
            }
        });
        setNewSocialItem(baseNewSocialItem)
    }

    React.useEffect(() => {
        onChange && onChange(social);
    }, [social])
    
    return <>
        <h2>Social</h2>

        {social.links.map((link, index) => {
            const feed = social.feed[index];
            return <SocialItem link={link} feed={feed} key={link.url} index={index} />
        })}

        <Form.Group>
          <Form.Label>Feed Type</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={newSocialItem.feed.type} onInput={updateFeedType} />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Feed Url</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={newSocialItem.feed.url} onInput={updateFeedUrl} />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Link Type</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={newSocialItem.link.type} onInput={updateLinkType} />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label>Link Url</Form.Label>
          <InputGroup>
            <Form.Control type="text" value={newSocialItem.link.url} onInput={updateLinkUrl} />
          </InputGroup>
        </Form.Group>

        


        
        <Form.Group className="mt-3">
            {/* {error && <Alert variant="danger" title="Error" onClose={() => setError(undefined)}>{error}</Alert>} */}
            <Button variant="success" onClick={addSocialItem}>Add Roadmap Item</Button>
        </Form.Group>
    </>;
}
 
export default SocialEditor;