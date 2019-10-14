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

const { Content } = Layout;
const { confirm } = Modal;
class Contacts extends Component {
  state = { users: [], selectedContact: {} }
  async componentDidMount() {
    await GET(ENDPOINT.ALL_USER, {}, {}, true).then(res => {
      this.setState({ users: res.data.user })
    });
  }

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this role?',
      content: 'When you delete can\'t be convert',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        console.log("OK");
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  changeContact = (id) => {
    this.setState({ selectedContact: this.state.users.filter(user => user.id === id)[0] })
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
