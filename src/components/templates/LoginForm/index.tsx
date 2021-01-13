import React, { Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';

import * as T from 'types';
import palette from 'constants/palette';

const Root = styled.div`
    margin: 5px 0;
`


const InputForm = styled.input<{ addable?: boolean }>`
    width: 100%;
    height: 48px;
    position: relative;

    padding: 16px;
    padding-left: ${(props) => props.addable ? '56px' : 'none'};
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`


interface FormFactoryProps {
    type: T.LoginFormType;  
    description: string;
    height: string; 
    options?: string[]; // type should be changed
    setValue?: Dispatch<SetStateAction<any>>;
    initialValue?: string;
    value?: any;
}

const FormFactory: FC<FormFactoryProps> = ({ type, description, height, options, setValue, initialValue, value }) => {

    switch (type) {
        case T.LoginFormType.INPUT:
            if (setValue === undefined) return null;
            return (
                <InputForm placeholder={description} value={value} onChange={(e) => setValue(e.target.value)}/>
            );
        case T.LoginFormType.PASSWORD:
            if (setValue === undefined) return null;
            return (
                <InputForm placeholder={description} onChange={(e) => setValue(e.target.value)} type="password"/>
            );
        default:
            return null;
    }
};

interface Props {
    description: string;
    type: T.LoginFormType;  
    height: string; 
    setValue?: Dispatch<SetStateAction<any>>;
    initialValue?: string;
    value?: any;
}

const LoginForm: FC<Props> = ({ description, type, height, setValue, initialValue, value }) => {
    return (
        <Root>
            <FormFactory type={type} description={description} initialValue={initialValue} height={height} setValue={setValue} value={value} />
        </Root>
    );
}

export default LoginForm;