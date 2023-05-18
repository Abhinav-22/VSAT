import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { Serializer } from "survey-core";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./json";

// Add a custom `score` property to choice options
Serializer.addProperty("itemvalue", {
    name: "score:number"
  });
function SurveyComponent() {
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
function calculateTotalScore(data) {
      var totalScore = 0;
      data.forEach((item) => {
        const question = survey.getQuestionByValueName(item.name);
        const qValue = item.value;
        if (question.choices) {
          const selectedChoice = question.choices.find(choice => choice.value === qValue);
          if (selectedChoice) {
            totalScore += selectedChoice.score;
          }
        }
});
      return totalScore;
    }
    survey.onCompleting.add((sender) => {  
     
      // Get survey results as a flat data array
      const plainData = sender.getPlainData({
        // Include `score` values into the data array
        calculations: [{ propertyName: "score" }]
      });
      const totalScore = calculateTotalScore(plainData);
    
      // Save the scores in survey results
      sender.setValue("totalScore", totalScore);
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;

   