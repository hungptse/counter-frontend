import React, { Component } from 'react';
import CardReactFormContainer from 'card-react';
import Form from '../uielements/form';
import { Input } from 'antd';
import isoModal from '../feedback/modal';
import './card.css';
import { CardInfoWrapper, InfoFormWrapper } from './cardModal.style';
import { InputWrapper } from '../uielements/styles/input.style';
import Modals from '../../containers/Feedback/Modal/modal.style';
import WithDirection from '../../config/withDirection';
import InputBox  from '../utility/input-box'
import IntlMessages from '../utility/intlMessages';

const WDModal = Modals(isoModal);
const Modal = WithDirection(WDModal);

const InputField = InputWrapper(Input);

export default class extends Component {
  render() {
    const {
      modalType,
      editView,
      handleCancel,
      selectedCard,
      saveRole,
      updateCard,
    } = this.props;

    this.columns = [
      {
        title: 'Role name',
        dataIndex: 'name',
        key: 'name',
      },
    ];

    const containerId = 'card-wrapper';
    const cardConfig = {
      container: containerId, // required an object contain the form inputs names. every input must have a unique name prop.
      formInputsNames: {
        name: 'name', // optional - default "name"
      },
      initialValues: selectedCard,
      classes: {
        valid: 'valid-input', // optional — default 'jp-card-valid'
        invalid: 'valid-input', // optional — default 'jp-card-invalid'
      },
      formatting: true, // optional - default true
    };
    return (
      <Modal
        title={modalType === 'edit' ? 'Edit Role' : 'Add Role'}
        visible={editView}
        onCancel={handleCancel}
        cancelText="Cancel"
        onOk={saveRole}
        okText={modalType === 'edit' ? 'Edit Role' : 'Add Role'}
      >
        <div className="isoInputFieldset vertical">
          <InputBox
            label={<IntlMessages id="name" />}
            placeholder="Admin/Staff/..."
          />
        </div>
        <CardInfoWrapper id={containerId} className="isoCardWrapper" />
      </Modal>
    );
  }
}
