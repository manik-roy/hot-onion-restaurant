import React from 'react';
import Loading from './Loading';
const WithLoading = (WrapComponent) => {
    const Spiner = ({isLoading, ...otherProps}) => {
        return isLoading ? 
            (<Loading>
               
            </Loading>)
             : (
                <WrapComponent {...otherProps} />
            )
    }
    return Spiner;
};

export default WithLoading;