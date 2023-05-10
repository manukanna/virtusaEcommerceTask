import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function ConfirmationDialog(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        window.location.href="/"
    };
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (props.buttonClicked) handleShow()

    }, [props.buttonClicked])

    return (
        <>
            {/* <Button disabled={props.creditCardDetails.cardDetial.cardValidityMonth || props.creditCardDetails.cardDetial.cardNumber.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/) || props.creditCardDetails.cardDetial.cardcvv.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)
                || props.creditCardDetails.cardDetial.cardNumber.length !== 16 || props.creditCardDetails.cardDetial.cardcvv.length !== 3} variant="primary" onClick={handleShow}>
                Proceed To Pay
      </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are order has been successfully placed </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationDialog;