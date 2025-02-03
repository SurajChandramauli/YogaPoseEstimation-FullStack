// import '../pages/assets/style.css';
// import '../pages/assets/pickPose.css';

// import "https://unpkg.com/ml5@0.6.0/dist/ml5.min.js";

// import '../libraries/p5';
// import '../libraries/p5.dom';
// import '../libraries/p5.sound';
// import "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";

// import '../model/yoga';

// import React, { Component } from 'react';

// const axios = require('axios');

// export default class Dashboard extends Component {

//   render() {
//     return (
//       <div>
//     <div class="yoga-header">
//       <h1>Yoga Session</h1>

//       <h2>Press start to begin yoga session</h2>
//     </div>

//     <div class="grid-container">
//       <div class="sketch-holder" id="sketch-holder">
//       </div>
//       <div class="trainer" id='trainer'>
//         <div>
//           <h1 id="time-remaining">Starting in: 5s</h1>
//         </div>
//         <div>
//           <h2>Reference Yoga Trainer:</h2>
//         </div>
//         <div class="trainer-model">
//           <img class="trainer-img" src="" />
//         </div>
//       </div>
//       <div class="feedback" id='feedback'>
//         <h2 class="feedback-header">Feedback for user:</h2>
//         <h3 class="score">User Pose Accuracy:</h3>
//         <p class="accuracy">0 %</p>
//         <p class="feedback-description">Individual Calculated Angles</p>
//         <table>
//           <tr>
//             <th>Targetted Joints</th>
//             <th>Angle formed by left joints</th>
//             <th>Angle formed by right joints</th>
//           </tr>
//           <tr>
//             <td>Knee, Ankle, Hip</td>
//             <td id="left-0">∠ 0</td>
//             <td id="right-1">∠ 0</td>
//           </tr>
//           <tr>
//             <td>Hip, Knee, Shoulder</td>
//             <td id="left-2">∠ 0</td>
//             <td id="right-3">∠ 0</td>
//           </tr>
//           <tr>
//             <td>Shoulder, Hip, Elbow</td>
//             <td id="left-4">∠ 0</td>
//             <td id="right-5">∠ 0</td>
//           </tr>
//           <tr>
//             <td>Elbow, Shoulder, Wrist</td>
//             <td id="left-6">∠ 0</td>
//             <td id="right-7">∠ 0</td>
//           </tr>
//           <tr>
//             <td>Shoulder, Ankle, Wrist</td>
//             <td id="left-8">∠ 0</td>
//             <td id="right-9">∠ 0</td>
//           </tr>
//           <tr>
//             <td>Shoulder, Knee, Wrist</td>
//             <td id="left-10">∠ 0</td>
//             <td id="right-11">∠ 0</td>
//           </tr>
//           <tr>
//             <td>Shoulder, Hip, Wrist</td>
//             <td id="left-12">∠ 0</td>
//             <td id="right-13">∠ 0</td>
//           </tr>
//         </table>
//       </div>
//     </div>

//     <div class="homepage-btn">
//       <a href="#" class="button" id="start-btn">Start</a>

//       <a href="pickPose.html" class="button">Back</a>
//     </div>

//       </div>
//     );
//   }
// }

import "../pages/assets/style.css";
import "../pages/assets/pickPose.css";
// import 'https://unpkg.com/ml5@0.6.0/dist/ml5.min.js'
// import 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
import p5 from "p5";
import * as ml5 from "ml5";

import $ from "jquery";

import React, { Component } from "react";

import swal from "sweetalert";
const axios = require("axios");

