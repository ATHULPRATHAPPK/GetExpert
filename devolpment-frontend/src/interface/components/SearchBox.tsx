import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  style: {
    marginRight: string;
}
  onSearch?: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder = "Search...", className, onSearch }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSearch) {
      onSearch(inputValue);
    }
  };

  return (
    <div className={`flex items-center border border-gray-300 rounded-full shadow-md ${className}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full py-2 px-4 rounded-l-full border-none outline-none"
      />
      <button 
        onClick={handleSearchClick} 
        className="bg-white w-20 hover:bg-orange-400  hover:text-white  text-orange-500 rounded-r-full p-3"
      >
        <FaSearch  size={16} />
      </button>
    </div>
  );
};

export default SearchBox;
