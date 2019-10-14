import React, { Component } from 'react';
import { ContactCardWrapper } from './contactCard.style';
import { Col } from 'antd';
import basicStyle from '../../config/basicStyle';
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper';
import VCardWidget from '../../containers/Widgets/vCard/vCard-widget';
import IntlMessages from '../utility/intlMessages';

export default class SingleContactView extends Component {
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { contact } = this.props;
    return (
      <Col md={24} sm={24} xs={24} style={colStyle}>
        <IsoWidgetsWrapper>
          <VCardWidget
            onChangRole={this.props.onChangRole}
            style={{ height: '450px' }}
            src={"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2614&q=80"}
            user={contact}
            role_id={contact.role_id}
          >
          </VCardWidget>
        </IsoWidgetsWrapper>
      </Col>
    );
  }
}
