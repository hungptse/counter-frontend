import React, { Component } from 'react';
import { VCardWidgetWrapper } from './style';
import { GET, ENDPOINT, POST } from '../../../helpers/api';
import { rtl } from '../../../config/withDirection';
import Dropdown, {
  DropdownButtons,
  DropdownMenu,
  MenuItem,
  SubMenu
} from '../../../components/uielements/dropdown';
import { Icon, Card, Descriptions, Badge, Tag } from 'antd';
import Buttons from '../../../components/uielements/button';
import Timeline, {
  TimelineItem,
} from '../../../components/uielements/timeline';
const Button = Buttons;
export default class VCardWidget extends Component {
  state = { roles: [], selectedRole: {}, user_stores: [] };
  async componentDidMount() {
    await GET(ENDPOINT.ALL_ROLE, {}, {}, true).then(res => {
      this.setState({ roles: res.data.roles });
    });
    this.setState({ selectedRole: this.state.roles.find(r => r.id === this.props.role_id) });

    await POST(ENDPOINT.STORE_OF_USER + `/${this.props.user.id}`, {}, {}, {
    }, true).then(res => {
      this.setState({ user_stores: res.data.user_store });
    });
  }

  handleMenuClickToLink = e => {
    this.setState({ selectedRole: this.state.roles.find(r => r.id == e.key) })

  };

  render() {
    const { src, alt, user, style } = this.props;
    const { roles, selectedRole } = this.state
    const menuClicked = (
      <DropdownMenu onClick={this.handleMenuClickToLink}>
        {roles.map(role => (<MenuItem key={role.id}>{role.name}</MenuItem>))}
      </DropdownMenu>
    );

    return (
      <div>
        <Card
          title={
            <div className="isoVCardBody">
              <div className="isoName">
                {user.name}
              </div>
              <span className="isoDesgTitle">
                <code style={{ fontSize: '13px' }}>@{user.username}</code>
              </span>
            </div>}
          extra={<Dropdown overlay={menuClicked}>
            <Button
              style={{
                margin: rtl === 'rtl' ? '0 8px 0 0' : '0 0 0 8px'
              }}
            >
              {selectedRole.name} <Icon type="down" />
            </Button>
          </Dropdown>}
          style={{ width: '100%' }}
        >
          <Descriptions title="User Info" bordered>
            <Descriptions.Item label="Fullname">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Gender">{user.gender == 1 ? 'Male' : 'Female'}</Descriptions.Item>
            <Descriptions.Item label="Created At">{user.createdAt}</Descriptions.Item>
            <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
            <Descriptions.Item label="Phone number">{user.phone_number}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge status="processing" text="Active" />
            </Descriptions.Item>
            <Descriptions.Item label="Store working" span={3}>{this.state.user_stores.map(us => (<Tag color="#108ee9">{us.stores.name}</Tag>))}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>

    );
  }
}
