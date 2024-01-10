import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Component, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./mainui.css";

export default function MainUI() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [jsonData, setJsonData] = useState(null);

    const [showTable, setShowTable] = useState(false);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = JSON.parse(e.target.result);
                    console.log(JSON.parse(e.target.result));
                    const products = content.products;
                    console.log(products);

                    if (products && Object.keys(products).length > 0) {
                        const dataArrays = Object.values(products);
                        const dataArray = dataArrays.sort((a, b) => b.popularity - a.popularity);
                        setJsonData(dataArray);
                    } else {
                        console.error('Invalid JSON format: Missing or empty "products" field.');
                    }
                } catch (error) {
                    console.error('Error parsing JSON file:', error);
                }
            };

            reader.readAsText(file);
            // console.log(jsonData);
        }
    };

    const initialAvailableFields = ["Subcategory", "Title", "Price", "Popularity"];
    const [availableFields, setAvailableFields] = useState(initialAvailableFields);
    const [selectedFields, setSelectedFields] = useState([]);

    const handleAddField = () => {
        if (availableFields.length > 0) {
            const fieldToAdd = availableFields[0];
            const updatedAvailableFields = availableFields.slice(1);
            setSelectedFields([...selectedFields, fieldToAdd]);
            setAvailableFields(updatedAvailableFields);
        }
    };

    const handleRemoveField = () => {
        if (selectedFields.length > 0) {
            const removedField = selectedFields[selectedFields.length - 1];
            const updatedSelectedFields = selectedFields.slice(0, -1);
            setAvailableFields([...availableFields, removedField]);
            setSelectedFields(updatedSelectedFields);
        }
    };

    // const filterData = () => {
    //     const filteredData = jsonData.map(item => {
    //       const filteredItem = {};
    //       selectedFields.forEach(field => {
    //         if (item.hasOwnProperty(field)) {
    //           filteredItem[field] = item[field];
    //         }
    //       });
    //       return filteredItem;
    //     });
    //     return filteredData;
    // };

    // const handleNextClick = () => {
    //     if (jsonData) {
    //         const filteredData = filterData();
    //         console.log(filteredData);
    //         // history.push('/table-page', { filteredData: filteredData });
    //     }
    // };

    // const handleNextClick = () => {
    //     if (jsonData && selectedFields.length > 0) {
    //         const filteredData = jsonData.map(item => {
    //           const filteredItem = {};
    //           selectedFields.forEach(field => {
    //             if (item.hasOwnProperty(field)) {
    //               filteredItem[field] = item[field];
    //             }
    //           });
    //           return filteredItem;
    //         });

    //         history.push('/table-page', { filteredData });
    //     } else {
    //         console.error('No data or selected fields to filter.');
    //     }
    // };

    const handleNextClick = () => {
        if (jsonData && selectedFields.length > 0) {
            setShowTable(true); // Set showTable state to true to display the table
        } else {
            console.error('No data or selected fields to filter.');
        }
    };

    // 666666666666666666666666666666666666666666

    const TablePage = ({ jsonData, selectedFields }) => {

        // const filteredData = jsonData;
        // jsonData.map(key => {
        //     selectedFields.forEach(element => {
        //         let e = element.toLowerCase();
        //         console.log('key.e', key[e]);
        //      });
        // });

        // Object.keys(jsonData).map(key => (

        //     selectedFields.map(field => (

        //         console.log(key[field.toLowerCase()])

        //     ))

        // ))

        return (
            <div>
                <h2>Table Page</h2>
                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        border: '1px solid #013220',
                        margin: '20px 0',
                        backgroundColor: '#fff',
                    }}
                >
                    <thead>
                        <tr>
                            {/* Render table header based on selected fields */}
                            {selectedFields.map(field => (
                                <th
                                    key={field}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        backgroundColor: '#fff',
                                        color: '#013220',
                                    }}
                                >
                                    {field}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>

                        {jsonData.map((keys) => (
                            <tr key={keys}>
                                {selectedFields.map((field) => {
                                    const lowercaseField = field.toLowerCase();
                                    return <td key={field} style={{
                                        border: '1px solid #ddd',
                                        padding: '10px',
                                        backgroundColor: '#fff',
                                    }} >{keys[lowercaseField]}</td>;
                                })}
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        );

    };


    // 666666666666666666666666666666666666666666

    return (
        <div className='outmost'>
            <h1>Import Products</h1>
            <div className='upper-division'>
                <div className='upper-left'>
                    <div className='first-column-first-div'>
                        <h3>Step 1:</h3>
                    </div>
                    <div className='first-column-sec-div'>
                        <p>Select File</p>
                        <input type="file" onChange={handleFileChange} />
                        {selectedFile && (
                            <div>
                                <p>Selected File: {selectedFile.name}</p>
                                <p>File Size: {selectedFile.size} bytes</p>
                                <p>File Type: {selectedFile.type}</p>
                            </div>
                        )}
                        <p>Supported File Type(s): CSV, JSON</p>
                    </div>

                </div>
                <div className='upper-right'>
                    <div className='sec-column-first-div'>
                        <h3>Step 2:</h3>
                    </div>
                    <div className='sec-column-sec-div'>
                        <p>Choose File Format</p>
                        <div>
                            <label htmlFor="fileType">File Type:</label>
                            <select id="fileType">
                                <option value="csv">CSV</option>
                                <option value="txt">JSON</option>
                                {/* Add other file types as options */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="charEncoding">Character Encoding:</label>
                            <select id="charEncoding">
                                <option value="utf-8">UTF-8</option>
                                <option value="utf-16">UTF-16</option>
                                {/* Add other character encodings as options */}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="delimiter">Delimiter:</label>
                            {/* <input type="text" id="delimiter" /> */}
                            <select id="delimiter">
                                <option value="utf-8">comma</option>
                            </select>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox" id="hasHeading" />
                                Has Heading
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lower-division'>
                <div className='third-column-first-div'>
                    <h3>Step 3:</h3>
                </div>
                <div className='third-column-sec-div'>
                    <p>Display Handling</p>
                    <p>Select the fields to be displayed:</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: '-webkit-fill-available' }}>
                        <div style={{ width: '45%' }}>
                            <p>Available Fields</p>
                            <select id="availableFields" size="5" style={{ width: '100%' }}>
                                {availableFields.map((field, index) => (
                                    <option key={index} value={field}>{field}</option>
                                ))}
                            </select>
                        </div>
                        <div className='button-step3' style={{ textAlign: 'center' }}>
                            <button onClick={handleAddField} style={{ margin: '0 10px' }}>&gt;&gt;</button>
                            <button onClick={handleRemoveField}>&lt;&lt;</button>
                        </div>
                        <div style={{ width: '45%' }}>
                            <p>Fields to be Displayed</p>
                            <select id="selectedFields" size="5" style={{ width: '100%' }}>
                                {selectedFields.map((field, index) => (
                                    <option key={index} value={field}>{field}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* <div style={{ textAlign: 'center' }}>
                        <button onClick={handleAddField} style={{ margin: '0 10px' }}>&gt;&gt;</button>
                        <button onClick={handleRemoveField}>&lt;&lt;</button>
                    </div> */}

                </div>
            </div>
            <div className='action'>
                <button className='actionButton' onClick={handleNextClick}>Next</button>
                <button className='actionButton cancel'>Cancel</button>
            </div>

            {showTable && (
                <TablePage jsonData={jsonData} selectedFields={selectedFields} />
            )}

        </div>
    );
}
