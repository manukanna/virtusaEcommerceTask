import React, { useEffect } from 'react';
import './summary.scss'
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ConfirmtionDialog from '../confirmationModal/confirmationModal'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { addressSelected, billingSelected, productsConfirmed, changeButtonSummary, deliveryAddress, billingAddress, changesAddress, addProduct, removeProduct, getMonths } from '../../store/store'
import EditAddress from '../userAddress/userAddress'
import NewAddress from '../userAddress/userNewAddress'
const moment = require('moment');
const sadEmoji = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10.001.4C4.698.4.4 4.698.4 10a9.6 9.6 0 0 0 9.601 9.601c5.301 0 9.6-4.298 9.6-9.601c-.001-5.302-4.3-9.6-9.6-9.6zM10 17.599a7.6 7.6 0 1 1 0-15.2a7.6 7.6 0 0 1 0 15.2zm2.501-7.849c.828 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75s-1.5.783-1.5 1.75s.671 1.75 1.5 1.75zm-5 0c.828 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75s-1.5.783-1.5 1.75s.671 1.75 1.5 1.75zm2.501 1.5c-3.424 0-4.622 2.315-4.672 2.414a.75.75 0 0 0 1.342.672c.008-.017.822-1.586 3.33-1.586c2.463 0 3.298 1.527 3.328 1.585a.75.75 0 1 0 1.342-.67c-.049-.099-1.246-2.415-4.67-2.415z" /></svg>

const userLoaction = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 7.35q3.05-2.8 4.525-5.088T18 10.2q0-2.725-1.738-4.462T12 4Q9.475 4 7.737 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35Zm0 2.275q-.2 0-.4-.075t-.35-.2Q7.6 18.125 5.8 15.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.4-1.8 5.163t-5.45 5.987q-.15.125-.35.2t-.4.075ZM12 10.2Z" /></svg>
const billIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16.755 2h-9.51c-1.159 0-1.738 0-2.206.163a3.046 3.046 0 0 0-1.881 1.936C3 4.581 3 5.177 3 6.37v14.004c0 .858.985 1.314 1.608.744a.946.946 0 0 1 1.284 0l.483.442a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0a1.657 1.657 0 0 1 2.25 0a1.657 1.657 0 0 0 2.25 0l.483-.442a.946.946 0 0 1 1.284 0c.623.57 1.608.114 1.608-.744V6.37c0-1.193 0-1.79-.158-2.27a3.045 3.045 0 0 0-1.881-1.937C18.493 2 17.914 2 16.755 2Z" opacity=".5"/><path stroke-linecap="round" d="M10.5 11H17M7 11h.5M7 7.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"/></g></svg>
const orderSummaryIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.25 16.5q0-.2-.15-.35t-.35-.15q-.2 0-.35.15t-.15.35v3q0 .2.15.35t.35.15q.2 0 .35-.15t.15-.35v-3Zm1.5 0v3q0 .2.15.35t.35.15q.2 0 .35-.15t.15-.35v-3q0-.2-.15-.35t-.35-.15q-.2 0-.35.15t-.15.35ZM7 9h10q.425 0 .713-.288T18 8q0-.425-.288-.713T17 7H7q-.425 0-.713.288T6 8q0 .425.288.713T7 9Zm11 14q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23ZM3 21.875V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v6.675q-.475-.225-.975-.375T19 11.075V5H5v14.05h6.075q.125.775.388 1.475t.687 1.325q-.125.025-.263-.038t-.237-.162l-.8-.8q-.15-.15-.35-.15t-.35.15l-.8.8q-.15.15-.35.15t-.35-.15l-.8-.8q-.15-.15-.35-.15t-.35.15l-.8.8q-.15.15-.35.15t-.35-.15l-.8-.8q-.15-.15-.35-.15t-.35.15l-.8.8l-.35.225ZM7 17h4.075q.075-.525.225-1.025t.375-.975H7q-.425 0-.713.288T6 16q0 .425.288.713T7 17Zm0-4h6.1q.95-.925 2.213-1.463T18 11H7q-.425 0-.713.288T6 12q0 .425.288.713T7 13Zm-2 6.05V5v14.05Z"/></svg>
const paymentIcon = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><path fill="currentColor" d="M18.25 16.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5ZM2.004 8.75A3.75 3.75 0 0 1 5.754 5H22.25A3.75 3.75 0 0 1 26 8.75v10.5A3.75 3.75 0 0 1 22.25 23H5.755a3.75 3.75 0 0 1-3.75-3.75V8.75Zm3.75-2.25a2.25 2.25 0 0 0-2.25 2.25v.75H24.5v-.75a2.25 2.25 0 0 0-2.25-2.25H5.755Zm-2.25 12.75a2.25 2.25 0 0 0 2.25 2.25H22.25a2.25 2.25 0 0 0 2.25-2.25V11H3.505v8.25Z"/></svg>

