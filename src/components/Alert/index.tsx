import React from 'react';
import Alert from 'react-bootstrap/Alert';

type AlertProps = {
    children?: React.ReactNode,
    title?: string,
    variant?: string,
    onClose?: () => void
};

const MyAlert = ({ children, title, variant = "info", onClose }: AlertProps) => {
    return (
        <Alert variant={variant} onClose={onClose} dismissible={onClose !== undefined ? true : false}>
            {title && <Alert.Heading>{title}</Alert.Heading>}
            <p>
                {children}
            </p>
        </Alert>
    );
}

export default MyAlert;
