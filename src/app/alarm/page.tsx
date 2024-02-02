import AlarmSelectMenuList from '@/components/alarm/AlarmSelectMenuList';
import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';

const AlarmPage = () => (
  <>
    <MainHeader />
    <SubHeader title="알림" />
    <AlarmSelectMenuList />
  </>
);
export default AlarmPage;
