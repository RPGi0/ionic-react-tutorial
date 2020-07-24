import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const InputControl: React.FC<{
  selectedValue: "metric" | "standard";
  onSelectValue: (value: "metric" | "standard") => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.onSelectValue(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="metric">
        <IonLabel>m/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="standard">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
