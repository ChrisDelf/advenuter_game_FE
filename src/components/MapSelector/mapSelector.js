import React from 'react';
import { connect } from 'react-redux';
import {generateMap, getMap} from "../../actions/charActions";
import {getUserInfo} from "../../actions/authActions";


const mapSelector = (props) => {

    return (
        <div>

        </div>
    )
}



export default connect(
    mapStateToProps,
    null,
)(mapSelector);

