import React, { Component } from 'react';
import { Layout, Icon, Row, Col, Empty, Modal } from 'antd';
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

const { Content } = Layout;
const { confirm } = Modal;
class Contacts extends Component {
  state = { users: [], selectedContact: {}, roles : [] }
  async componentDidMount() {
    await GET(ENDPOINT.ALL_USER, {}, {}, true).then(res => {
      this.setState({ users: res.data.user })
    });
    await GET(ENDPOINT.ALL_ROLE, {}, {}, true).then(res => {
      this.setState({ roles: res.data.roles })
    });
  }
  changeContact = (id) => {
    this.setState({ selectedContact: this.state.users.filter(user => user.id === id)[0] })
  }

  addNewRole = async () => {
    // await this.getAllPermission();
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    console.log(this.state);
    
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { users, selectedContact } = this.state
    return (
      <LayoutWrapper>
        <PageHeader>User Management</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <ContentHolder>
                <ButtonWrapper>
                  <Button type="primary" onClick={this.addNewRole}>
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
                      placeholder="Admin/Staff/..."
                      value={this.state.username}
                      required
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label="Fullname"
                      placeholder="Admin/Staff/..."
                      value={this.state.name}
                      required
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div><div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label="Phone Number"
                      placeholder="Admin/Staff/..."
                      value={this.state.phone}
                      required
                      onChange={(e) => this.setState({ phone: e.target.value })}
                    />
                  </div><div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Email"}
                      placeholder="Admin/Staff/..."
                      value={this.state.email}
                      required
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Role"}
                      value={this.state.role}
                      required
                      onChange={(e) => this.setState({ role: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Store"}
                      placeholder="Admin/Staff/..."
                      value={this.state.store}
                      required
                      onChange={(e) => this.setState({ store: e.target.value })}
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
