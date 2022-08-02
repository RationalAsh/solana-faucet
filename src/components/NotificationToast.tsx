import * as React from 'react';
import { Toast } from 'react-bootstrap';

export interface INotificationToastProps {
    heading: string
    body: string
    variant: string
    show: boolean
    delay: number
    autohide: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NotificationToast (props: INotificationToastProps) {
    return (
          <Toast onClose={() => props.setShow(false)} 
                 show={props.show} 
                 delay={props.delay} 
                 autohide={props.autohide}
                 bg={props.variant.toLowerCase()}>
            <Toast.Header>{props.heading}</Toast.Header>
            <Toast.Body>{props.body}</Toast.Body>
          </Toast>
    );
}
