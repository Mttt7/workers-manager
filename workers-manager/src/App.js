import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useReducer} from 'react'


const ACTIONS = {
  DELETE_WORKER:'delete-worker',
  ADD_WORKER:'add-worker'
}



function reducer(workers, {type,payload}){ //{type, payload} = action
  switch(type){
    case ACTIONS.DELETE_WORKER:
      return workers.filter((w)=> {return w.id!==payload.id})

      case ACTIONS.ADD_WORKER:
        if(payload.inputs.name==='' || payload.inputs.surname==='' || 
            payload.inputs.age==='' || payload.inputs.branch===''  || 
            payload.inputs.workingYears===''){
          return workers
        }
        const newWorker = {
          id: workers.length + 1, //bug
          name:payload.inputs.name,
          surname:payload.inputs.surname,
          age:payload.inputs.age,
          branch:payload.inputs.branch,
          workingYears:payload.inputs.workingYears
        }
        return[
          ...workers,
          newWorker]
        
  }

}




export default function App(){

  const[inputs, setInputs] = useState({
    id:'',
    name:'',
    surname:'',
    age:'',
    branch:'',
    workingYears:''
  })

  const [workers, dispatch] = useReducer(reducer,
    [
      {id:1 ,name:'John', surname:'Smith',age:'56', branch:'IT', workingYears:11},
      {id:2 ,name:'Ann', surname:'Gurt',age:'29', branch:'HR', workingYears:2},
      {id:3 ,name:'Paul', surname:'Paulsen',age:'29', branch:'IT', workingYears:5},
      {id:4 ,name:'Peter', surname:'Lynn',age:'44', branch:'Sales', workingYears:4},
      {id:5 ,name:'Cristine', surname:'Wilson',age:'36', branch:'IT', workingYears:9},
      {id:6 ,name:'Amanda', surname:'Swizzly',age:'28', branch:'HR', workingYears:2},
      {id:7 ,name:'Catrine', surname:'Pitch',age:'26', branch:'Sales', workingYears:1},
      {id:8 ,name:'Leon', surname:'Cruos',age:'62', branch:'Accounts', workingYears:14}
    ]
  )

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:ACTIONS.ADD_WORKER,payload:{inputs}})
  }

  function handleChange(e){
    const name = e.target.name
    const value = e.target.value
    setInputs((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
    
  }

  return(
    <div className='container'>
      <ul>
        {workers.map(w=>{
          return(
          <li key={w.id}> #{w.id} {w.branch} {w.name} {w.surname} age: {w.age},with us for {w.workingYears} y. 
          <button onClick={ () => {dispatch( {type: ACTIONS.DELETE_WORKER,payload:{id:w.id}} )}} className='delete-btn'>DELETE</button>
          </li>
          )
        })}
      </ul>

      <form className='workers-form' onSubmit={(e)=>{handleSubmit(e)}}>
        <div>name:</div>
        <input type="text" value={inputs.name} onChange={handleChange} name="name"></input>
        <div>surname:</div>
        <input type="text" value={inputs.surname} onChange={handleChange} name="surname"></input>
        <div>age:</div>
        <input type="text" value={inputs.age} onChange={handleChange} name="age"></input>
        <div>branch:</div>
        <input type="text" value={inputs.branch} onChange={handleChange} name="branch"></input>
        <div>working for:</div>
        <input type="text" value={inputs.workingYears} onChange={handleChange} name="workingYears"></input>
        <button className='submit-btn' type="submit">ADD</button>
      </form>

    </div>
  )
}