import React from "react";
import "./Chat.css"
import {withRouter} from 'react-router';

function Chat() {

  return (
    <div className="container-center-horizontal">
      <div className="chatscreen">
        <div className="overlap-group">
          <div className="contents">
            <img className="iconactionaccount_circle_24px" src="icon-action-account-circle-24px-1.png" />
            <div className="selectedroboto-normal-black-12px">
              <span className="roboto-normal-black-12px">Label</span>
            </div>
          </div>
          <div className="text-field">
            <div className="text-field-1border-1px-black-3">
              <div className="labelroboto-normal-black-16px">
                <span className="roboto-normal-black-16px">Bois de l’eau batard</span>
              </div>
            </div>
          </div>
          <TextField />
          <TextField2 />
          <TextField />
          <TextField />
          
          <Button />
        </div>
      </div>
    </div>
  );
}

function TextField() {
  return (
    <div className="text-field-2">
      <div className="text-field-3border-1px-black-3">
        <p className="label-1roboto-normal-white-16px">
          <span className="roboto-normal-white-16px">toto</span>
        </p>
      </div>
    </div>
  );
}

function TextField2(props) {
  const { className } = props;

  return (
    <div className={`text-field-4 border-1px-black-3 ${className || ""}`}>
      <div className="label-2roboto-normal-black-16px">
        <span className="span-2roboto-normal-black-16px">Bois de l’eau batard</span>
      </div>
    </div>
  );
}

function TextField3(props) {
  const { children } = props;

  return (
    <div className="text-field-6border-1px-black-3">
      <div className="label-3roboto-normal-black-16px">
        <span className="roboto-normal-black-16px">{children}</span>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="button">
      <div className="text-labelvalign-text-middleroboto-medium-white-14px">
        <span>
          <span className="roboto-medium-white-14px">Validate</span>
        </span>
      </div>
    </div>
  );
}

const textField22Data = {
  className: "text-field-5",
};

const textField32Data = {
  children: "Write something",
};

const chatData = {
  textField2Props: textField22Data,
  textField3Props: textField32Data,
};

export default withRouter(Chat);