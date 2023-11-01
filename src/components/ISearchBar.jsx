/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AiOutlineSearch, AiOutlineClear } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'

const ISearchBar = ({inputText, onInputText, onSearchChange}) => {
  
  return (
    <div className="search-bar">
      <input type="text" placeholder="Type for Search..." 
          value={inputText} 
          onChange={(e) => onInputText(e.target.value)}/>
      <button onClick={onSearchChange} >Search</button>
    </div>
  );
};

export default ISearchBar;