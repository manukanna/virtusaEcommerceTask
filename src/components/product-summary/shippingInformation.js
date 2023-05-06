import React, { useEffect } from 'react';
import './summary.scss'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ConfirmtionDialog from '../confirmationModal/confirmationModal'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditAddress from '../userAddress/userAddress'
import NewAddress from '../userAddress/userNewAddress'
const sadEmoji = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10.001.4C4.698.4.4 4.698.4 10a9.6 9.6 0 0 0 9.601 9.601c5.301 0 9.6-4.298 9.6-9.601c-.001-5.302-4.3-9.6-9.6-9.6zM10 17.599a7.6 7.6 0 1 1 0-15.2a7.6 7.6 0 0 1 0 15.2zm2.501-7.849c.828 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75s-1.5.783-1.5 1.75s.671 1.75 1.5 1.75zm-5 0c.828 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75s-1.5.783-1.5 1.75s.671 1.75 1.5 1.75zm2.501 1.5c-3.424 0-4.622 2.315-4.672 2.414a.75.75 0 0 0 1.342.672c.008-.017.822-1.586 3.33-1.586c2.463 0 3.298 1.527 3.328 1.585a.75.75 0 1 0 1.342-.67c-.049-.099-1.246-2.415-4.67-2.415z" /></svg>

const userLoaction = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 7.35q3.05-2.8 4.525-5.088T18 10.2q0-2.725-1.738-4.462T12 4Q9.475 4 7.737 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35Zm0 2.275q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.4-1.8 5.163t-5.45 5.987q-.15.125-.35.2t-.4.075ZM12 10.2Z" /></svg>


