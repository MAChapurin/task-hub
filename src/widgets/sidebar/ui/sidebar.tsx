'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';

import Link from 'next/link';

import { MAIN_MENU } from '../config';
import { ProjectWithParticipants } from '@/entities/project/domain';
import { PATHNAMES } from '@/shared/constants/pathnames';

export function AppSidebar({
  accountSlot,
  projects,
}: {
  accountSlot: React.ReactNode;
  projects: ProjectWithParticipants[] | null;
}) {
  return (
    <Sidebar>
      <SidebarContent>
        {accountSlot}
        <SidebarGroup>
          <SidebarGroupLabel>Основное меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_MENU.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Проекты</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={PATHNAMES.DASHBOARD + '/' + item.id}>
                      <span>
                        {item.icon} {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