const validityYears = [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023]
const ShippingInformation = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const productsAdded = useSelector((state) => {
        return state.addProduct
    });
    const changeOrderDetails = useSelector((state) => {
        return state.changeOrderSummary
    })
    const deliveryAddressSelected = useSelector((state) => {
        return state.deliveryAddress
    })
    const billingAddresSelected = useSelector((state) => {
        // console.log(state.billingAddress);
        return state.billingAddress
    })
    const usersDefaultAddresses = useSelector((state) => {
        return state.defaultAddresses
    })

    const [payNow, setPaynow] = React.useState(false)
    const proceedToPay = () => {
        setPaynow(true)
    }

    const monthsList = useSelector((state) => {
        return state.getMonths
    })







    useEffect(() => {
        if (!productsAdded.length) {
            navigate("/")
        }

    }, [productsAdded, navigate, dispatch])

    const [creditCardDetails, setcreditCardDetails] = React.useState({
        cardDetial: {
            cardNumber: "",
            cardValidityMonth: "",
            cardValidityYear: "",
            cardcvv: ""
        }
    })


    const changeAddress = (e) => {
        dispatch(changesAddress(e.target.value))
        // setuserAddress(addressChange)
    }
    const selectedAddress = (address) => {
        dispatch(addressSelected(address))
        dispatch(deliveryAddress(address))
    }
    const BillingAddress = (address) => {
        dispatch(billingSelected(address))
        dispatch(billingAddress(address))
    }


    const openShippingSummary = (openSummary) => {
        dispatch(changeButtonSummary(openSummary))
    }


    const confirmedProducts = () => {
        dispatch(productsConfirmed(productsConfirmed))
    }
    const goHome = () => {
        navigate("/")
    }

    const totalPayment = () => {
        let totalCost = productsAdded.reduce((acc, curVal) => {
            return acc + (curVal.price * curVal.quantityProduct);
        }, 0)
        return totalCost
    }
    const totalPaymentWithCharges = () => {
        const totalCostIncludes = [totalPayment(), 20, 20]
        let totalCost = totalCostIncludes.reduce((sum, item) => sum + item, 0);
        return totalCost
    }

    const changeCardDetails = (e) => {
        let details = creditCardDetails.cardDetial;
        details[e.target.name] = e.target.value;
        setcreditCardDetails({ cardDetial: details })
        if (e.target.name === "cardValidityYear") {
            dispatch(getMonths(e.target.value))
        }
    }

    const addSameProduct = (newSameProduct) => {
        dispatch(addProduct(newSameProduct))
    }
    const removeSameProduct = (newSameProduct) => {
        dispatch(removeProduct(newSameProduct))
    }


    const userDeliveryAddressChange = () => {
        return <> {usersDefaultAddresses.map((item, index) => {
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
                    <EditAddress editAddress={item} summaryOpen={changeOrderDetails} />
                    &nbsp;
                    <Button onClick={() => changeOrderDetails[0].shippingsSummary ? selectedAddress(item) : BillingAddress(item)} variant="success">Delivery {changeOrderDetails[0].shippingsSummary ? "selected" : "billing"} address </Button>
                </div>}
            </div>
        })}
        </>
    }


    const orderSummary = () => {
        return <>{productsAdded.length ?
            productsAdded.map((item, index) => {
                return <div key={index} className="orderSummaryCard">
                    <div className="orderSummarycardImage">
                        <div><img src={item.image} alt="" /></div>
                        <div className='plusMIusIcon'>
                            <div className="plusIcon" onClick={() => addSameProduct(item)}>+</div> {item.quantityProduct}
                            <div className="minusIcon" onClick={() => removeSameProduct(item)}>-</div>
                        </div>
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



            {productsAdded.length ? <Button variant="success" onClick={confirmedProducts}>Confirm and Pay $ {totalPayment()}</Button> : ""}
        </>
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
        crediCardCvv = <div></div>;
    }
    else if (crediCardCvv.match(/[a-zA-Z!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/)) {
        creditCardCvvErrorMessage = (
            <div className="errorMessage">
                Enter only number
            </div>
        );
    } else if (crediCardCvv.length !== 3) {
        creditCardCvvErrorMessage = (
            <div className="errorMessage">
                Enter valid card number
            </div>
        );
    }

    let creditCardMonthErrorMessage;
    let crediCardMonth = creditCardDetails.cardDetial.cardValidityMonth
    if (crediCardMonth === "") {
        creditCardMonthErrorMessage = <div></div>;
    } else if (!crediCardMonth.match(/[0-9]/)) {
        creditCardMonthErrorMessage = <div className="errorMessage">Please Select Month</div>;
    }
    let creditCardYearErrorMessage;
    let crediCardYear = creditCardDetails.cardDetial.cardValidityYear
    if (crediCardYear === "") {
        creditCardYearErrorMessage = <div></div>;
    } else if (!crediCardYear.match(/[0-9]/)) {
        creditCardYearErrorMessage = <div className="errorMessage">Please Select Year</div>;
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
                        <div >
                            <>
                                <Form.Label>Credit Card Validity</Form.Label>
                                <Row>
                                    <Col sm="6">
                                        <div className="paymentsInformationDivs">

                                            <Form.Select name="cardValidityMonth" onChange={changeCardDetails} value={creditCardDetails.cardDetial.cardValidityMonth}>
                                                <option>Select Month</option>
                                                {monthsList.map((item, index) => {
                                                    return <option value={item} key={index}>{item}</option>
                                                })}
                                            </Form.Select>
                                            {creditCardMonthErrorMessage}
                                        </div>
                                    </Col>
                                    <Col sm="6">
                                        <div className="paymentsInformationDivs">
                                            <Form.Select name="cardValidityYear" onChange={changeCardDetails} value={creditCardDetails.cardDetial.cardValidityYear}>
                                                <option>Select Year</option>
                                                {validityYears.map((item, index) => {
                                                    return <option value={item} key={index}>{item}</option>
                                                })}
                                            </Form.Select>
                                            {creditCardYearErrorMessage}
                                        </div>
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
                                    maxLength="3"
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
                            <ConfirmtionDialog buttonClicked={payNow} />
                        </div>

                        <Button disabled={creditCardNumberErrorMessage || creditCardCvvErrorMessage || creditCardMonthErrorMessage || creditCardYearErrorMessage} onClick={proceedToPay}>Proceed to Pay</Button>
                    </Col>
                </Row>
            </Container>


        </div>
    }




    return (
        <>
            <Container className="summaryPage">
                <Row>
                    <Col lg={8}>
                        {changeOrderDetails?.map((item, index) => {
                            return <div key={index}>
                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{userLoaction} &nbsp;Shipping Information &nbsp;{item.shippingsEditedSummary && <span className="changeButton"><Button onClick={() => openShippingSummary("shippingSummary")} variant="light">Change</Button></span>}</div>
                                    {item.shippingsSummary && <div>{userDeliveryAddressChange()}</div>}
                                </div>

                                {item.shippingsSummary && <div className="newAddressButton"><NewAddress /></div>}


                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{billIcon} &nbsp;Billing Information &nbsp;{item.billingInformationEdited && <span className="changeButton"><Button onClick={() => openShippingSummary("billingSummary")} variant="light">Change</Button></span>}</div>
                                    {item.billingInformation && <div>{userDeliveryAddressChange()}</div>}
                                </div>
                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{orderSummaryIcon} &nbsp;Order summary    &nbsp;{item.oderSummaryEdited && <span className="changeButton"><Button onClick={() => openShippingSummary("orderSummary")} variant="light">Change</Button></span>}</div>
                                    {item.oderSummary && <div>{orderSummary()}</div>}
                                </div>

                                <div className="summaryCard">
                                    <div className="summaryCardHeader">{paymentIcon} &nbsp;Payment Information      &nbsp;{item.oderSummaryEdited && <span className="changeButton"><Button onClick={() => openShippingSummary("paymentSummary")} variant="light">Change</Button></span>} </div>
                                    {item.paymentInformation && <div>{paymentInformation()}</div>}
                                </div>
                            </div>
                        })}
                    </Col>
                    <Col lg={4}>
                        {deliveryAddressSelected.name &&
                            <div className="priceDetails">
                                <h5>Shipping Address </h5>
                                <hr />
                                <div>
                                    <div><b>{deliveryAddressSelected.name}</b></div>
                                    <div>{deliveryAddressSelected.address}, {deliveryAddressSelected.locality}, {deliveryAddressSelected.landMark}
                                        <span>{deliveryAddressSelected.city}, {deliveryAddressSelected.state} - {deliveryAddressSelected.pincode}.</span></div>
                                    <div>{deliveryAddressSelected.phone}, {deliveryAddressSelected.altPhone}</div>
                                </div>
                            </div>}
                        {billingAddresSelected.name &&
                            <div className="priceDetails">
                                <h5>Billing Address </h5>
                                <hr />
                                <div>
                                    <div><b>{billingAddresSelected.name}</b></div>
                                    <div>{billingAddresSelected.address}, {billingAddresSelected.locality}, {billingAddresSelected.landMark}
                                        <span>{billingAddresSelected.city}, {billingAddresSelected.state} - {billingAddresSelected.pincode}.</span></div>
                                    <div>{billingAddresSelected.phone}, {billingAddresSelected.altPhone}</div>
                                </div>
                            </div>}


                        {/* ----- */}
                        <div className="priceDetails">
                            <h5>Price Details</h5>
                            <hr />
                            <div className="priceDiv">
                                <div>Price({productsAdded.length})</div>
                                <div>$ {totalPayment()}</div>
                            </div>
                            <div className="priceDiv">
                                <div>Discount</div>
                                <div>--</div>
                            </div>
                            <div className="priceDiv">
                                <div>Delivery fee</div>
                                <div>$ 20</div>
                            </div>
                            <div className="priceDiv">
                                <div>Packing fee</div>
                                <div>$ 20</div>
                            </div>
                            <hr />
                            <div className="priceDiv">
                                <div>Total Cost </div>
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