const validityYears = [2027, 2026, 2025, 2024, 2023, 2022, 2021]
const validityMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const ShippingInformation = (props) => {
    const navigate = useNavigate();

    const { totalProductsAdded } = props
    const [summaryOpen, setsummaryOpen] = React.useState([
        { shippingsSummary: true, shippingsEditedSummary: false, billingInformation: false, billingInformationEdited: false, oderSummary: false, oderSummaryEdited: false, paymentInformation: false, paymentInformationEdited: false }
    ])
    const [creditCardDetails, setcreditCardDetails] = React.useState({
        cardDetial: {
            cardNumber: "",
            cardValidity: "",
            cardcvv: ""
        }
    })

    const [userSumittedAddress, setuserSumittedAddress] = React.useState({})
    const [userBillingAddress, setuserBillingAddress] = React.useState({})

    const [userAddrress, setuserAddress] = React.useState([
        { name: "Ramesh", phone: "9987654321", pincode: "345645", address: "10-345/6", locality: "Hebbal", landMark: "Near Water Tank", state: "Karnataka", city: "Banglore", altPhone: "9876878865", addressConfirmed: false },
        { name: "Suresh", phone: "9654208765", pincode: "560045", address: "102", locality: "Sai Nagar Colony", landMark: "Near Sai Nagar Bus Stop", state: "Telangana", city: "Hyderabad", altPhone: "9876789075", addressConfirmed: false },
        { name: "Ram babu", phone: "9324165768", pincode: "5000047", address: "1-35/", locality: "Marathahalli", landMark: "Near tivoli Theatre", state: "Andhra Pradesh", city: "Vijayawada", altPhone: "9123414678", addressConfirmed: false },
        { name: "Satya Narayana", phone: "9789632987", pincode: "560004", address: "8-34-6", locality: "Sai Ram Theatre", landMark: "Near Big Garden", state: "Karnataka", city: "Banglore", altPhone: "8754614379", addressConfirmed: false }
    ])
    const changeAddress = (e) => {
        let addressChange = userAddrress.map(item => {
            if (item.phone === e.target.value) {
                return { ...item, addressConfirmed: true }
            } else {
                return { ...item, addressConfirmed: false }
            }
        })
        setuserAddress(addressChange)
    }
    const selectedAddress = (address) => {
        let confirmedSelectedAddress = summaryOpen.map(item => {
            return { ...item, shippingsSummary: false, shippingsEditedSummary: true, billingInformation: true }
        })
        setsummaryOpen(confirmedSelectedAddress)
        setuserSumittedAddress(address)
    }
    const BillingAddress = (address) => {
        let billingSelectedAddress = summaryOpen.map(item => {
            return { ...item, billingInformation: false, billingInformationEdited: true, oderSummary: true }
        })
        setuserBillingAddress(address)
        setsummaryOpen(billingSelectedAddress)
    }

    const userDeliveryAddressChange = () => {
        return <> {userAddrress.map((item, index) => {
            return <div key={index} className="userAddress">
                <div className="userAddressCard" >
                    <div className="addressInput">
                        <input type="checkbox" checked={item.addressConfirmed} value={item.phone} onChange={changeAddress} name="checkoBox" />
                    </div>
                    <div>
                        <div><b>{item.name}</b></div>
                        <div>{item.address}, {item.locality}, {item.landMark}
                            <span>{item.city}, {item.state} - {item.pincode}.</span></div>
                        <div>{item.phone}, {item.altPhone}</div>
                    </div>
                </div>
                {item.addressConfirmed && <div className="deliveryButton">
                    <EditAddress editAddress={item} summaryOpen={summaryOpen} />
                     &nbsp;
                    <Button onClick={() => summaryOpen[0].shippingsSummary ? selectedAddress(item) : BillingAddress(item)} variant="success">Delivery {summaryOpen[0].shippingsSummary ? "selected" : "billing"} address </Button>
                </div>}
            </div>
        })}
        </>
    }

    const confirmedProducts = () => {
        let productsConfirmed = summaryOpen.map(item => {
            return { ...item, oderSummary: false, oderSummaryEdited: true, paymentInformation: true }
        })
        setsummaryOpen(productsConfirmed)
    }
    const goHome = () => {
        navigate("/")
    }

    const totalPayment = () => {
        let totalCost = totalProductsAdded.reduce((sum, item) => sum + item.price, 0);
        return totalCost
    }
    const totalPaymentWithCharges = () => {
        const totalCostIncludes = [totalPayment(), 20, 20]
        let totalCost = totalCostIncludes.reduce((sum, item) => sum + item, 0);
        return totalCost
    }

    const orderSummary = () => {
        return <>{totalProductsAdded.length ?
            totalProductsAdded.map((item, index) => {
                return <div key={index} className="orderSummaryCard">
                    <div className="orderSummarycardImage">
                        <div><img src={item.image} alt="" /></div>
                        <div>add or remove</div>
                    </div>
                    <div>
                        <h5 className="summaryDesctiptiontext">{item.title}</h5>
                        <div>Price : <b>$ {item.price}</b></div>
                        <div>Category : {item.category}</div>
                        <div className="summaryDesctiptiontext">{item.description}</div>
                    </div>
                </div>
            }) : <div className="noproductsText"> <div>{sadEmoji}  "Please Add Some Products to buy"</div>

                <div><Button variant="success" onClick={goHome}>Home</Button></div></div>}



            {totalProductsAdded.length ? <Button variant="success" onClick={confirmedProducts}>Confirm and Pay $ {totalPayment()}</Button> : ""}
        </>
    }

    const changeCardDetails = (e) => {
        let details = creditCardDetails.cardDetial;
        details[e.target.name] = e.target.value;
        setcreditCardDetails({ cardDetial: details })
    }

    let creditCardNumberErrorMessage;
    let crediCardNumber = creditCardDetails.cardDetial.cardNumber
    if (crediCardNumber === "") {
        creditCardNumberErrorMessage = <div></div>;
    }
    else if (crediCardNumber.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)) {
        creditCardNumberErrorMessage = (
            <div className="errorMessage">
                Enter only number
            </div>
        );
    } else if (crediCardNumber.length !== 16) {
        creditCardNumberErrorMessage = (
            <div className="errorMessage">
                Enter valid card number
            </div>
        );
    }
    let creditCardCvvErrorMessage;
    let crediCardCvv = creditCardDetails.cardDetial.cardcvv
    if (crediCardCvv === "") {
        creditCardCvvErrorMessage = <div></div>;
    }
    else if (crediCardCvv.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)) {
        creditCardCvvErrorMessage = (
            <div className="errorMessage">˝
            Enter only number
            </div>
        );
    }

    const paymentInformation = () => {
        return <div className="paymentInformationCard">
            <Container>
                <Row>
                    <Col lg="12">
                        <div className="paymentsInformationDivs">
                            <>
                                <Form.Label>Credit Card Number</Form.Label>
                                <Form.Control
                                    maxLength="16"
                                    type="text"
                                    value={creditCardDetails.cardDetial.cardNumber}
                                    name="cardNumber"
                                    onChange={changeCardDetails}
                                />
                                {creditCardNumberErrorMessage}
                            </>
                        </div>
                    </Col>
                    <Col sm="6">
                        <div className="paymentsInformationDivs">
                            <>
                                <Form.Label>Credit Card Validity</Form.Label>
                                <Row>
                                    <Col sm="6">
                                        <Form.Select className="options">
                                            <option>Select Month</option>
                                            {validityMonths.map((item, index) => {
                                                return <option key={index}>{item}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col sm="6">

                                        <Form.Select className="options">
                                            <option>Select Year</option>
                                            {validityYears.map((item, index) => {
                                                return <option key={index}>{item}</option>
                                            })}
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </>
                        </div>
                    </Col>
                    <Col sm="6">
                        <div className="paymentsInformationDivs">
                            <>
                                <Form.Label>Credit Card Cvv</Form.Label>
                                <Form.Control
                                    maxlength="3"
                                    type="text"
                                    value={creditCardDetails.cardDetial.cardcvv}
                                    name="cardcvv"
                                    onChange={changeCardDetails}
                                />
                                {creditCardCvvErrorMessage}
                            </>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="proceedToPaybutton">
                            <ConfirmtionDialog creditCardDetails={creditCardDetails} />
                        </div>

                        {/* <Button onClick={proceedToPay} >Proceed to Pay</Button> */}
                    </Col>
                </Row>
            </Container>


        </div>
    }

    // const [summaryOpen, setsummaryOpen] = React.useState([
    //     { shippingsSummary: true, shippingsEditedSummary: false, billingInformation: false, billingInformationEdited: false, oderSummary: false, oderSummaryEdited: false, paymentInformation: false, paymentInformationEdited: false }
    // ])
    // let productsConfirmed = summaryOpen.map(item => {
    //     return { ...item, oderSummary: false, oderSummaryEdited: true, paymentInformation: true }
    // })
    // // setsummaryOpen
    const openShippingSummary = (openSummary) => {
        let openSummaryDetails;
        switch (openSummary) {
            case "shippingSummary":
                openSummaryDetails = summaryOpen.map(item => {
                    return { ...item, shippingsSummary: true, billingInformation: false, oderSummary: false, paymentInformation: false }
                })
                break;
            case "billingSummary":
                openSummaryDetails = summaryOpen.map(item => {
                    return { ...item, shippingsSummary: false, billingInformation: true, oderSummary: false, paymentInformation: false }
                })
                break;

            case "orderSummary":

                openSummaryDetails = summaryOpen.map(item => {
                    return { ...item, shippingsSummary: false, billingInformation: false, oderSummary: true, paymentInformation: false }
                })
                break;
            default:
                openSummaryDetails = summaryOpen.map(item => {
                    return { ...item, shippingsSummary: false, billingInformation: false, oderSummary: false, paymentInformation: true }
                })

                break;
        }
        setsummaryOpen(openSummaryDetails)
    }
    const userAddedNewAddress = (address) => {
        setuserAddress([...userAddrress, address])
    }


    useEffect(() => {
        if (!totalProductsAdded.length) {
            navigate("/")
        }
    }, [totalProductsAdded, navigate])
    return (
        <>
            <Container className="summaryPage">
                <Row>
                    <Col lg={8}>
                        {summaryOpen.map((item, index) => {
                            return <div key={index}>
                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{userLoaction} &nbsp;Shipping Information &nbsp;{item.shippingsEditedSummary && <span className="changeButton"><Button onClick={() => openShippingSummary("shippingSummary")} variant="light">Change</Button></span>}</div>
                                    {item.shippingsSummary && <div>{userDeliveryAddressChange()}</div>}
                                </div>

                                {item.shippingsSummary && <div className="newAddressButton"><NewAddress userAddedNewAddress={userAddedNewAddress} /></div>}


                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{userLoaction} &nbsp;Billing Information &nbsp;{item.billingInformationEdited && <span className="changeButton"><Button onClick={() => openShippingSummary("billingSummary")} variant="light">Change</Button></span>}</div>
                                    {item.billingInformation && <div>{userDeliveryAddressChange()}</div>}
                                </div>
                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{userLoaction} &nbsp;Order summary    &nbsp;{item.oderSummaryEdited && <span className="changeButton"><Button onClick={() => openShippingSummary("orderSummary")} variant="light">Change</Button></span>}</div>
                                    {item.oderSummary && <div>{orderSummary()}</div>}
                                </div>

                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{userLoaction} &nbsp;Payment Information      &nbsp;{item.oderSummaryEdited && <span className="changeButton"><Button onClick={() => openShippingSummary("paymentSummary")} variant="light">Change</Button></span>} </div>
                                    {item.paymentInformation && <div>{paymentInformation()}</div>}
                                </div>
                            </div>
                        })}
                    </Col>
                    <Col lg={4}>
                        {userSumittedAddress.name &&
                            <div className="priceDetails">
                                <h5>Shipping Address </h5>
                                <hr />
                                <div>
                                    <div><b>{userSumittedAddress.name}</b></div>
                                    <div>{userSumittedAddress.address}, {userSumittedAddress.locality}, {userSumittedAddress.landMark}
                                        <span>{userSumittedAddress.city}, {userSumittedAddress.state} - {userSumittedAddress.pincode}.</span></div>
                                    <div>{userSumittedAddress.phone}, {userSumittedAddress.altPhone}</div>
                                </div>
                            </div>}
                        {userBillingAddress.name &&
                            <div className="priceDetails">
                                <h5>Billing Address </h5>
                                <hr />
                                <div>
                                    <div><b>{userBillingAddress.name}</b></div>
                                    <div>{userBillingAddress.address}, {userBillingAddress.locality}, {userBillingAddress.landMark}
                                        <span>{userBillingAddress.city}, {userBillingAddress.state} - {userBillingAddress.pincode}.</span></div>
                                    <div>{userBillingAddress.phone}, {userBillingAddress.altPhone}</div>
                                </div>
                            </div>}


                        {/* ----- */}
                        <div className="priceDetails">
                            <h5>Price Detils</h5>
                            <hr />
                            <div className="priceDiv">
                                <div>Price({totalProductsAdded.length})</div>
                                <div>$ {totalPayment()}</div>
                            </div>
                            <div className="priceDiv">
                                <div>DisCount</div>
                                <div>--</div>
                            </div>
                            <div className="priceDiv">
                                <div>Delivery</div>
                                <div>$ 20</div>
                            </div>
                            <div className="priceDiv">
                                <div>Packing Fee</div>
                                <div>$ 20</div>
                            </div>
                            <hr />
                            <div className="priceDiv">
                                <div>Total Cost Fee</div>
                                <div>$ {totalPaymentWithCharges()}</div>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default ShippingInformation