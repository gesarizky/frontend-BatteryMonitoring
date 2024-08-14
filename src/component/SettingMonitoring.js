import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "./../App.css";
import { monitoringBackEnd } from "../api/axios";

function SettingMonitoring() {
  const [frame, setFrame] = useState([]);
  const settingTableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await monitoringBackEnd.get("/api/setting/Talis", {
          timeout: 1000,
        });
        const { data } = res.data;
        setFrame(data);
      } catch (error) {
        console.log("error fetching data:", error);
      }
    };
    fetchData();
    if (frame.length > 0) {
      $(settingTableRef.current).DataTable();
    }
      const typeSelect = document.getElementById("type");
      const portInput = document.getElementById("port");
      const deviceIpInput = document.getElementById("device_ip");

      const handleTypeChange = () => {
        if (typeSelect.value === "tcp") {
          portInput.value = "502";
          portInput.setAttribute("readonly", true);
          deviceIpInput.removeAttribute("readonly");
        } else if (typeSelect.value === "serial") {
          portInput.removeAttribute("readonly");
          deviceIpInput.value = "";
          deviceIpInput.setAttribute("readonly", true);
        } else {
          portInput.removeAttribute("readonly");
          deviceIpInput.removeAttribute("readonly");
        }
      };

      typeSelect.addEventListener("change", handleTypeChange);

      // Cleanup function
      return () => {
        typeSelect.removeEventListener("change", handleTypeChange);
      };
    
  }, [frame]);

  // start delete
  const deleteTalis = async (talisid) => {
    console.log(`${talisid} deleted`);
    try {
      const payload = {
        talis_id: `${talisid}`,
      };
      const res = await monitoringBackEnd.delete("/api/setting/deleteTalis", {
        headers: {
          "Content-Type": "application/json",
        },
        data: payload, // Send the payload in the data field
        timeout: 1000,
      });
      const resStatus = await res.data.status;
      const resMessage = await res.data.message;
      console.log("status : " + resStatus);
      console.log("resMessage : " + resMessage);
      if (resStatus === "Ok") {
        // Remove the deleted item from the frame state
        setFrame((prevFrame) =>
          prevFrame.filter((item) => item.talis_id !== talisid)
        );
      }
    } catch (error) {
      console.log("error delete talis:", error);
    }
  };
  // end delete

  // start add talis
  const addTalis = async () => {
    try {
      const docTalisid = document.getElementById("talis_id").value;
      const docPort = document.getElementById("port").value;
      const docDeviceip = document.getElementById("device_ip").value;
      const docSlaves = document.getElementById("slaves").value.trim();
      const docType = document.getElementById("type").value;
      let slaveResult = [];
      if (docSlaves.includes("-")) {
        const ranges = docSlaves.split(",");
        ranges.forEach((range) => {
          if (range.includes("-")) {
            const [start, end] = range.split("-");
            const startNum = parseInt(start);
            const endNum = parseInt(end);

            if (!isNaN(startNum) && !isNaN(endNum)) {
              for (let i = startNum; i <= endNum; i++) {
                if (!slaveResult.includes(i)) {
                  slaveResult.push(i);
                }
              }
            }
          } else {
            const singleNum = parseInt(range.trim());
            if (!isNaN(singleNum) && !slaveResult.includes(singleNum)) {
              slaveResult.push(singleNum);
            }
          }
        });
      } else {
        // Check if the input contains individual slaveResult separated by commas
        const nums = docSlaves.split(",");
        nums.forEach((num) => {
          const parsedNum = parseInt(num.trim());
          if (!isNaN(parsedNum) && !slaveResult.includes(parsedNum)) {
            slaveResult.push(parsedNum);
          }
        });
      }
      // console.log(docTalisid, docPort, docDeviceip, slaveResult, docType);
      const payload = {
        type: docType,
        talis_id: docTalisid,
        device_ip: docDeviceip,
        port: docPort,
        slaves: slaveResult,
      };
      const res = await monitoringBackEnd.post(
        "/api/setting/createTalis",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 1000,
        }
      );

      const resStatus = res.data.status;
      const resMessage = res.data.message;
      console.log("status : " + resStatus);
      console.log("resMessage : " + resMessage);
    } catch (error) {
      console.log("error add talis:", error);
    }
  };
  // end addtalis

  const editTalis = async (talisid) => {
    try {
      const res = await monitoringBackEnd.get(
        `/api/setting/Talis?talis_id=${talisid}`,
        {
          timeout: 1000,
        }
      );
      const { data } = res.data;
      // Automatically fill form fields with fetched data
      document.getElementById("talis_id").value = data.talis_id;
      document.getElementById("port").value = data.port;
      document.getElementById("device_ip").value = data.device_ip;
      document.getElementById("slaves").value = data.slaves.join(",");
      document.getElementById("type").value = data.type;
    } catch (error) {
      console.log("error edit talis:", error);
    }
  };

  return (
    <div className="p-5 bg-light">
      <div className="p-1 bg-white rounded p-4">
        <div className="row">
          <h1 className="text-black fs-4"> Setting Talis 5</h1>
        </div>
        <div className="container mt-5">
          <table
            ref={settingTableRef}
            className="table table-striped"
            style={{ width: "100%" }}
          >
            {/* Table header */}
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Talis ID</th>
                <th scope="col">Port</th>
                <th scope="col">Device IP</th>
                <th scope="col">Slaves</th>
                <th scope="col">Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {frame.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.talis_id}</td>
                  <td>{item.port}</td>
                  <td>{item.device_ip}</td>
                  <td>
                    {Array.isArray(item.slaves)
                      ? item.slaves.join(", ")
                      : item.slaves}
                  </td>
                  <td>{item.type}</td>
                  <td className="table-center">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteTalis(item.talis_id)}
                    >
                      <i className="bi bi-trash"> Delete</i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => editTalis(item.talis_id)}
                    >
                      <i className="bi bi-pencil"> Edit</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ADD SETTING */}
      <div className="p-5 bg-light">
        <div className="p-1 bg-white rounded p-4">
          <div className="row">
            <h1 className="text-black fs-4">Add Talis</h1>
          </div>
          <form onSubmit={addTalis}>
            <div className="row marg-top">
              <div className="col-md-6">
                <label className="form-label">Talis ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="talis_id"
                  id="talis_id"
                  required
                />
              </div>
            </div>

            <div className="row marg-top">
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select className="form-control" id="type" required>
                  <option value="">
                    Select Type
                  </option>
                  <option value="serial">Serial</option>
                  <option value="tcp">TCP/IP</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Port</label>
                <input
                  type="text"
                  className="form-control"
                  id="port"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Device IP</label>
                <input
                  type="text"
                  className="form-control"
                  id="device_ip"
                  pattern="^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"
                  title="Format IP tidak valid. Contoh: 192.168.0.1"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Slaves</label>
                <input
                  type="text"
                  className="form-control"
                  id="slaves"
                  pattern="\b(?:\d+(?:-\d+)?(?:,|$))+\b"
                  title="Slave List should be like 1,2,3,4 or like 1-4"
                  required
                />
              </div>
            </div>
            <div className="row marg-top"></div>
            <div className="row">
              <div className="col-12 button-margin" id="buttonStart">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingMonitoring;
