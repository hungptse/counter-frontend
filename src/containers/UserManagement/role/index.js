import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import clone from 'clone';
import Button from '../../../components/uielements/button';
import PageHeader from '../../../components/utility/pageHeader';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import basicStyle from '../../../config/basicStyle';
import { createColumns } from './config';
import { ButtonWrapper } from '../../../components/card/cardModal.style';
import SimpleTable from '../../Tables/antTables/tableViews/simpleView';
import { GET, ENDPOINT, POST, PUT, DELETE } from '../../../helpers/api';
import IntlMessages from '../../../components/utility/intlMessages'
import ContentHolder from '../../../components/utility/contentHolder';
import InputBox from '../../../components/utility/input-box'

import Modals from '../../../components/feedback/modal';

import ModalStyle from '../../Feedback/Modal/modal.style';
import WithDirection from '../../../config/withDirection';
import Tree, { TreeNode } from '../../../components/uielements/tree';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
class Role extends Component {
  constructor(props) {
    super(props);

    this.columns = createColumns(this.editRole, this.deleteRole);
    this.state = {
      editView: false,
      selectedCard: null,
      modalType: '',
      roles: [],
      permissions: [],
      role: {},
      permissionChecked: [],
      name: ''
    };


  }

  async componentDidMount() {
    await GET(ENDPOINT.ALL_ROLE, {}, {}, true).then(res => {
      this.setState({ roles: res.data.roles })
    });
  }


  editRole = async (role) => {
    await this.getAllPermission();
    this.setState({
      visible: true,
      modalType: 'edit',
      role: role,
      permissionChecked: role.permissions,
      name: role.name
    });
  }
  deleteRole = async (role) => {
    this.setState({
      roles: this.state.roles.filter(r => r.id !== role.id)
    })
    await DELETE(ENDPOINT.ALL_ROLE, {
      id: role.id
    }, {}, {}, true);
  }
  addColumn = () => {
    this.setState({
      editView: true,
      role: {
        id: new Date().getTime(),
        key: new Date().getTime(),
        number: '',
        name: '',
        expiry: '',
        cvc: '',
      },
      modalType: 'add',
    });
  }
  handleCancel = () => {
    this.setState({
      editView: false,
      selectedCard: null,
    });
  }
  // updateCard(selectedCard) {
  //   this.setState({ selectedCard });
  // }
  getAllPermission = async () => {
    if (this.state.permissions.length === 0) {
      await GET(ENDPOINT.ALL_PERMISSION, {}, {}, true).then(res => {
        this.setState({ permissions: res.data.permissions })
      });
    }
  }
  addNewRole = async () => {
    await this.getAllPermission();
    this.setState({
      visible: true,
      role: {},
      permissionChecked: [],
      modalType: 'add',
      name : ''
    });
  };
  handleOk = async () => {
    this.setState({ loading: true });
    if (this.state.modalType === 'add') {
      await POST(ENDPOINT.ALL_ROLE, {
        name: this.state.name,
        permissions: this.state.permissionChecked
      }, {}, {}, true).then(res => {
        this.setState({ roles: [...this.state.roles, res.data] })
      });
    } else if (this.state.modalType === 'edit') {
      await PUT(ENDPOINT.ALL_ROLE, {
        id: this.state.role.id,
        permissions: this.state.permissionChecked,
        name : this.state.name
      }, {}, {}, true).then(res => {
        this.setState({ roles: this.state.roles.map(r => r.id === this.state.role.id ? res.data : r) })
      });
    }
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onCheck = (checkedKeys, info) => {
    this.setState({ permissionChecked: checkedKeys })
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { permissions, roles, permissionChecked, role } = this.state;

    const renderPermission = (permissions) => {
      return (
        <Tree
          onCheck={this.onCheck}
          checkable
          defaultExpandedKeys={['ALL']}
          checkedKeys={permissionChecked}
        // onSelect={this.onSelect}
        >
          <TreeNode title="All Permissions" key="ALL">
            {permissions.map(p => {
              if (p.child.length === 0) {
                return (<TreeNode title={p.displayName} key={p.name} />)
              } else {
                return (<TreeNode title={p.displayName} key={p.name} >
                  {p.child.map(c => {
                    return (<TreeNode title={c.displayName} key={c.name} />)
                  })}
                </TreeNode>)
              }
            })}
          </TreeNode>
        </Tree>
      )
    }

    return (
      <LayoutWrapper>
        <PageHeader>Role Management</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <ContentHolder>
                <ButtonWrapper>
                  <Button type="primary" onClick={this.addNewRole}>
                    {<IntlMessages id="role.addnew" />}
                  </Button>
                </ButtonWrapper>
                <Modal
                  visible={this.state.visible}
                  title="New Role"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
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
                  <div className="isoInputFieldset vertical">
                    <InputBox
                      label={<IntlMessages id="name" />}
                      placeholder="Admin/Staff/..."
                      value={this.state.name}
                      required
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  {renderPermission(permissions)}
                </Modal>
                <SimpleTable columns={this.columns} dataSource={roles} />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}

export default Role;
