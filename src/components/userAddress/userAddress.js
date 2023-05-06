import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import "./userAddess.scss"

function UserAddressComponent(props) {

    const [userAddress, setuserAddress] = React.useState({
        userDetails: {
            name: "",
            address: "",
            locality: "",
            landmark: "",
            state: "",
            city: "",
            pincode: "",
            phone: "",
            altphone: "",

        }
    })
    const [addressConfirmed, setaddressConfirmed] = React.useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {

        // console.log(props.editAddress);
        setShow(true)
        let data = {
            userDetails: {
                name: props.editAddress.name,
                address: props.editAddress.address,
                locality: props.editAddress.locality,
                landmark: props.editAddress.landMark,
                state: props.editAddress.state,
                city: props.editAddress.city,
                pincode: props.editAddress.pincode,
                phone: props.editAddress.phone,
                altphone: props.editAddress.altPhone,
            }
        }
        setaddressConfirmed(props.editAddress.addressConfirmed)
        setuserAddress({ userDetails: data.userDetails })
    };


    const editAddress = (e) => {
        let details = userAddress.userDetails;
        details[e.target.name] = e.target.value
        setuserAddress({ userDetails: details })
    }


    useEffect(() => {
        if (props.addNewAddress) {
            setShow(true)
        }

    }, [props.addNewAddress])

    let nameErrorMessage;
    let usernamechar = userAddress.userDetails.name;
    if (usernamechar.match(/[*|":<>[\]/,-.?{}`\\()%^'=+;@&$#!~"]/)) {
        nameErrorMessage = (
            <div className="errorMessage" >
                Enter only Alphabetical Characters
            </div>
        );
    } else if (usernamechar === "") {
        nameErrorMessage = <div></div>;
    } else if (usernamechar.length >= 50) {
        nameErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (usernamechar.length < 5) {
        nameErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        nameErrorMessage = <div></div>;
    }



    let doorNoErrorMessage;
    let doorNochar = userAddress.userDetails.address;
    if (doorNochar === "") {
        doorNoErrorMessage = <div></div>;
    } else if (doorNochar.length >= 50) {
        doorNoErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (doorNochar.length < 5) {
        doorNoErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        doorNoErrorMessage = <div></div>;
    }


    let localityErrorMessage;
    let localitychar = userAddress.userDetails.locality;
    if (localitychar === "") {
        localityErrorMessage = <div></div>;
    } else if (localitychar.length >= 50) {
        localityErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (localitychar.length < 5) {
        localityErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        localityErrorMessage = <div></div>;
    }





    let landmarkErrorMessage;
    let landmarkchar = userAddress.userDetails.landmark;
    if (landmarkchar === "") {
        landmarkErrorMessage = <div></div>;
    } else if (landmarkchar.length >= 50) {
        landmarkErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (landmarkchar.length < 5) {
        landmarkErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        landmarkErrorMessage = <div></div>;
    }



    let StateErrorMessage;
    let statechar = userAddress.userDetails.state;
    if (statechar === "") {
        StateErrorMessage = <div></div>;
    } else if (statechar.length >= 50) {
        StateErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (statechar.length < 5) {
        StateErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        StateErrorMessage = <div></div>;
    }


    let cityErrorMessage;
    let citychar = userAddress.userDetails.city;
    if (citychar === "") {
        cityErrorMessage = <div></div>;
    } else if (citychar.length >= 50) {
        cityErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (citychar.length < 5) {
        cityErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        cityErrorMessage = <div></div>;
    }


    let pincodeErrorMessage;
    let pincodechar = userAddress.userDetails.pincode;
    if (pincodechar === "") {
        pincodeErrorMessage = <div></div>;
    } else if (pincodechar.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)) {
        pincodeErrorMessage = (
            <div className="errorMessage" >
                Enter only Numeric Characters
            </div>
        );
    } else if (pincodechar.length >= 50) {
        pincodeErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (pincodechar.length < 5) {
        pincodeErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        pincodeErrorMessage = <div></div>;
    }


    let phoneErrorMessage;
    let phonechar = userAddress.userDetails.phone;
    if (phonechar === "") {
        phoneErrorMessage = <div></div>;
    } else if (phonechar.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)) {
        phoneErrorMessage = (
            <div className="errorMessage" >
                Enter only Numeric Characters
            </div>
        );
    } else if (phonechar.length >= 50) {
        phoneErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (phonechar.length < 5) {
        phoneErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        phoneErrorMessage = <div></div>;
    }


    let altPhoneErrorMessage;
    let altphonechar = userAddress.userDetails.altphone;
    if (altphonechar === "") {
        altPhoneErrorMessage = <div></div>;
    } else if (altphonechar.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)) {
        altPhoneErrorMessage = (
            <div className="errorMessage" >
                Enter only Numeric Characters
            </div>
        );
    } else if (altphonechar.length >= 50) {
        altPhoneErrorMessage = (
            <div className="errorMessage" >
                You cannot enter More than 50 Characters
            </div>
        );
    } else if (altphonechar.length < 5) {
        altPhoneErrorMessage = (
            <div className="errorMessage" >
                You cannot enter less than 5 Characters
            </div>
        );
    } else {
        altPhoneErrorMessage = <div></div>;
    }



    const changeDefaultAddress = (e) => {
        setaddressConfirmed(e.target.checked)
    }


    const submitUserAddress = () => {
        let submitted = { ...userAddress.userDetails, addressConfirmed: addressConfirmed }
        console.log(submitted);
    }



    return (
        <>
            <Button variant="primary" onClick={handleShow}>Edit {props.summaryOpen[0].shippingsSummary ? "selected" : "billing"} address </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label className="userAddressLable">Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="name"
                            name="name"
                            autoFocus
                            onChange={editAddress}
                            value={userAddress.userDetails.name}
                        />
                        {nameErrorMessage}
                        <Form.Label className="userAddressLable">Door Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            placeholder="Door No"
                            onChange={editAddress}
                            value={userAddress.userDetails.address}
                        />
                        {doorNoErrorMessage}
                        <Form.Label className="userAddressLable">Locality</Form.Label>
                        <Form.Control
                            type="text"
                            name="locality"
                            placeholder="Locality"
                            onChange={editAddress}
                            value={userAddress.userDetails.locality}
                        />
                        {localityErrorMessage}
                        <Form.Label className="userAddressLable">LandMark</Form.Label>
                        <Form.Control
                            type="text"
                            name="landmark"
                            placeholder="landmark"
                            onChange={editAddress}
                            value={userAddress.userDetails.landmark}
                        />
                        {landmarkErrorMessage}
                        <Form.Label className="userAddressLable">State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            placeholder="State"
                            onChange={editAddress}
                            value={userAddress.userDetails.state}
                        />
                        {StateErrorMessage}
                        <Form.Label className="userAddressLable">City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            placeholder="City"
                            onChange={editAddress}
                            value={userAddress.userDetails.city}
                        />
                        {cityErrorMessage}
                        <Form.Label className="userAddressLable">Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            onChange={editAddress}
                            value={userAddress.userDetails.pincode}
                        />
                        {pincodeErrorMessage}
                        <Form.Label className="userAddressLable">Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            onChange={editAddress}
                            value={userAddress.userDetails.phone}
                        />
                        {phoneErrorMessage}
                        <Form.Label className="userAddressLable">Alt Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="altphone"
                            placeholder="Alt Phone"
                            onChange={editAddress}
                            value={userAddress.userDetails.altphone}
                        />
                        {altPhoneErrorMessage}
                    </Form>
                    <input type="checkbox" onChange={changeDefaultAddress} checked={addressConfirmed} value={addressConfirmed} name="addressConfirmed" /> Defualt Address select
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
          </Button>
                    <Button
                        variant="primary" onClick={submitUserAddress}>
                        Add Address
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserAddressComponent;