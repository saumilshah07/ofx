import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QuoteFormComponent from './QuoteFormComponent';
import TitleComponent from '../component/TitleComponent';

type Props = {};
type State = {};

export default class QuoteComponent extends Component<Props, State> {
	render() {
		return (
			<div className="quote-component">
				<TitleComponent title="Quick Quote" />
				<QuoteFormComponent />
			</div>
		);
	}
}
