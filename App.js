import React, { useState, useEffect } from 'react'
import './App.css';
import {SearchOptionValues,ContractOptionValues,countries} from './Constants/Constant'

function App() {
    const [data, setData] = useState({
      employeeName:"",
      description:"",
      employeeType:"FUll_TIME",
      term:"",
      country:"United States of America"
    });
    
    const [termData, setTermData]= useState()
    const [errorFlag, setErrorFlag]= useState(0)
    const toggleData= Object.keys(SearchOptionValues) 

    const mySubmitHandler = (event) => {
        event.preventDefault();
        if (validateForm()) {
            setErrorFlag(0)
            alert("Form has been submitted successfully.Please check console for output")
            console.log(JSON.stringify(data))
        }
    }

    const validateForm=()=>{
      let result= true
      let empName = data.employeeName?data.employeeName:""
      let country = data.country?data.country:""
      
      if(empName ===""){
        setErrorFlag(1)
        result=false;
      }
      if(country ==="" || !countries.includes(country)){
        setErrorFlag(2)
        result=false;
      }
      return result
    }

    const myChangeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        setData(data => ({
            ...data,
            [nam]:val
            }
        ))
    }

    const handleRadioChange= (event) =>{
      var selectedOption = ""
      if (event.target.childNodes[0]) {
          selectedOption = event.target.childNodes[0].value
      }
      else {
          selectedOption = event.target.value
      }
      

      if(selectedOption !=="FUll_TIME"){
        setTermData(ContractOptionValues[selectedOption])
      }
      
      setData(data => ({
        ...data,
       employeeType:selectedOption,
       term:selectedOption !=="FUll_TIME"?ContractOptionValues[selectedOption][0].value:""
      }
    ))
      
      myChangeHandler(event)
  }


    return (
            <React.Fragment>
                <form  id="myForm" onSubmit={mySubmitHandler}>
                    <div className="container">   
                        <label> Name: </label>   
                        <input type="text" name="employeeName" size="15"  onChange={myChangeHandler}/>
                        {errorFlag===1 &&
                            <p style={{ marginTop: "4px" }} className="alertMsg">* Please Enter Name</p>
                        }
                        Description:
                        <textarea  name="description" cols="80" rows="5" onChange={myChangeHandler}/>
                        
                        <div>
                            <label>   
                                Employee Type:
                            </label><br/> 
                            {toggleData.map((item, index) => (
                                <span key={index} onClick={handleRadioChange}>
                                    <input name="employeeType" id={SearchOptionValues[item]} value={SearchOptionValues[item]}
                                        checked={data.employeeType === SearchOptionValues[item]}
                                        type="radio" readOnly
                                    />{item}
                                </span>
                                ))
                            }
                        </div>
                        <div>
                            {data.employeeType ==="PART_TIME" &&
                                <div>
                                <label>Contract Hours: </label>
                                    <select name="term" id="term" onChange={myChangeHandler}>
                                        {termData.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.value}</option>
                                        })}
                                    </select>
                                </div>
                            }
                            {data.employeeType ==="CONSULTANT" &&
                                <div>
                                <label>Contract Hours: </label>
                                    <select name="term" id="term" onChange={myChangeHandler}>
                                        {termData.map((item, index) => {
                                            return <option key={index} value={item.id}>{item.value}</option>
                                        })}
                                    </select>
                                </div>
                            }
                        </div>  
                    
                        <div>  
                            <label>   
                                Country :  
                            </label>
                            <input list="europe-countries" onChange={myChangeHandler} value ={data.country} name="country"/>
                                <datalist id="europe-countries">
                                    {countries.map((item, index) => {
                                            return <option key={index}>{item}</option>
                                    })}
                                </datalist>
                        </div>
                        {errorFlag===2 &&
                            <p style={{ marginTop: "4px" }} className="alertMsg">* Please select valid country</p>
                        }
                        <input type="submit" className="registerbtn"/>
                    </div>
                </form>
        </React.Fragment>
    )
}

export default App;
