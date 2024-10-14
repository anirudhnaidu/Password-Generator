import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)

//Password generator
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+= "0123456789"
    if (charAllowed) str+= "!@#$%^&*_+=[]{}`~"

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)

    }

    setpassword(pass)

  }, [length, numberAllowed, charAllowed, setpassword])

  //copying the password to the clipboard through the button
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(()=>{passwordGenerator()},[length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 pb-5 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3 pt-4'>Password Generator</h1> 
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password} 
        className='outline-none w-full py-1 px-3' 
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button 
         onClick={copyPasswordToClipboard}
         className='outline-none bg-green-500 text-white px-3 py-0.5 shrink-0 hover:bg-lime-400'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2 justify-evenly'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{ setnumberAllowed((prev)=> !prev)}} />
          <label htmlFor='numberInput'> Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={charAllowed}
          id='characterInput'
          onChange={()=>{setcharAllowed((prev)=> !prev)}} />
          <label htmlFor="characterInput"> SpecialCharacters</label>
        </div>
      </div>
    </div>
   </>
  )
}

export default App
