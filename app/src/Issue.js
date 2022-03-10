div
REACT
Feedback
JSX
import React from "react";

function App() {
  return (
    <Issue
      iconActionAccount_Circle_24Px="icon-action-account-circle-24px-1.png"
      spanText1="Label"
      textInput="text-input-1.png"
      spanText2="Validate"
      textField1Props={issueData.textField1Props}
      textField2Props={issueData.textField2Props}
    />
  );
}

export default App;

function Issue(props) {
  const { iconActionAccount_Circle_24Px, spanText1, textInput, spanText2, textField1Props, textField2Props } = props;

  return (
    <div className="container-center-horizontal">
      <div className="issuescreen">
        <div className="overlap-group">
          <div className="contents">
            <img className="iconactionaccount_circle_24px" src={iconActionAccount_Circle_24Px} />
            <div className="selectedroboto-normal-black-12px">
              <span className="roboto-normal-black-12px">{spanText1}</span>
            </div>
          </div>
          <div className="text-field">
            <TextField>{textField1Props.children}</TextField>
          </div>
          <img className="text-input" src={textInput} />
          <TextField className={textField2Props.className}>
            {textField2Props.children}
          </TextField>
          <div className="button">
            <div className="text-labelvalign-text-middleroboto-medium-white-14px">
              <span>
                <span className="roboto-medium-white-14px">{spanText2}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextField(props) {
  const { children, className } = props;

  return (
    <div className={`text-field-1 border-1px-black-3 ${className || ""}`}>
      <div className="labelroboto-normal-black-16px">
        <span className="span-1roboto-normal-black-16px">{children}</span>
      </div>
    </div>
  );
}

const textField1Data = {
  children: "Describe your issue",
};

const textField2Data = {
  children: "Tags",
  className: "text-field-2",
};

const issueData = {
  textField1Props: textField1Data,
  textField2Props: textField2Data,
};