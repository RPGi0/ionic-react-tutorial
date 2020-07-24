import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert,
} from "@ionic/react";

import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResult";
import InputControl from "./components/InputControl";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [err, setErr] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"metric" | "standard">("metric");

  // useRef in TS: declare type of element you're
  // connecting to and initialize the value as `null`
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    // ".current?.value" = TS shorthand turnairy syntax, checks against null values
    // ".current!.value" = value can never be null, code won't run w/o valid ref
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredWeight <= 0 ||
      +enteredHeight <= 0
    ) {
      setErr("Please enter a valid (non-negative) input number");
      return;
    }

    const weightConversionFactor = calcUnits === "standard" ? 2.2 : 1;
    const heightConversionFactor = calcUnits === "standard" ? 3.28 : 1;

    const weight = +enteredWeight / weightConversionFactor;
    const height = +enteredHeight / heightConversionFactor;

    const bmi: number = weight / (height * height);

    setCalculatedBMI(bmi);
  };

  const resetInputs = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearErr = () => {
    setErr("");
  };

  const selectCalcUnitHandler = (selectedValue: "metric" | "standard") => {
    setCalcUnits(selectedValue);
  };

  return (
    <React.Fragment>
      {/* !! converts variable to boolean */}
      <IonAlert
        isOpen={!!err}
        message={err}
        buttons={[{ text: "Okay", handler: clearErr }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControl
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Height ({calcUnits === "metric" ? "meters" : "feet"})
                  </IonLabel>
                  <IonInput type="number" ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Your Weight ({calcUnits === "metric" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput type="number" ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls onCalc={calculateBMI} onReset={resetInputs} />
            {/* if calculatedBMI is truthy, the following will be rendered to the DOM */}
            {calculatedBMI && <BmiResult result={calculatedBMI} />}
          </IonGrid>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
