import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Empty, Modal, Dropdown, Transfer, message } from 'antd';
import Button from '../../../components/uielements/button';
import ContactList from '../../../components/contacts/contactList';
import SingleContactView from '../../../components/contacts/singleView';
import EditContactView from '../../../components/contacts/editView';
import DeleteButton from '../../../components/contacts/deleteButton';
import IntlMessages from '../../../components/utility/intlMessages';
import { ContactsWrapper } from './contacts.style';
import PageHeader from '../../../components/utility/pageHeader';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../config/basicStyle';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import { GET, ENDPOINT, POST } from '../../../helpers/api';
import InputBox from '../../../components/utility/input-box';
import { DropdownMenu, MenuItem } from '../../../components/uielements/dropdown';
import DropdownBox from '../../../components/utility/dropdown';

const { Content } = Layout;
const { confirm } = Modal;
class Contacts extends Component {
  state = { users: [], selectedContact: {}, roles: [], selectedRole: {}, stores: [], selectedStore: {} }
  async componentDidMount() {
    await GET(ENDPOINT.ALL_USER, {}, {}, true).then(res => {
      this.setState({ users: res.data.user })
    });
    await GET(ENDPOINT.ALL_ROLE, {}, {}, true).then(res => {
      this.setState({ roles: res.data.roles })
    });
    await GET(ENDPOINT.ALL_STORE, {}, {}, true).then(res => {
      this.setState({ stores: res.data.items });
    });
    this.setState({ selectedRole: this.state.roles[0] ? this.state.roles[0] : { name: "Role not found" } });
    this.setState({ selectedStore: this.state.stores[0] ? this.state.stores[0] : { name: "Store not found" } });
  }
  changeContact = (id) => {
    this.setState({ selectedContact: this.state.users.filter(user => user.id === id)[0] })
  }

  addNewUser = async () => {
    // await this.getAllPermission();
    this.setState({
      visible: true,
    });
  };

  handleOk = async () => {
    this.setState({ loading: true });
    await POST(ENDPOINT.ALL_USER, {
      username: this.state.username,
      name: this.state.name,
      phone_number: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      role_id: this.state.selectedRole.id,
      gender: 1
    }, {}, {}, true).then(async res => {
      if (res.status == 200) {
        const user = res.data;
        this.setState({ users: [...this.state.users, user] });
        await POST(ENDPOINT.STORE_OF_USER, {
          store_id: this.state.selectedStore.id,
          user_id: user.id
        }, {}, {}, true).then(r => {
          message.info("Created user");
        })
      }
    });

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);

  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleMenuClickToLink = e => {
    this.setState({ selectedRole: e.key != this.state.selectedRole.id ? this.state.roles.find(r => r.id == e.key) : this.state.selectedRole })
  }

  handleMenuClickToLinkStore = e => {
    this.setState({ selectedStore: e.key != this.state.selectedStore.id ? this.state.stores.find(r => r.id == e.key) : this.state.selectedStore });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { users, selectedContact, roles, selectedRole, stores, selectedStore } = this.state;
    const menuClicked = (
      <DropdownMenu onClick={this.handleMenuClickToLink}>
        {roles.map(role => (<MenuItem key={role.id}>{role.name}</MenuItem>))}
      </DropdownMenu>
    );
    const menuClickedStore = (
      <DropdownMenu onClick={this.handleMenuClickToLinkStore}>
        {stores.map(store => (<MenuItem key={store.id}>{store.name}</MenuItem>))}
      </DropdownMenu>
    );

    return (
      <LayoutWrapper>
        <PageHeader>User Management</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <ContentHolder>
                <ButtonWrapper>
                  <Button type="primary" onClick={this.addNewUser}>
                    {/* {<IntlMessages id="role.addnew" />} */}
                    Add New User
                  </Button>
                </ButtonWrapper>
                <Modal
                  visible={this.state.visible}
                  title="New User"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  maskClosable={false}
                  footer={[
                    <Button key="back" size="large" onClick={this.handleCancel}>
                      Return
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      size="large"
                      loading={this.state.loading}
                      onClick={this.handleOk}
                    >
                      Submit
                    </Button>,
                  ]}
                >
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label="Username"
                      placeholder="staff_username"
                      value={this.state.username}
                      required
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label="Fullname"
                      placeholder="Thanh Hung"
                      value={this.state.name}
                      required
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div><div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label="Phone Number"
                      placeholder="0943101010"
                      value={this.state.phone}
                      required
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Email"}
                      placeholder="example@counter.fptu.com"
                      value={this.state.email}
                      required
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Address"}
                      placeholder="HCMC"
                      value={this.state.address}
                      required
                      onChange={(e) => this.setState({ address: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <DropdownBox label={"Role"} menuClicked={menuClicked} value={selectedRole.name} />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <DropdownBox label={"Store will working"} menuClicked={menuClickedStore} value={selectedStore.name} />
                  </div>
                </Modal>
                <ContactsWrapper
                // className="isomorphicContacts"
                // style={{ background: 'none' }}
                >

                  <div className="isoContactListBar">
                    <ContactList
                      contacts={users}
                      // seectedId={seectedId}
                      changeContact={this.changeContact}
                    // deleteContact={deleteContact}
                    />
                  </div>
                  <Layout className="isoContactBoxWrapper">
                    {Object.keys(selectedContact).length != 0 ? (
                      <Content className="isoContactBox">
                        <div className="isoContactControl">
                        </div>
                        <SingleContactView
                          contact={selectedContact}
                        />
                      </Content>
                    ) : (
                        <Empty description={false} />
                      )}
                  </Layout>
                </ContactsWrapper>
              </ContentHolder>
            </Box>
          </Col>
        </Row>

        {/* </Layout> */}
        {/* </ContactsWrapper> */}
      </LayoutWrapper>
    );
  }
}
export default Contacts
