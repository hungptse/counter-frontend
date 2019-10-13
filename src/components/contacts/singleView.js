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
    const name = contact.name ? contact.name : 'No Name';
    const extraInfos = [];
    return (
      <Col md={24} sm={24} xs={24} style={colStyle}>
      <IsoWidgetsWrapper>
        {/* VCard Widget */}
        <VCardWidget
          style={{ height: '450px' }}
          src={"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2614&q=80"}
          user= {contact}
          role_id={contact.role_id}
        >
          {/* <SocialWidget>
            <SocialProfile
              url="#"
              icon="ion-social-facebook"
              iconcolor="#3b5998"
            />
            <SocialProfile
              url="#"
              icon="ion-social-twitter"
              iconcolor="#00aced"
            />
            <SocialProfile
              url="#"
              icon="ion-social-googleplus"
              iconcolor="#dd4b39"
            />
            <SocialProfile
              url="#"
              icon="ion-social-linkedin-outline"
              iconcolor="#007bb6"
            />
            <SocialProfile
              url="#"
              icon="ion-social-dribbble-outline"
              iconcolor="#ea4c89"
            />
          </SocialWidget> */}
        </VCardWidget>
      </IsoWidgetsWrapper>
    </Col>
      // <ContactCardWrapper className="isoContactCard">
      //   <div className="isoContactCardHead">
      //     <div className="isoPersonImage">
      //       {contact.avatar ? <img alt="#" src={contact.avatar} /> : ''}
      //     </div>
      //     <h1 className="isoPersonName">
      //       {name}
      //     </h1>
      //   </div>
      //   <div className="isoContactInfoWrapper">
      //     {extraInfos}
      //   </div>
      // </ContactCardWrapper>
    );
  }
}