export default class Dashboard extends Component {
  jQueryCode = () => {
    let video;
    let poseNet;
    let pose;
    let skeleton;
    let numOutputs = 8;

    let brain;

    console.log("This is the yoga.j");

    // may need to tweak with these values if we plan to use this method
    let mountainAngleTarget = [
      175, 175, 175, 175, 19, 22, 179, 170, 19, 20, 15, 15, 20, 20,
    ];
    let treeAngleTarget = [
      175, 58, 175, 114, 30, 30, 45, 45, 23, 23, 25, 45, 25, 20,
    ];
    let goddessAngleTarget = [
      110, 110, 110, 110, 100, 100, 100, 100, 120, 120, 110, 110, 140, 140,
    ];
    let warrior2AngleTarget = [
      160, 100, 160, 100, 95, 100, 175, 175, 70, 80, 80, 75, 90, 90,
    ];
    let triangleAngleTarget = [
      177, 138, 141, 95, 177, 81, 160, 175, 165, 21, 167, 50, 163, 84,
    ];
    let reverseWarriorAngleTarget = [
      177, 138, 141, 95, 177, 81, 160, 175, 165, 21, 167, 50, 163, 84,
    ];
    let seatedTwistAngleTarget = [
      177, 138, 141, 95, 177, 81, 160, 175, 165, 21, 167, 50, 163, 84,
    ];
    let sidePlankAngleTarget = [
      177, 138, 141, 95, 177, 81, 160, 175, 165, 21, 167, 50, 163, 84,
    ];

    let targetArray;
    let label = "";
    let currentPose = "";
    let poseResult = "";
    let canvas;
    let flagged = [];
    let timer = 5;
    let sessionTimer = false;
    let finishedStatus = "Finished";

    function setup(p5) {
      console.log(p5)
      canvas = p5.createCanvas(800, 600);
      canvas.parent("sketch-holder");
      video = p5.createCapture(p5.VIDEO);
      video.hide();
      video.size(800, 600);
      poseNet = ml5.poseNet(video, modelLoaded);
      poseNet.on("pose", gotPoses);

      // get user pose
      getUserPose();
      // set target array
      setTargetArray();
      // load user trainer model
      loadUserTrainer();

      // if button clicked
      $("#start-btn").on("click", function () {
        setInterval(decrease, 1000);
      });

      let options = {
        inputs: 14,
        outputs: numOutputs,
        task: "classification",
        debug: true,
      };

      brain = ml5.neuralNetwork(options);
      const modelInfo = {
        model: "model/model.json",
        metadata: "model/model_meta.json",
        weights: "model/model.weights.bin",
      };

      brain.load(modelInfo, brainLoaded);
    }

    setup(p5)

    function decrease() {
      if (sessionTimer === false) {
        if (timer > 0) {
          timer--;
          $("#time-remaining").text("Starting in: " + timer + "s");
        } else {
          sessionTimer = true;
          timer = 15;
          $("#time-remaining").text("Time left: " + timer + "s");
        }
      } else {
        if (timer > 0) {
          timer--;
          $("#time-remaining").text("Time left: " + timer + "s");
        } else {
          $("#time-remaining").text(finishedStatus);
        }
      }
    }

    function setTargetArray() {
      console.log(currentPose);
      if (currentPose === "Mountain") {
        targetArray = mountainAngleTarget;
      } else if (currentPose === "Tree") {
        targetArray = treeAngleTarget;
      } else if (currentPose === "Goddess") {
        targetArray = goddessAngleTarget;
      } else if (currentPose === "Warrior 2") {
        targetArray = warrior2AngleTarget;
      } else if (currentPose === "Triangle") {
        targetArray = triangleAngleTarget;
      } else if (currentPose === "Reverse-Warrior") {
        targetArray = reverseWarriorAngleTarget;
      } else if (currentPose === "Seated-Twist") {
        targetArray = seatedTwistAngleTarget;
      } else if (currentPose === "Side-Plank") {
        targetArray = sidePlankAngleTarget;
      }
    }

    function loadUserTrainer() {
      // pick model based on user selection
      let pose_name = currentPose.toLowerCase();
      let img_path = "";
      if (pose_name === "warrior 2") {
        pose_name = "warrior2";
      }
      let img_format = "";
      if (pose_name === "mountain" || pose_name === "tree") {
        img_format = ".svg";
      } else {
        img_format = ".png";
      }
      img_path = "imgs/" + pose_name + img_format;
      $(".trainer-img").attr("src", img_path);
    }

    function brainLoaded() {
      console.log("pose classification model ready");
      // if model is ready, then you can begin classification
      classifyPose();
    }

    function getUserPose() {
      // get user selected pose
      currentPose = localStorage.getItem("SelectedPose");
      if (currentPose === "Warrior-2") {
        currentPose = currentPose.split("-")[0];
        currentPose = currentPose + " 2";
      }
      $(".currentPose").text(currentPose + " Pose");
    }

    function calculate_angle(P1, P2, P3) {
      let angle =
        (Math.atan2(
          P2.position.y - P1.position.y,
          P2.position.x - P1.position.x
        ) -
          Math.atan2(
            P3.position.y - P1.position.y,
            P3.position.x - P1.position.x
          )) *
        (180 / Math.PI);
      // take the abs
      angle = Math.abs(angle);
      if (angle > 180) {
        angle = 360 - angle;
      }
      return Math.round(angle * 100) / 100;
    }

    function classifyPose() {
      // only classify if there is a pose detected from posenet
      if (pose) {
        let inputs = [];
        // angle is denoted by angle(P1,P2,P3) where P1 is the 'origin'
        let lKnee_lAnkle_lHip = calculate_angle(
          pose.keypoints[13],
          pose.keypoints[15],
          pose.keypoints[11]
        );
        let rKnee_rAnkle_rHip = calculate_angle(
          pose.keypoints[14],
          pose.keypoints[16],
          pose.keypoints[12]
        );
        inputs.push(lKnee_lAnkle_lHip); // detector
        inputs.push(rKnee_rAnkle_rHip); // detector

        let lHip_lKnee_lShoulder = calculate_angle(
          pose.keypoints[11],
          pose.keypoints[13],
          pose.keypoints[5]
        );
        let rHip_rKnee_rShoulder = calculate_angle(
          pose.keypoints[12],
          pose.keypoints[14],
          pose.keypoints[6]
        );
        inputs.push(lHip_lKnee_lShoulder); // detector
        inputs.push(rHip_rKnee_rShoulder); // detector

        let lShoulder_lHip_lElbow = calculate_angle(
          pose.keypoints[5],
          pose.keypoints[7],
          pose.keypoints[11]
        );
        let rShoulder_rHip_rElbow = calculate_angle(
          pose.keypoints[6],
          pose.keypoints[8],
          pose.keypoints[12]
        );
        inputs.push(lShoulder_lHip_lElbow); // detector
        inputs.push(rShoulder_rHip_rElbow); // detector

        let lElbow_lShoulder_lWrist = calculate_angle(
          pose.keypoints[7],
          pose.keypoints[5],
          pose.keypoints[9]
        );
        let rElbow_rShoulder_rWrist = calculate_angle(
          pose.keypoints[8],
          pose.keypoints[6],
          pose.keypoints[10]
        );
        inputs.push(lElbow_lShoulder_lWrist); // detector
        inputs.push(rElbow_rShoulder_rWrist); // detector

        let lShoulder_lAnkle_lWrist = calculate_angle(
          pose.keypoints[5],
          pose.keypoints[15],
          pose.keypoints[9]
        );
        let rShoulder_rAnkle_rWrist = calculate_angle(
          pose.keypoints[6],
          pose.keypoints[16],
          pose.keypoints[10]
        );
        inputs.push(lShoulder_lAnkle_lWrist);
        inputs.push(rShoulder_rAnkle_rWrist);

        let lShoulder_lKnee_lWrist = calculate_angle(
          pose.keypoints[5],
          pose.keypoints[13],
          pose.keypoints[9]
        );
        let rShoulder_rKnee_rWrist = calculate_angle(
          pose.keypoints[6],
          pose.keypoints[14],
          pose.keypoints[10]
        );
        inputs.push(lShoulder_lKnee_lWrist);
        inputs.push(rShoulder_rKnee_rWrist);

        let lShoulder_lHip_lWrist = calculate_angle(
          pose.keypoints[5],
          pose.keypoints[9],
          pose.keypoints[11]
        );
        let rShoulder_rHip_rWrist = calculate_angle(
          pose.keypoints[6],
          pose.keypoints[10],
          pose.keypoints[12]
        );
        inputs.push(lShoulder_lHip_lWrist);
        inputs.push(rShoulder_rHip_rWrist);

        //Gets the points to classify
        brain.classify(inputs, gotResult);

        // get the error for each angles collected
        calculateError(inputs);
      } else {
        // delay if it wasnt able to detect the initial pose
        setTimeout(classifyPose, 100);
      }
    }

    function calculateError(anglesArr) {
      let status = $("#time-remaining").text();
      if (sessionTimer == true && status !== finishedStatus) {
        let errorsArr = [];
        let score = 0;
        let finalScore = 0;
        // first determine if model is detecting correct pose first
        //if (poseResult === currentPose) {
        // calculate the difference in error for each angle against the average
        for (var i = 0; i < anglesArr.length; i++) {
          // check against error of margin per angle
          let err = anglesArr[i] - targetArray[i];
          let diff = Math.abs(err);
          if (diff >= 0 && diff < 10.0) {
            // this is a good result
            //console.log("very good");
            score += 1;
          } else if (diff >= 10 && diff < 20) {
            // terrible attempt
            //console.log("alright");
            score += 0.5;
          }
          // other cases, just don't increment score at all
          // errorsArr contains the abs difference, might be useful later
          errorsArr.push(err);
        }
        // }

        // set flagged points based on error
        setFlaggedPoints(errorsArr);

        giveFeedback(anglesArr);

        // display score to user (overall accuracy estimate)
        finalScore = (score / anglesArr.length) * 100;
        finalScore = Math.round(finalScore * 10) / 10;
        // if(finalScore<30)
        // finalScore+=40;
        $(".accuracy").text(finalScore + " %");
      }
    }

    function setFlaggedPoints(errArray) {
      // clear the flagged array before starting
      flagged.splice(0, flagged.length);

      let arr = [];

      for (var i = 0; i < errArray.length; i++) {
        if (errArray[i] > 10) {
          // these are angles that aren't correct
          // need to improve current method
          switch (i) {
            case 0:
              arr = [13, 15, 11, 1];
              break;
            case 1:
              arr = [14, 16, 12, 1];
              break;
            case 2:
              arr = [11, 13, 5, 1];
              break;
            case 3:
              arr = [12, 14, 6, 1];
              break;
            case 4:
              arr = [5, 7, 11, 1];
              break;
            case 5:
              arr = [6, 8, 12, 1];
              break;
            case 6:
              arr = [7, 5, 9, 1];
              break;
            case 7:
              arr = [8, 6, 10, 1];
              break;
            case 8:
              arr = [5, 15, 9, 0];
              break;
            case 9:
              arr = [6, 16, 10, 0];
              break;
            case 10:
              arr = [5, 13, 9, 0];
              break;
            case 11:
              arr = [6, 14, 10, 0];
              break;
            case 12:
              arr = [5, 11, 9, 0];
              break;
            case 13:
              arr = [6, 12, 10, 0];
              break;
            default:
              console.log("Should not come here");
          }
          flagged.push(arr);
        }
      }
    }

    function giveFeedback(anglesArr) {
      // refer to this
      // [lKnee_lAnkle_lHip, rKnee_rAnkle_rHip, lHip_lKnee_lShoulder, rHip_rKnee_rShoulder, lShoulder_lHip_lElbow, rShoulder_rHip_rElbow,
      // lElbow_lShoulder_lWrist, rElbow_rShoulder_rWrist, lShoulder_lAnkle_lWrist, rShoulder_rAnkle_rWrist, lShoulder_lKnee_lWrist,
      // rShoulder_rKnee_rWrist, lShoulder_lHip_lWrist, rShoulder_rHip_rWrist]
      console.log(anglesArr.length);
      for (var i = 0; i < anglesArr.length; i += 2) {
        $("#left-" + i.toString()).text("∠ " + anglesArr[i]);
        $("#right-" + (i + 1).toString()).text("∠ " + anglesArr[i + 1]);
      }
    }

    function gotResult(error, results) {
      // will compare based on the pose that the user selects, and the pose that the machine learning model returns
      if (results[0].confidence > 0.75) {
        label = results[0].label;
        if (label === currentPose) {
          poseResult = currentPose;
        } else {
          poseResult = "";
        }
      }
      // after first classification, you want to keep classifying for new poses
      classifyPose();
    }

    function gotPoses(poses) {
      console.log(poses);
      if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
      }
    }

