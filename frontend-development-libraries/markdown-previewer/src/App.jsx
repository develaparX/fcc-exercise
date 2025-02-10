import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function App() {
  const [markdown, setMarkdown] = useState("")

  return (
    <>
    <h1 className="mb-5 text-s ">Markdown Previewer FreeCodeCamp React</h1>
     <div className='flex flex-row gap-3'>
      <div className="bg-amber-300 w-2xl h-[70vh] flex items-center justify-center rounded-xl ">
        {/* <textarea value={markdown} onChange={(e) =>setMarkdown(e.target.value)}  className='bg-white w-full h-full text-black p-8 rounded-xl '/> */}
        <ReactQuill className='bg-white w-full h-full text-black rounded-xl overflow-auto' theme="snow" value={markdown} onChange={setMarkdown} />

      </div>
      <div  className='bg-blue-500 w-2xl h-[70vh] flex items-center justify-center rounded-xl ' dangerouslySetInnerHTML={{__html:markdown}}>
       
      </div>
     </div>
    </>
  )
}

export default App
