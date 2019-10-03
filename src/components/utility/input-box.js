import React from 'react';
import Input from '../uielements/input';
import { InputBoxWrapper } from './checkout.style';

class InputBox extends React.Component {
  render() {
    const { label, placeholder,onChange } = this.props;
    return (
      <InputBoxWrapper className="isoInputBox">
        <label>
          {label}
          {this.props.important ? <span className="asterisk">*</span> : null}
        </label>
        <Input size="large" placeholder={placeholder} onChange={onChange} />
      </InputBoxWrapper>
    );
  }
}
export default InputBox;
