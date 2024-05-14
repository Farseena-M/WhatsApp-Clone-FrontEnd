import { combineReducers } from "redux";
import peer from './PeerReducer';
import socket from "./socketReducre";
import call from "./callReducer";
import modal from "./ModalReducer";


export default combineReducers({
    peer,
    socket,
    call,
    modal
})