/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */

import SvgIcon from "../SvgIcon";
import ColorButton from "../colorButton";

const Header: React.FunctionComponent = () => {
    return (
        <div className='container'>
            <div className="row align-items-center">
                <div className="col">
                    <SvgIcon name={'logo'} className="logo" />
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end">
                        <ColorButton text="Connect Button" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;