import React, { Component } from 'react';
import { Popover, message } from 'antd';
import { connect } from 'react-redux';
import IntlMessages from '../utility/intlMessages';
import TopbarDropdownWrapper from './topbarDropdown.style';
import Input from '../uielements/input';
import { POST, ENDPOINT } from '../../helpers/api';

const demoNotifications = [
  {
    id: 1,
    name: 'David Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  },
  {
    id: 2,
    name: 'Navis Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  },
  {
    id: 3,
    name: 'Emanual Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  },
  {
    id: 4,
    name: 'Dowain Doe',
    notification:
      'A National Book Award Finalist An Edgar Award Finalist A California Book Award Gold Medal Winner'
  }
];

class TopbarNotification extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  sendNotification = async () => {
    await POST(ENDPOINT.NOTIFICATION, {
      message: this.state.message
    }, {}, {}, true).then(res => {
      if (res.status == 200) {
        this.setState({ message: "" })
        message.success("Send sucessfully");
        this.setState({ visible: false });
      }
    })
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }
  render() {
    const { customizedTheme } = this.props;
    const content = (
      <TopbarDropdownWrapper className="topbarNotification">
        <div className="isoDropdownHeader">
          <h3>
            <IntlMessages id="sidebar.notification" />
          </h3>
        </div>
        <div className="isoDropdownBody">
          {/* {demoNotifications.map(notification => (
            <a className="isoDropdownListItem" key={notification.id}>
              <h5>{notification.name}</h5>
              <p>{notification.notification}</p>
            </a>
          ))} */}
          <a className="isoDropdownListItem">
            <h5>Message Content</h5>
            <Input size="large" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} />

            {/* <p>{notification.notification}</p> */}
          </a>
          {/* <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
            <InputBox
              label="Fullname"
              placeholder="Thanh Hung"
              value={this.state.name}
              required
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div> */}
        </div>
        <a className="isoViewAllBtn" onClick={this.sendNotification}>
          Send To All
        </a>
      </TopbarDropdownWrapper>
    );
    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="isoIconWrapper">
          <i
            className="ion-android-notifications"
            style={{ color: customizedTheme.textColor }}
          />
        </div>
      </Popover>
    );
  }
}

export default connect(state => ({
  ...state.App.toJS(),
  customizedTheme: state.ThemeSwitcher.toJS().topbarTheme
}))(TopbarNotification);
