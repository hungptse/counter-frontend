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

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const types = [{
  id: 1,
  name: "Electricity"
},
{
  id: 2,
  name: "Water"
}]
class Counter extends Component {
  constructor(props) {
    super(props);

    this.columns = createColumns(this.editCompany, this.deleteRole);
    this.state = {
      counters: [],
      stores : [],
      modalType: '',
      selectedType : {},
      selectedStore : {}
    };


  }

  async componentDidMount() {
    await this.getAllCounter();
    await GET(ENDPOINT.ALL_STORE, {}, {}, true).then(res => {
      this.setState({ stores: res.data.items });
    });
    this.setState({ selectedType : types[0], selectedStore : this.state.stores[0]})
  }


  editCompany = async (company) => {
    await this.getAllCounter();
    this.setState({
      visible: true,
      modalType: 'edit',
      address: company.address,
      name: company.name,
      company: company
    });
  }

  getAllCounter = async () => {
    if (this.state.counters.length === 0) {
      await GET(ENDPOINT.COUNTER, {}, {}, true).then(res => {
        this.setState({ counters: res.data.counter })
      });
    }
  }

  addNewCounter = async () => {
    await GET(ENDPOINT.ALL_STORE, {}, {}, true).then(res => {
      this.setState({ stores: res.data.items });
    });
    this.setState({
      visible: true,
      name: '',
      brand: '',
      modalType: 'add'
    });
  };
  handleOk = async () => {
    this.setState({ loading: true });
    if (this.state.modalType === 'add') {
      await POST(ENDPOINT.COUNTER, {
        name: this.state.name,
        brand: this.state.brand,
        type_id : this.state.selectedType.id,
        store_id : this.state.selectedStore.id
      }, {}, {}, true).then(res => {
        this.setState({ counters: [...this.state.counters, res.data] })
      });
    } else if (this.state.modalType === 'edit') {
      await PUT(`${ENDPOINT.COMPANY}/${this.state.company.id}`, {
        name: this.state.name,
        address: this.state.address,
      }, {}, {}, true).then(res => {
        this.setState({ companies: this.state.companies.map(r => r.id === this.state.company.id ? res.data : r) })
      });
    }
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleMenuClickToLinkStore = e => {
    this.setState({ selectedStore: e.key != this.state.selectedStore.id ? this.state.stores.find(r => r.id == e.key) : this.state.selectedStore })
  }

  handleMenuClickToLinkType = e => {
    this.setState({ selectedType: e.key != this.state.selectedType.id ? types.find(r => r.id == e.key) : this.state.selectedType })
  }


  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    const { stores, selectedType, counters, selectedStore } = this.state;
    const menuClickedStore = (
      <DropdownMenu onClick={this.handleMenuClickToLinkStore}>
        {this.state.stores.map(c => (<MenuItem key={c.id}>{c.name}</MenuItem>))}
      </DropdownMenu>
    );

    const menuClicked = (
      <DropdownMenu onClick={this.handleMenuClickToLinkType}>
        {types.map(c => (<MenuItem key={c.id}>{c.name}</MenuItem>))}
      </DropdownMenu>
    );

    return (
      <div style={{ margin: "50px 20px 50px 20px" }}>
        <PageHeader>Counter Management</PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <ContentHolder>
                <ButtonWrapper>
                  <Button type="primary" onClick={this.addNewCounter}>
                    Add new counter
                      </Button>
                </ButtonWrapper>
                <Modal
                  maskClosable={false}
                  visible={this.state.visible}
                  title={this.state.modalType === "add" ? "New Company" : "Update Company"}
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
                      placeholder="Counter 123"
                      value={this.state.name}
                      required
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <InputBox
                      label={"Brand"}
                      placeholder="Daikin,..."
                      value={this.state.brand}
                      required
                      onChange={(e) => this.setState({ brand: e.target.value })}
                    />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <DropdownBox label={"Type"} menuClicked={menuClicked} value={selectedType.name} />
                  </div>
                  <div className="isoInputFieldset vertical" style={{ marginBottom: "5%" }}>
                    <DropdownBox label={"Store"} menuClicked={menuClickedStore} value={selectedStore.name} />
                  </div>
                </Modal>
                <SimpleTable columns={this.columns} dataSource={counters} />
              </ContentHolder>
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Counter;
