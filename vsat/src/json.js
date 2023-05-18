export const json = {
  "title": "VSAT Security Logging and Monitoring Failures Survey",
  "description": "This survey aims to gather insights on security logging and monitoring failures in organizations. We seek to identify challenges faced in detecting and responding to security incidents, to develop recommendations to enhance security practices and strengthen cybersecurity measures.",
  "logoPosition": "right",
 "completedHtmlOnCondition": [{
     "expression": "{totalScore} >= 90",
     "html": "Your security score is {totalScore}. Your assets are at ow risk, good job!"
   }, {
     "expression": "({totalScore}>=60) && ({totalScore} <90 )",
     "html": "Your security score is {totalScore}. Your assests are at moderate risk!"
   }, {
     "expression": "({totalScore}>=0) && ({totalScore} <60 )",
     "html": "Your security score is {totalScore}. Your assets are at high risk!"
   }],
  "pages": [
   {
    "name": "page1",
    "elements": [
     {
      "type": "radiogroup",
      "name": "question1",
      "title": "How confident are you in the effectiveness of your organization's security logging and monitoring systems?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Very confident",
   "score": 8
       },
       {
        "value": "Item 2",
        "text": "Somewhat confident",
   "score": 7
       },
       {
        "value": "Item 3",
        "text": "Neutral",
   "score": 5
       },
       {
        "value": "Item 4",
        "text": "Not confident at all",
   "score":  0
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question2",
      "title": "Have you ever encountered a security incident that could have been prevented or detected earlier with better logging and monitoring?",
      "choices": [
        {
         "value": "Item 1",
         "text": "Yes",
    "score": 0
        },
        {
          "value": "Item 2",
          "text": "No",
          "score": 8
        }
       ]
    },
     {
      "type": "radiogroup",
      "name": "question3",
      "title": "How frequently does your organization review and analyze security logs and monitoring data?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Daily",
   "score": 8
       },
       {
        "value": "Item 2",
        "text": "Weekly",
   
   "score": 7
       },
       {
        "value": "Item 3",
        "text": "Monthly",
   "score": 5
       },
       {
        "value": "Item 4",
        "text": "Quarterly",
   "score": 3
       },
       {
        "value": "Item 5",
        "text": "Yearly",
   "score": 0
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question4",
      "title": "Which of the following best describes your organization's approach to security logging and monitoring?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Proactive: We have well-defined processes and automated tools in place to monitor and respond to security events.",
   
   "score": 8   
  },
       {
        "value": "Item 2",
        "text": "Reactive: We rely on manual processes and ad-hoc monitoring, which may result in delayed responses to security incidents.",
   
   "score": 5
    },
       {
        "value": "Item 3",
        "text": "Inadequate: We have minimal or no security logging and monitoring capabilities.",
   
   "score": 3   
  }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question5",
      "title": "Are you satisfied with the current level of visibility and coverage provided by your organization's security logging and monitoring systems?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Completely satisfied",
   "score": 8
       },
       {
        "value": "Item 2",
        "text": "Somewhat satisfied",
   "score": 7
       },
       {
        "value": "Item 3",
        "text": "Neutral",
   "score": 5
       },
       {
        "value": "Item 4",
        "text": "Somewhat dissatisfied",
   "score": 2
       },
       {
        "value": "Item 5",
        "text": "Completely dissatisfied",
   "score": 0
       }
      ]
     },
     {
      "type": "checkbox",
      "name": "question6",
      "title": "What are the primary challenges your organization faces in implementing effective security logging and monitoring systems? (Select all that apply)",
      "choices": [
       {
        "value": "Item 1",
        "text": "Lack of budget"
       },
       {
        "value": "Item 2",
        "text": "Lack of skilled personnel"
       },
       {
        "value": "Item 3",
        "text": "Inadequate tools and technologies"
       },
       {
        "value": "Item 5",
        "text": "Lack of executive support"
       }
      ],
      "showOtherItem": true,
      "otherText": "Other "
     },
     {
      "type": "radiogroup",
      "name": "question7",
      "title": "Does your organization have a documented incident response plan that includes steps for analyzing security logs and monitoring data?",
      "choices": [
        {
         "value": "Item 1",
         "text": "Yes",
    "score": 8
        },
        {
          "value": "Item 2",
          "text": "No",
          "score": 0
        }
       ]
     },
     {
      "type": "radiogroup",
      "name": "question8",
      "title": "Are there any compliance or regulatory requirements that mandate specific logging and monitoring practices within your organization?",
      "choices": [
        {
         "value": "Item 1",
         "text": "Yes",
    "score": 8
        },
        {
          "value": "Item 2",
          "text": "No",
          "score": 0
        }
       ]
     },
     {
      "type": "radiogroup",
      "name": "question9",
      "title": "How actively does your organization share and collaborate with other industry peers or security communities to improve security logging and monitoring practices?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Very actively",
   "score": 8
       },
       {
        "value": "Item 2",
        "text": "Somewhat actively",
   "score": 7
       },
       {
        "value": "Item 3",
        "text": "Neutral",
   "score": 5
       },
       {
        "value": "Item 4",
        "text": "Somewhat passively",
   "score": 2
       },
       {
        "value": "Item 5",
        "text": "Very passively",
   "score": 0
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question10",
      "title": "How well does your organization educate and train employees on the importance of security logging and monitoring, as well as how to identify and report security incidents?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Very well",
   "score": 8
       },
       {
        "value": "Item 2",
        "text": "Moderately well",
   "score": 7
       },
       {
        "value": "Item 3",
        "text": "Neutral",
   "score": 5
       },
       {
        "value": "Item 4",
        "text": "Somewhat poorly",
   "score": 2
       },
       {
        "value": "Item 5",
        "text": "Very poorly",
   "score": 0
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question11",
      "title": "Does your organization have dedicated personnel responsible for monitoring and responding to security events indicated by the logs?",
      "choices": [
       {
        "value": "Item 1",
        "text": "Yes, a dedicated security operations team",
   "score": 8
       },
       {
        "value": "Item 2",
        "text": "Yes, shared responsibility among IT personnel",
   "score": 7
       },
       {
        "value": "Item 3",
        "text": "No, no dedicated personnel",
   "score": 5
       },
       {
        "value": "Item 4",
        "text": "Not sure",
   "score": 2
       }
      ]
     },
     {
      "type": "radiogroup",
      "name": "question12",
      "title": "Does your organization leverage artificial intelligence or machine learning technologies to enhance security log analysis and anomaly detection?",
      "choices": [
        {
         "value": "Item 1",
         "text": "Yes",
    "score": 8
        },
        {
          "value": "Item 2",
          "text": "No",
          "score": 0
        }
       ]
     }
    ]
   }
  ]
 };
 