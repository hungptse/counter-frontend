import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Empty, Modal, Dropdown, Transfer } from 'antd';
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
import { GET, ENDPOINT } from '../../../helpers/api';
import InputBox from '../../../components/utility/input-box';
import { DropdownMenu, MenuItem } from '../../../components/uielements/dropdown';
import DropdownBox from '../../../components/utility/dropdown';

const { Content } = Layout;
const { confirm } = Modal;
class Contacts extends Component {
  state = { users: [], selectedContact: {}, roles: [], selectedRole: {}, stores: [], selectedKeys: [], targetKeys: [], selectedStores: [] }
  async componentDidMount() {
    await GET(ENDPOINT.ALL_USER, {}, {}, true).then(res => {
      this.setState({ users: res.data.user })
    });
    await GET(ENDPOINT.ALL_ROLE, {}, {}, true).then(res => {
      this.setState({ roles: res.data.roles })
    });
    this.setState({ selectedRole: this.state.roles[0] ? this.state.roles[0] : { name: "Role not found" } });
    await GET(ENDPOINT.ALL_STORE, {}, {}, true).then(res => {
      this.setState({ stores: res.data.items });
    });
    this.setState({ targetKeys: this.state.stores.map(s => s.id) });
    this.state.stores.forEach(s => s["key"] = s.id.toString());
    this.state.stores.forEach(s => s["title"] = s.name);
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

  handleOk = () => {
    console.log(this.state);

  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleMenuClickToLink = e => {
    this.setState({ selectedRole: e.key != this.state.selectedRole.id ? this.state.roles.find(r => r.id == e.key) : this.state.selectedRole })
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
    // if (direction === 'left') {
    //   let mergeArray = [...this.state.selectedStores, ...moveKeys]
    //   this.setState({ selectedStores: mergeArray })
    // } else {
    //   this.setState({ selectedStores: this.state.selectedStores.filter(e => moveKeys.indexOf(e) < 0) })
    // }
    console.log(this.state.selectedStores, "SELECTED")
    console.log(this.state.targetKeys)
  };
  ;

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });
  };
  filterOption = (inputValue = inputValue.forEach(value => value.name.toLowerCase()), option) => option.name.indexOf(inputValue) > -1;

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { users, selectedContact, roles, selectedRole, stores, targetKeys, selectedKeys } = this.state;
    const menuClicked = (
      <DropdownMenu onClick={this.handleMenuClickToLink}>
        {roles.map(role => (<MenuItem key={role.id}>{role.name}</MenuItem>))}
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
                  </div><div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Email"}
                      placeholder="example@counter.fptu.com"
                      value={this.state.email}
                      required
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <DropdownBox label={"Role"} menuClicked={menuClicked} value={selectedRole.name} />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <Transfer
                      dataSource={stores}
                      titles={['All Store', 'Work Store']}
                      targetKeys={targetKeys}
                      selectedKeys={selectedKeys}
                      onChange={this.handleChange}
                      onSelectChange={this.handleSelectChange}
                      render={item => item.title}
                      showSearch={true}
                      filterOption={this.filterOption}
                    />
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
                          {/* <Button type="button" onClick={onVIewChange}>
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                </Button> */}
                          {/* <DeleteButton
                  deleteContact={deleteContact}
                  contact={selectedContact}
                /> */}
                        </div>
                        <SingleContactView
                          contact={selectedContact}
                        // otherAttributes={otherAttributes}
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
