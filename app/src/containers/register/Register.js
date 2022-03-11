import React from "react";
import "./Register.css";
import {withRouter} from 'react-router';


function Register() {
  
    return (
      <div className="container-center-horizontal">
        <div className="registerscreen">
          <div className="overlap-group">
            <div className="text-field-container">
              <TextField5>Prénom</TextField5>
              <TextField5 className="text-field-3">
              Nom
            </TextField5>
            </div>
            <div className="text-fieldborder-1px-black-3">
              <div className="labelroboto-normal-black-16px">
                <span className="roboto-normal-black-16px">Address</span>
              </div>
            </div>
            <div className="flex-row">
              <div className="text-field-container-1">
                <TextField5>Code postal</TextField5>
                <TextField5 className="text-field-a">
                  Email
                </TextField5>
                <TextField5 className="text-field-a">
                  Mot de passe
                </TextField5>
              </div>
              <div className="flex-col">
                <TextField5>Ville</TextField5>
                <TextField5 className="text-field-a">
                  Téléphone
                </TextField5>
                <TextField5 className="text-field-a">
                  Confirmation du mot de passe
                </TextField5>
                <Button />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  function TextField5(props) {
    const { children, className } = props;
  
    return (
      <div className={`text-field-1-1 border-1px-black-3 ${className || ""}`}>
        <div className="label-1roboto-normal-black-16px">
          <span className="spanroboto-normal-black-16px">{children}</span>
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
  
  const textField51Data = {
    children: "Prénom",
  };
  
  const textField52Data = {
    children: "Nom",
    className: "text-field-3",
  };
  
  const textField53Data = {
    children: "Code postal",
  };
  
  const textField54Data = {
    children: "Code postal",
    className: "text-field-a",
  };
  
  const textField55Data = {
    children: "Mots de passe",
    className: "text-field-a",
  };
  
  const textField56Data = {
    children: "Ville",
  };
  
  const textField57Data = {
    children: "Ville",
    className: "text-field-a",
  };
  
  const textField58Data = {
    children: "Confirmation de mots de passe",
    className: "text-field-a",
  };
  
  const registerData = {
    spanText: "Addresse",
    textField1Props: textField51Data,
    textField2Props: textField52Data,
    textField3Props: textField53Data,
    textField4Props: textField54Data,
    textField5Props: textField55Data,
    textField6Props: textField56Data,
    textField7Props: textField57Data,
    textField8Props: textField58Data,
  };

export default withRouter(Register);

