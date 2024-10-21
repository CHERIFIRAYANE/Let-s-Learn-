'use client';

import { Sidebar } from 'flowbite-react';
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
} from 'react-icons/hi';


function SidebarAdmin() {
  return (
    <div className="container  h-full ">
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/course" icon={HiChartPie}>
            Courses
          </Sidebar.Item>
         
          <Sidebar.Item href="/meet" icon={HiInbox}>
            OnlineSessions
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Articles
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Testlevel
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}

export default SidebarAdmin;