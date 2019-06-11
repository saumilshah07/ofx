import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Form,
	InputGroup,
	DropdownButton,
	Dropdown,
	Button
} from 'react-bootstrap';
const QuoteFormComponent: React.FC<{}> = props => {
	return (
		<Container className="quote-form-component">
			<Form>
				<Row className="section">
					<Col sm={12} md={6} xl={6}>
						<Form.Group controlId="firstName">
							<Form.Label className="required">First Name</Form.Label>
							<Form.Control type="text" placeholder="First Name" required />
						</Form.Group>
					</Col>
					<Col sm={12} md={6} xl={6}>
						<Form.Group controlId="lastName">
							<Form.Label className="required">Last Name</Form.Label>
							<Form.Control type="text" placeholder="Last Name" required />
						</Form.Group>
					</Col>
					<Col sm={12} md={12} xl={12}>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Email" />
						</Form.Group>
					</Col>
					<Col sm={12} md={12} xl={12}>
						<Form.Group controlId="telephone">
							<Form.Label>Telephone / Mobile</Form.Label>
							<InputGroup className="mb-3">
								<DropdownButton
									as={InputGroup.Prepend}
									variant="outline-secondary"
									title="+61"
									id="input-group-dropdown-1">
									{/* <Dropdown.Item href="#">+61</Dropdown.Item>
								<Dropdown.Item href="#">Another action</Dropdown.Item>
								<Dropdown.Item href="#">Something else here</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="#">Separated link</Dropdown.Item> */}
								</DropdownButton>
								<Form.Control type="text" />
							</InputGroup>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col sm={12} md={6} xl={6}>
						<Form.Group controlId="fromCurrency">
							<Form.Label className="required">From Currency</Form.Label>
							<Form.Control as="select" required>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col sm={12} md={6} xl={6}>
						<Form.Group controlId="toCurrency">
							<Form.Label className="required">To Currency</Form.Label>
							<Form.Control as="select" required>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>
					</Col>
					<Col sm={12} md={6} xl={6}>
						<Form.Group controlId="amount">
							<Form.Label className="required">Amount</Form.Label>
							<Form.Control type="text" required />
						</Form.Group>
					</Col>
					<Col sm={12} md={12} xl={12} className="text-center">
						<Button variant="primary" size="lg">
							GET QUOTE
						</Button>
					</Col>
				</Row>
			</Form>
		</Container>
	);
};
export default QuoteFormComponent;
