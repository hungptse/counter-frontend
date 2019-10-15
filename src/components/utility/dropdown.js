import React from 'react';
import Input from '../uielements/input';
import { InputBoxWrapper } from './checkout.style';
import { Button, Dropdown, Icon } from 'antd';

class DropdownBox extends React.Component {
    render() {
        const { label, placeholder, onChange, value, menuClicked } = this.props;
        return (
            <InputBoxWrapper className="isoInputBox">
                <label>
                    {label}
                    {this.props.important ? <span className="asterisk">*</span> : null}
                </label>
                <Dropdown overlay={menuClicked}>
                    <Button>
                        {value} <Icon type="down" />
                    </Button>
                </Dropdown>
                {/* <Input size="large" value={value} placeholder={placeholder} onChange={onChange} /> */}
            </InputBoxWrapper>
        );
    }
}
export default DropdownBox;
