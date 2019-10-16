import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Tabs, Icon } from 'antd';
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
import DropdownBox from '../../../components/utility/dropdown';
import { DropdownMenu, MenuItem } from '../../../components/uielements/dropdown';
import Company from '../company';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
class Store extends Component {
  constructor(props) {
    super(props);

    this.columns = createColumns(this.editStore, this.deleteRole);
    this.state = {
      stores: [],
      companies: [],
      selectedCompany: {},
      name: '',
      modalType: '',
      store : {}
    };


  }

  async componentDidMount() {
    await GET(ENDPOINT.ALL_STORE, {}, {}, true).then(res => {
      this.setState({ stores: res.data.items })
    });
    await this.getAllCompanies();
  }


  editStore = async (store) => {
    await this.getAllCompanies();
    this.setState({
      visible: true,
      modalType: 'edit',
      selectedCompany: this.state.companies.find(c => c.id == store.company_id),
      store : store,
      name : store.name,
      address : store.address
    });
  }
  getAllCompanies = async () => {
    if (this.state.companies.length === 0) {
      await GET(ENDPOINT.COMPANY, {}, {}, true).then(res => {
        this.setState({ companies: res.data.company })
      });
    }
  }
  handleMenuClickToLink = e => {
    this.setState({ selectedCompany: e.key != this.state.selectedCompany.id ? this.state.companies.find(r => r.id == e.key) : this.state.selectedCompany })
  }
  addNewStore = async () => {
    await this.getAllCompanies();
    this.setState({
      visible: true,
      name: '',
      selectedCompany: this.state.companies[0],
      address: '',
      modalType: 'add'
    });
  };
  handleOk = async () => {
    this.setState({ loading: true });
    if (this.state.modalType === 'add') {
      await POST(ENDPOINT.ALL_STORE, {
        name: this.state.name,
        address: this.state.address,
        company_id: this.state.selectedCompany.id
      }, {}, {}, true).then(res => {
        this.setState({ stores: [...this.state.stores, res.data] })
      });
    } else if (this.state.modalType === 'edit') {
      await PUT(`${ENDPOINT.ALL_STORE}/${this.state.store.id}`, {
        name: this.state.name,
        address: this.state.address,
        company_id: this.state.selectedCompany.id
      }, {}, {}, true).then(res => {
        this.setState({ stores: this.state.stores.map(r => r.id === this.state.store.id ? res.data : r) })
      });
    }
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { stores, selectedCompany, companies } = this.state;

    const menuClicked = (
      <DropdownMenu onClick={this.handleMenuClickToLink}>
        {companies.map(c => (<MenuItem key={c.id}>{c.name}</MenuItem>))}
      </DropdownMenu>
    );

    return (
      // <LayoutWrapper>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="bank" />
              Store
                </span>
          }
          key="1"
        >
          <PageHeader>Store Management</PageHeader>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Box>
                <ContentHolder>
                  <ButtonWrapper>
                    <Button type="primary" onClick={this.addNewStore}>
                      Add new store
                      </Button>
                  </ButtonWrapper>
                  <Modal
                    maskClosable={false}
                    visible={this.state.visible}
                    title="New Store"
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
                    <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                      <InputBox
                        label={<IntlMessages id="name" />}
                        placeholder="7-11 at FU"
                        value={this.state.name}
                        required
                        onChange={(e) => this.setState({ name: e.target.value })}
                      />
                    </div>
                    <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                      <InputBox
                        label={"Address"}
                        placeholder="FPT Univeristy, District 9, HCM"
                        value={this.state.address}
                        required
                        onChange={(e) => this.setState({ address: e.target.value })}
                      />
                    </div>
                    <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                      <DropdownBox label={"Company"} menuClicked={menuClicked} value={selectedCompany.name} />
                    </div>

                  </Modal>
                  <SimpleTable columns={this.columns} dataSource={stores} />
                </ContentHolder>
              </Box>
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <Icon type="apartment" />
              Company
              </span>
          }
          key="2"
        >
          <Company />
        </Tabs.TabPane>
      </Tabs>

      // </LayoutWrapper >
    );
  }
}

export default Store;
