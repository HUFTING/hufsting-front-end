'use client';

import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationContainer>
      {pages.map(page => (
        <PageNumber
          key={page}
          onClick={() => {
            onPageChange(page);
          }}
          active={page === currentPage}
        >
          {page}
        </PageNumber>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span<{ active: boolean }>`
  margin: 0 5px;
  cursor: pointer;
  color: ${props => (props.active ? 'blue' : 'black')};
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;
