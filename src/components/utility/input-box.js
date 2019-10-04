import React from 'react';
import Input from '../uielements/input';
import { InputBoxWrapper } from './checkout.style';

class InputBox extends React.Component {
  render() {
    const { label, placeholder,onChange, value } = this.props;
    return (
      <InputBoxWrapper className="isoInputBox">
        <label>
          {label}
          {this.props.important ? <span className="asterisk">*</span> : null}
        </label>
        <Input size="large" value={value}  placeholder={placeholder} onChange={onChange} />
      </InputBoxWrapper>
    );
  }
}
export default InputBox;