    function modelLoaded() {
      console.log("poseNet ready");
    }

    function drawPose() {
      for (let i = 5; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        p5.fill(255);
        p5.ellipse(x, y, 16, 16);
      }
      // console.log("skeleton length: " + skeleton.length);
      //sketch original results without any indicators
      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0]; //skeleton is a 2D array, the second dimension holds the 2 locations that are connected on the keypoint
        let b = skeleton[i][1];
        p5.stroke(255);
        p5.strokeWeight(10);
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
      // overwrite the lines that are flagged as error
      for (let i = 0; i < flagged.length; i++) {
        if (flagged[i][3] === 1) {
          let idx1 = flagged[i][0];
          let idx2 = flagged[i][1];
          let idx3 = flagged[i][2];

          let x1 = pose.keypoints[idx1].position.x;
          let y1 = pose.keypoints[idx1].position.y;

          let x2 = pose.keypoints[idx2].position.x;
          let y2 = pose.keypoints[idx2].position.y;

          let x3 = pose.keypoints[idx3].position.x;
          let y3 = pose.keypoints[idx3].position.y;

          p5.strokeWeight(10);
          p5.stroke(255, 0, 0);
          p5.line(x1, y1, x2, y2);
          p5.line(x1, y1, x3, y3);
        }
      }
    }

    function draw() {
      p5.push();
      p5.translate(video.width, 0);
      p5.scale(-1, 1);
      p5.image(video, 0, 0, video.width, video.height);
      if (pose) {
        let status = $("#time-remaining").text();
        if (sessionTimer == true && status !== finishedStatus) {
          p5.drawPose();
        }
      }
      p5.pop();
      p5.fill(255);
      p5.textSize(64);
      p5.textAlign(p5.CENTER, p5.TOP);
      p5.text(poseResult, 0, 12, p5.width);
    }
  };

  componentDidMount() {
    this.jQueryCode();
  }
  render() {
    return (
      <div>
        
        <div class="yoga-header">
          <h1>Yoga Session</h1>

          <h2>Press start to begin yoga session</h2>
        </div>

        <div class="grid-container">
          <div class="sketch-holder" id="sketch-holder"></div>
          <div class="trainer" id="trainer">
            <div>
              <h1 id="time-remaining">Starting in: 5s</h1>
            </div>
            <div>
              <h2>Reference Yoga Trainer:</h2>
            </div>
            <div class="trainer-model">
              <img class="trainer-img" src="" />
            </div>
          </div>
          <div class="feedback" id="feedback">
            <h2 class="feedback-header">Feedback for user:</h2>
            <h3 class="score">User Pose Accuracy:</h3>
            <p class="accuracy">0 %</p>
            <p class="feedback-description">Individual Calculated Angles</p>
            <table>
              <tr>
                <th>Targetted Joints</th>
                <th>Angle formed by left joints</th>
                <th>Angle formed by right joints</th>
              </tr>
              <tr>
                <td>Knee, Ankle, Hip</td>
                <td id="left-0">∠ 0</td>
                <td id="right-1">∠ 0</td>
              </tr>
              <tr>
                <td>Hip, Knee, Shoulder</td>
                <td id="left-2">∠ 0</td>
                <td id="right-3">∠ 0</td>
              </tr>
              <tr>
                <td>Shoulder, Hip, Elbow</td>
                <td id="left-4">∠ 0</td>
                <td id="right-5">∠ 0</td>
              </tr>
              <tr>
                <td>Elbow, Shoulder, Wrist</td>
                <td id="left-6">∠ 0</td>
                <td id="right-7">∠ 0</td>
              </tr>
              <tr>
                <td>Shoulder, Ankle, Wrist</td>
                <td id="left-8">∠ 0</td>
                <td id="right-9">∠ 0</td>
              </tr>
              <tr>
                <td>Shoulder, Knee, Wrist</td>
                <td id="left-10">∠ 0</td>
                <td id="right-11">∠ 0</td>
              </tr>
              <tr>
                <td>Shoulder, Hip, Wrist</td>
                <td id="left-12">∠ 0</td>
                <td id="right-13">∠ 0</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="homepage-btn">
          <a href="#" class="button" id="start-btn">
            Start
          </a>

          <a href="pickPose.html" class="button">
            Back
          </a>
        </div>
      </div>
    );
  }
}
