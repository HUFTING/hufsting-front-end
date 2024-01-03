import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface SelectedFilters {
  count: string;
  gender: string;
  sorting: string;
}

interface FilterProps {
  onFilterChange: (selectedFilters: SelectedFilters) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    count: '',
    gender: '',
    sorting: '',
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <Container>
      <div>
        <DropdownFilter
          label="인원"
          options={['1명', '2명', '3명', '4명']}
          selectedOption={selectedFilters.count}
          onOptionSelect={value => {
            handleFilterChange('count', value);
          }}
        />
        <DropdownFilter
          label="성별"
          options={['남', '여']}
          selectedOption={selectedFilters.gender}
          onOptionSelect={value => {
            handleFilterChange('gender', value);
          }}
        />
        <DropdownFilter
          label="정렬"
          options={['최신순', '매칭 대기중']}
          selectedOption={selectedFilters.sorting}
          onOptionSelect={value => {
            handleFilterChange('sorting', value);
          }}
        />
      </div>
      <FilteringIcon>⚙️</FilteringIcon>
    </Container>
  );
};

interface DropdownFilterProps {
  label: string;
  options: string[];
  selectedOption: string;
  onOptionSelect: (value: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <DropdownContainer>
      <DropdownLabel
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        {selectedOption !== '' ? `${selectedOption}` : label}
        <DropdownIcon>{isDropdownOpen ? '▲' : '▼'}</DropdownIcon>
      </DropdownLabel>
      {isDropdownOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem
              key={option}
              onClick={() => {
                onOptionSelect(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px 0 18px;
  width: 100%;
  height: 57px;
  background-color: #f9f9fb;
  div {
    display: flex;
  }
`;

const FilteringIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 0.5px solid #a3b6cc;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-right: 16px;
`;

const DropdownLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 13px;
  height: 34px;
  border-radius: 15px;
  border: 1px solid black;
  cursor: pointer;
`;

const DropdownIcon = styled.div`
  margin-left: 5px;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 5px 0;
  background-color: white;
  border-top: none;
  border-radius: 0 0 15px 15px;
  list-style: none;
  z-index: 999;
`;

const DropdownItem = styled.li`
  padding: 8px 13px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

export default Filter;
