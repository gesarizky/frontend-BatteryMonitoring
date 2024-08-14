import React, { useState, useEffect } from "react";
import "./../../App.css";
import { instanceBackEnd } from "../../api/axios";

function RectiSetting({ sendDataToParent }) {
  let totalCell;
  let current;
  let minVoltage;
  let maxVoltage;
  let passwordVal;
  let flagValue;
  let lastDataVal;
  // let counterCheck = 0;

  const [pcbBarcode, setPcbBarcode] = useState();
  const [notifMessage, setNotifMessage] = useState();

  useEffect(() => {
    console.log("Component rendered");
    const checkCharge = async () => {
      console.log("check charge");
      try {
        const res = await instanceBackEnd.get("/api/charging/status", {
          timeout: 1000,
        });
        const resStatus = await res.data.status;

        if (resStatus !== "error") {
          console.log("ambildata");
          getChargingData();
        }
      } catch (error) {
        console.log("errorAPI");
      }
    };

    return () => {
      console.log("Component rendered2");
      checkCharge();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartCharging = async () => {
    flagValue = true;
    let notifAlert = document.getElementById("notifAlert");
    notifAlert.style.display = "none";

    checkForm();
  };

  const checkForm = async () => {
    console.log("CheckForm");
    console.log("flagValue : " + flagValue);
    totalCell = document.getElementById("totalCell").value;
    totalCell = parseInt(totalCell);
    current = document.getElementById("currentModul").value;
    current = parseInt(current);
    minVoltage = document.getElementById("minVoltage").value;
    minVoltage = parseInt(minVoltage);
    maxVoltage = document.getElementById("maxVoltage").value;
    maxVoltage = parseInt(maxVoltage);
    passwordVal = document.getElementById("password").value;

    if (!totalCell && !current && !minVoltage && !maxVoltage) {
      console.log("setDefault");
      setDefault();
    } else if (totalCell && current && minVoltage && maxVoltage !== "") {
      console.log("setRecti");
      const valueKey = "setRecti";
      confirmPassword(valueKey);
    } else if (totalCell && minVoltage && maxVoltage !== "") {
      console.log("setVoltage");
      const valueKey = "setVoltage";
      confirmPassword(valueKey);
    } else if (current !== "") {
      console.log("setCurrent");
      const valueKey = "setCurrent";
      confirmPassword(valueKey);
    }
  };

  const confirmPassword = async (valueKey) => {
    if (passwordVal === "sundaya2024") {
      let wrongPass = document.getElementById("wrongPass");
      wrongPass.style.display = "none";

      console.log("passwordCorrect");
      console.log("valueKey : " + valueKey);
      if (valueKey === "setRecti") {
        setRecti();
      } else if (valueKey === "setVoltage") {
        setVoltage();
      } else if (valueKey === "setCurrent") {
        setCurrent();
      }

      console.log("Confirm Pass : " + passwordVal);
    } else {
      console.log("wrongpassword");
      let wrongPass = document.getElementById("wrongPass");

      wrongPass.style.display = "block";
    }
  };

  const setDefault = async () => {
    try {
      // const res = await instanceBackEnd.post("/api/recti/set-default", {
      //   timeout: 1000,
      // });
      const payload = {
        maxVoltageCell: 3650,
        minVoltageCell: 3000,
        totalCell: 16,
        current: 30,
      };

      const res = await instanceBackEnd.post("/api/recti/set-recti", payload, {
        timeout: 1000, // Timeout in milliseconds (adjust as needed)
      });

      const resStatus = await res.data.status;
      const resMessage = await res.data.message;
      console.log("status : " + resStatus);
      console.log("resMessage : " + resMessage);
      if (resStatus === "success" && flagValue === true) {
        setPowerTrue();
      } else if (resStatus === "success" && flagValue === false) {
        console.log("default setting");
      } else {
        console.log("power tidaknyala");
      }
    } catch (error) {
      // Handle timeout error
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry setDefault");
        setDefault();
      } else {
        console.log("Api tidak berjalan");
        console.log("Retry setDefault ERROR:", error.message);
      }
    }
  };

  const setRecti = async () => {
    try {
      const payload = {
        maxVoltageCell: maxVoltage,
        minVoltageCell: minVoltage,
        totalCell: totalCell,
        current: current,
      };

      const res = await instanceBackEnd.post("/api/recti/set-recti", payload, {
        timeout: 1000, // Timeout in milliseconds (adjust as needed)
      });

      const resStatus = res.data.status;
      const resMessage = res.data.message;
      console.log("status : " + resStatus);
      console.log("resMessage : " + resMessage);
      if (resStatus === "success" && flagValue === true) {
        setPowerTrue();
      } else if (resStatus === "success" && flagValue === false) {
        console.log("setRecti setting changed");
      } else {
        console.log("power tidak menyala");
      }
    } catch (error) {
      // Handle timeout error
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry setRecti");
        setRecti();
      } else {
        console.log("Retry setRecti ERROR:", error.message);
      }
    }
  };

  const setVoltage = async () => {
    try {
      const payload = {
        maxVoltageCell: maxVoltage,
        minVoltageCell: minVoltage,
        totalCell: totalCell,
      };

      const res = await instanceBackEnd.post(
        "/api/recti/set-voltage",
        payload,
        {
          timeout: 1000, // Timeout in milliseconds (adjust as needed)
        }
      );
      const resStatus = await res.data.status;
      const resMessage = await res.data.message;
      console.log("status : " + resStatus);
      console.log("resMessage : " + resMessage);
      if (resStatus === "success" && flagValue === true) {
        setPowerTrue();
      } else if (resStatus === "success" && flagValue === false) {
        console.log("setVoltage setting changed");
      } else {
        console.log("power tidak menyala");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry setVoltage");
        setVoltage();
      } else {
        console.log("Retry setVoltage ERROR:", error.message);
      }
    }
  };

  const setCurrent = async () => {
    try {
      const payload = {
        current: current,
      };

      const res = await instanceBackEnd.post(
        "/api/recti/set-current",
        payload,
        {
          timeout: 1000, // Timeout in milliseconds (adjust as needed)
        }
      );
      const resStatus = await res.data.status;
      const resMessage = await res.data.message;
      console.log("status : " + resStatus);
      console.log("resMessage : " + resMessage);
      if (resStatus === "success" && flagValue === true) {
        setPowerTrue();
      } else if (resStatus === "success" && flagValue === false) {
        console.log("setCurrent setting changed");
      } else {
        console.log("power tidak menyala");
      }
    } catch (error) {
      // Handle timeout error
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry setCurrent");
        setCurrent();
      } else {
        console.log("Retry setCurrent ERROR:", error.message);
      }
    }
  };

  const setPowerTrue = async () => {
    try {
      const res = await instanceBackEnd.get("/api/recti/power/true", {
        timeout: 1000, // Timeout in milliseconds (adjust as needed)
      });

      const powerMessage = await res.data.message;
      const powerStatus = await res.data.status;

      if (powerStatus === "success") {
        console.log("powerMessage : " + powerMessage);
        setMasterFrame();
      } else {
        console.log("power tidak menyala");
      }
    } catch (error) {
      // Handle timeout error

      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry setPowerRecti");
        setTimeout(
          await function () {
            setPowerTrue();
          },
          1000
        );
      } else {
        console.log("Retry setPowerRecti ERROR:", error.message);
      }

      console.log("Request timed out2, Retry setPowerRecti");
      setTimeout(
        await function () {
          setPowerTrue();
        },
        1000
      );
    }
  };

  const setMasterFrame = async () => {
    console.log("maasuk master frame");
    try {
      const res = await instanceBackEnd.post("/api/charging/master-frame", {
        timeout: 3000, // Timeout in milliseconds (adjust as needed)
      });

      const frameMessage = await res.data.message[0].message;
      const framePcbBarcode = await res.data.message[0].pcb_barcode;
      console.log("frameMessage : " + frameMessage);
      if (frameMessage === "Frame is already exist") {
        console.log("update mframe, lanjut charge");
        updateFrame1(framePcbBarcode);
      } else {
        console.log("lanjkut charging");
        getChargingData();
      }
    } catch (error) {
      // Handle timeout error
      console.log("masterframe error!");
      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry setMasterFrame");
        setMasterFrame();
      } else {
        console.log(" Retry setMasterFrame ERROR:", error.message);
      }
    }
  };

  const updateFrame1 = async (framePcbBarcode) => {
    console.log("updateframe1");
    try {
      const payload = {
        pcb_barcode: framePcbBarcode,
        charging: true,
      };
      const res = await instanceBackEnd.put(
        "/api/charging/master-frame",
        payload,
        {
          timeout: 1000, // Timeout in milliseconds (adjust as needed)
        }
      );

      const updateMessage = await res.data.message;

      if (updateMessage === "Master frame updated and ready for charging") {
        console.log("updateMessage : " + updateMessage);
        getChargingData();
      }
    } catch (error) {
      // Handle timeout error

      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry updateFrame1");
        updateFrame1(framePcbBarcode);
      } else {
        console.log("Retry updateFrame1 ERROR:", error.message);
      }
    }
  };

  const getChargingData = async () => {
    try {
      const res = await instanceBackEnd.get("api/charging/data", {
        timeout: 1000, // Timeout in milliseconds (adjust as needed)
      });

      // const dataCharging = await res.data.status;
      const dataFrame = await res.data;
      const pcb_barcode = await res.data.data[0].pcb_barcode;
      const dataCharging = await res.data.data[0].charging;
      const battStatus = await res.data.data[0].battery_status;
      const tempStatus = await res.data.data[0].temperature_status;
      const resStatus = await res.data.status;

      setPcbBarcode(pcb_barcode);

      console.log("pcb_barcode : " + pcb_barcode);
      console.log("dataCharging : " + dataCharging);
      console.log("battStatus : " + battStatus);
      console.log("tempStatus : " + tempStatus);
      console.log("dataFrame : " + dataFrame);
      console.log("resStatus : " + resStatus);

      if (resStatus === "success" && dataCharging === true) {
        if (battStatus === "low_battery" && tempStatus === "normal") {
          let buttonProcess = document.getElementById("buttonProcess");
          let buttonStart = document.getElementById("buttonStart");
          lastDataVal = await res.data.data[0];

          buttonProcess.style.display = "block";
          buttonStart.style.display = "none";

          sendDataToParent(dataFrame);

          console.log("lastDataVal : " + lastDataVal);
          // console.log("lastData : " + lastData);

          setTimeout(
            await function () {
              getChargingData();
            },
            1000
          );
        } else if (battStatus === "fully_charged" && tempStatus === "normal") {
          const notif = "Charging has stopped : " + battStatus;
          setNotifMessage(notif);
          console.log("Res Message : " + battStatus);
          updateHistory();
        } else if (
          battStatus === "low_battery" &&
          tempStatus === "high_temperture"
        ) {
          const notif = "Charging has stopped : " + tempStatus;
          setNotifMessage(notif);
          console.log("Res Message : " + tempStatus);
          updateHistory();
        } else if (
          battStatus === "fully_charged" &&
          tempStatus === "high_temperture"
        ) {
          const notif = "Charging has stopped : " + tempStatus;
          setNotifMessage(notif);
          console.log("Res Message : " + tempStatus);
          updateHistory();
        } else {
          const notif = "Charging has stopped : Tidak Teridentifikasi";
          setNotifMessage(notif);
          updateHistory();
        }
      } else if (resStatus === "success" && dataCharging === false) {
        console.log("data false : " + lastDataVal.pcb_barcode);
        const dataStop = {
          statusCode: 200,
          status: "stop",
          data: [
            {
              pcb_barcode: lastDataVal.pcb_barcode,
              sn_code_1: lastDataVal.sn_code_1,
              sn_code_2: lastDataVal.sn_code_2,
              charging: dataCharging,
              voltage: lastDataVal.voltage,
              current: lastDataVal.current,
              soc: lastDataVal.soc,
              temperature: lastDataVal.temperature,
              time_estiminate: lastDataVal.time_estiminate,
            },
          ],
        };
        sendDataToParent(dataStop);
      }
    } catch (error) {
      // Handle timeout error

      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry getChargingData");
        setTimeout(
          await function () {
            getChargingData();
          },
          1000
        );
      } else {
        console.log("getChargingData ERROR, RETRY PROCESS...");
        setTimeout(
          await function () {
            getChargingData();
          },
          1000
        );
      }
    }
  };

  const handleStopCharging = () => {
    console.log("Stop Charge");

    const notif = "Charging has stopped : Manual Stop [ " + pcbBarcode + " ]";
    setNotifMessage(notif);
    updateHistory();
  };

  // const stopCharging = async () => {
  //   try {
  //     console.log("stop charging pcb : " + pcbBarcode);
  //     const payload = {
  //       pcb_barcode: pcbBarcode,
  //       charging: false,
  //     };
  //     const res = await instanceBackEnd.put(
  //       "/api/charging/master-frame",
  //       payload
  //     );

  //     const updateMessage = await res.data.message;
  //     console.log("stopCharging : " + updateMessage);

  //     updateHistory();
  //   } catch (error) {
  //     // Handle timeout error

  //     if (error.code === "ECONNABORTED") {
  //       console.log("Request timed out, Retry stopCharging");
  //       stopCharging();
  //     } else {
  //       console.log("Other error occurred:", error.message);
  //     }
  //   }
  // };

  const updateHistory = async () => {
    let notifAlert = document.getElementById("notifAlert");
    notifAlert.style.display = "block";

    const buttonProcess = document.getElementById("buttonProcess");
    const buttonStart = document.getElementById("buttonStart");

    buttonProcess.style.display = "none";
    buttonStart.style.display = "block";

    try {
      const res = await instanceBackEnd.put("/api/charging/frame-history");

      const historyMessage = await res.data.data[0].message;
      console.log("historyMessage : " + historyMessage);
    } catch (error) {
      // Handle timeout error

      if (error.code === "ECONNABORTED") {
        console.log("Request timed out, Retry stopCharging");
        updateHistory();
      } else {
        console.log("Other error occurred:", error.message);
      }
    }
  };

  const handleChangSetting = () => {
    console.log("Change Setting");
    flagValue = false;

    checkForm();
  };

  // Event handler for input change on currentTotal
  const handleCurrentTotalChange = (event) => {
    const currentTotalInput = event.target;
    const totalModulInput = document.getElementById("totalModul");
    const currentModulInput = document.getElementById("currentModul");

    // Parse input values as integers (assuming these are integers)
    const currentTotal = parseInt(currentTotalInput.value) || 0;
    const totalModul = parseInt(totalModulInput.value) || 1; // Ensuring totalModul is not zero to avoid division by zero

    // Calculate currentModul rounded to nearest integer
    let currentModul = Math.round(currentTotal / totalModul);

    // Ensure currentModul is within valid range
    if (currentModul < 0) {
      currentModul = 0;
      currentTotalInput.value = 0;
    } else if (currentTotal >= 99) {
      currentModul = 30;
      currentTotalInput.value = 90;
    }

    // Update the value of currentModul input
    currentModulInput.value = currentModul;
  };

  const handleTotalCell = (event) => {
    const totalCellInput = event.target;
    const totalCellValue = totalCellInput.value;
    if (totalCellValue > 16) {
      totalCellInput.value = 16;
    } else if (totalCellValue <= 0) {
      totalCellInput.value = 16;
    }
  };

  const handleMinVoltage = (event) => {
    const minVoltageInput = event.target;
    const minVoltageValue = minVoltageInput.value;
    if (minVoltageValue > 3000) {
      minVoltageInput.value = 3000;
    } else if (minVoltageValue <= 0) {
      minVoltageInput.value = 3000;
    }
  };

  const handleMaxVoltage = (event) => {
    const maxVoltageInput = event.target;
    const maxVoltageValue = maxVoltageInput.value;
    if (maxVoltageValue > 3600) {
      maxVoltageInput.value = 3600;
    } else if (maxVoltageValue <= 0) {
      maxVoltageInput.value = 3600;
    }
  };

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4">Recti Setting</h1>
        </div>

        {/* body scan */}
        <div className="row marg-top">
          <div className="col-md-6">
            <label className="form-label">Total Cell</label>
            <input
              type="number"
              className="form-control"
              id="totalCell"
              placeholder="Contoh : 16"
              onChange={handleTotalCell}
            />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-4">
                <label className="form-label">Current Total</label>
                <input
                  type="number"
                  className="form-control"
                  id="currentTotal"
                  placeholder="Contoh: 30"
                  onChange={handleCurrentTotalChange}
                />
              </div>

              <div className="col-sm-4">
                <label className="form-label">Total Modul</label>
                <input
                  type="number"
                  className="form-control"
                  id="totalModul"
                  value={3}
                  disabled
                />
              </div>

              <div className="col-sm-4">
                <label className="form-label">Current</label>
                <input
                  type="number"
                  className="form-control"
                  id="currentModul"
                  placeholder="Contoh: 90"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row marg-top">
          <div className="col-md-6">
            <label className="form-label">Min Cell Voltage ( mV )</label>
            <input
              type="number"
              className="form-control"
              id="minVoltage"
              placeholder="Contoh : 3000"
              onChange={handleMinVoltage}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Max Cell Voltage ( mV )</label>
            <input
              type="number"
              className="form-control"
              id="maxVoltage"
              placeholder="Contoh : 3600"
              onChange={handleMaxVoltage}
            />
          </div>
        </div>

        <div className="row marg-top">
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="password" />
            <br />
            <div
              className="alert alert-primary invisible-div"
              role="alert"
              id="wrongPass"
            >
              Wrong Password
            </div>
          </div>
        </div>

        <div className="row marg-top">
          <div className="col-md-12">
            <div
              className="alert alert-success invisible-div"
              role="alert"
              id="notifAlert"
            >
              {notifMessage}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 button-margin" id="buttonStart">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleStartCharging}
            >
              Start Charging
            </button>
          </div>
        </div>

        <div className="row">
          <div className=" invisible-button" id="buttonProcess">
            <div className="col-md-6 button-charge-change">
              <div className="col-12 button-margin">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleChangSetting}
                >
                  Change Setting
                </button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-12 button-margin">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleStopCharging}
                >
                  Stop Charging
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* end body scan */}
      </div>
    </div>
  );
}

export default RectiSetting;
