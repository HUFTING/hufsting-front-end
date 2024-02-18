import useUserDataStore from '@/store/user';
import Link from 'next/link';
import styled from 'styled-components';

interface ApplyListProps {
  lists: Array<{
    matchingRequestId: number;
    matchingRequestTitle: string;
  }>;
  pathnameProp?: string;
  representativeEmail: string;
  matchingStatus: string;
}
const ApplyList = ({
  lists,
  pathnameProp,
  representativeEmail,
  matchingStatus,
}: ApplyListProps) => {
  const userData = useUserDataStore(state => state.userData);
  return (
    lists?.length > 0 && (
      <Container>
        {lists.map((item, index) => (
          <div key={item.matchingRequestId}>
            {representativeEmail === userData.email &&
            matchingStatus === '매칭 대기' ? (
              <Link
                href={{
                  pathname: pathnameProp,
                  query: { id: item.matchingRequestId },
                }}
              >
                <p className="link">{item.matchingRequestTitle}</p>
              </Link>
            ) : (
              <p className="none">{item.matchingRequestTitle}</p>
            )}
          </div>
        ))}
      </Container>
    )
  );
};

export default ApplyList;

const Container = styled.div`
  .link {
    font-size: 15px;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .none {
    font-size: 15px;
    color: gray;
  }
`;
