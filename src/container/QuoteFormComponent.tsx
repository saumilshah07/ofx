import React, { Component } from "react";
//Bootstrap component
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown,
  Button,
  Alert
} from "react-bootstrap";
//Constant
import * as constant from "../constant";
//Components
import TitleComponent from "../component/TitleComponent";
import QuoteResultComponent from "../component/QuoteResultComponent";
//Types
import { TQuoteResponse, TErrors, TFormFields } from "../types";
import { FormControlProps } from "react-bootstrap";

//Props Types
type TProps = {};

//State type
type TState = {
  fields: TFormFields;
  errors: TErrors;
  loading: boolean;
  status: string;
  response: TQuoteResponse;
};

//Init State
const state: TState = {
  fields: {
    firstName: "",
    lastName: "",
    email: "",
    mobilePrefix: constant.telephone[0],
    mobile: "",
    fromCurrency: "AUD",
    toCurrency: "USD",
    amount: ""
  },
  errors: {},
  loading: false,
  status: "new",
  response: {
    CustomerRate: 0,
    CustomerAmount: 0
  }
};

class QuoteFormComponent extends Component<TProps, TState> {
  state: Readonly<TState> = state;

  handleValidation = (): boolean => {
    const { fields } = this.state;
    let isValid: boolean = true;
    let errors: TErrors = {};

    //First Name
    if (fields.firstName === "") {
      isValid = false;
      errors.firstName = "First Name is required.";
    }

    //First Name
    if (fields.lastName === "") {
      isValid = false;
      errors.lastName = "Last Name is required.";
    }

    //From Currency
    if (fields.fromCurrency === "") {
      isValid = false;
      errors.fromCurrency = "From Currency is required.";
    }

    //To Currency
    if (fields.toCurrency === "") {
      isValid = false;
      errors.toCurrency = "To Currency is required.";
    } else {
      if (fields.toCurrency === fields.fromCurrency) {
        isValid = false;
        errors.toCurrency = "To Currency and From currency must be same.";
      }
    }

    //Amount
    if (fields.amount === "") {
      isValid = false;
      errors.amount = "Amount is required.";
    } else {
      let amountRegex = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
      if (!amountRegex.test(fields.amount)) {
        isValid = false;
        errors.amount = "Enter Valid Amount.";
      }
    }

    this.setState({ errors: errors });

    return isValid;
  };

  getQuote = async (
    fromCurrency: string,
    toCurrency: string,
    amount: string
  ) => {
    try {
      const response = await fetch(
        `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/${amount}?format=json`
      );
      if (response.status !== 200) {
        throw new Error();
      }
      let data: TQuoteResponse = await response.json();
      this.setState({
        loading: false,
        response: { ...data },
        status: "success"
      });
    } catch (e) {
      this.setState({
        loading: false,
        status: "error"
      });
    }
  };

  handleChange = (event: React.FormEvent<FormControlProps>): void => {
    const { name, value } = event.target as HTMLInputElement;
    this.setFieldState(name, value);
  };

  setFieldState = (name: string, value: string | number) => {
    this.setState(prevState => ({
      ...prevState,
      fields: { ...prevState.fields, [name]: value }
    }));
  };

  handleSubmit = (event: React.FormEvent<FormControlProps>) => {
    event.preventDefault();
    event.stopPropagation();
    const { fromCurrency, toCurrency, amount } = this.state.fields;

    if (this.handleValidation()) {
      this.setState({
        loading: true
      });
      this.getQuote(fromCurrency, toCurrency, amount);
    }
  };

  reset = (): void => {
    this.setState({ ...state });
  };
  render() {
    const { loading, status, errors } = this.state;
    const { CustomerRate, CustomerAmount } = this.state.response;
    const {
      firstName,
      lastName,
      email,
      mobile,
      fromCurrency,
      toCurrency,
      mobilePrefix,
      amount
    } = this.state.fields;

    return (
      <React.Fragment>
        <TitleComponent title="Quick Quote" />
        {status !== "success" && (
          <Container className="quote-form-component">
            <Form noValidate onSubmit={this.handleSubmit}>
              {status == "error" && (
                <Row>
                  <Col sm={12} md={12} xl={12} className="text-center">
                    <Alert variant="danger">
                      Internal Server Error. Please Try Again Later.
                    </Alert>
                  </Col>
                </Row>
              )}

              <Row>
                <Col sm={12} md={6} xl={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label className="required">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={this.handleChange}
                      value={firstName}
                      isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6} xl={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label className="required">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={this.handleChange}
                      value={lastName}
                      isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={12} xl={12}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={this.handleChange}
                      value={email}
                      placeholder="Email"
                    />
                  </Form.Group>
                </Col>
                <Col sm={12} md={12} xl={12}>
                  <Form.Group controlId="telephone">
                    <Form.Label>Telephone / Mobile</Form.Label>
                    <InputGroup className="mb-3">
                      <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={mobilePrefix}
                        id="input-group-dropdown-1"
                        name="mobilePrefix"
                      >
                        {constant.telephone.map((t, i) => (
                          <Dropdown.Item
                            as="button"
                            key={i}
                            type="button"
                            eventKey={t}
                            onSelect={(eventKey: string) => {
                              this.setFieldState("mobilePrefix", eventKey);
                            }}
                          >
                            {t}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                      <Form.Control
                        type="text"
                        name="mobile"
                        onChange={this.handleChange}
                        value={mobile}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6} xl={6}>
                  <Form.Group controlId="fromCurrency">
                    <Form.Label className="required">From Currency</Form.Label>
                    <Form.Control
                      as="select"
                      name="fromCurrency"
                      onChange={this.handleChange}
                      value={fromCurrency}
                      isInvalid={!!errors.fromCurrency}
                    >
                      <option value="">Select</option>
                      {constant.currency.map((c, i) => (
                        <option key={i} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.fromCurrency}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6} xl={6}>
                  <Form.Group controlId="toCurrency">
                    <Form.Label className="required">To Currency</Form.Label>
                    <Form.Control
                      as="select"
                      name="toCurrency"
                      onChange={this.handleChange}
                      value={toCurrency}
                      isInvalid={!!errors.toCurrency}
                    >
                      <option value="">Select</option>
                      {constant.currency.map((c, i) => (
                        <option key={i} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.toCurrency}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6} xl={6}>
                  <Form.Group controlId="amount">
                    <Form.Label className="required">Amount</Form.Label>
                    <Form.Control
                      type="text"
                      name="amount"
                      onChange={this.handleChange}
                      value={amount}
                      isInvalid={!!errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={12} xl={12} className="text-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Loading…" : "GET QUOTE"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        )}
        {status === "success" && (
          <QuoteResultComponent
            amount={amount}
            CustomerRate={CustomerRate}
            CustomerAmount={CustomerAmount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            resetForm={this.reset}
          />
        )}
      </React.Fragment>
    );
  }
}
export default QuoteFormComponent;
