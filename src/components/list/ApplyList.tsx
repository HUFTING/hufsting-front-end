import Link from 'next/link';
import styled from 'styled-components';

interface ApplyListProps {
  lists: Array<{
    matchingRequestId: number;
    matchingRequestTitle: string;
  }>;
  pathnameProp?: string;
}

const ApplyList = ({ lists, pathnameProp }: ApplyListProps) =>
  lists?.length > 0 && (
    <Container>
      {lists.map((item, index) => (
        <Link
          key={item.matchingRequestId}
          href={{
            pathname: pathnameProp,
            query: { id: item.matchingRequestId },
          }}
        >
          <p>{item.matchingRequestTitle}</p>
        </Link>
      ))}
    </Container>
  );

export default ApplyList;

const Container = styled.div`
  p {
    font-size: 15px;
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;
