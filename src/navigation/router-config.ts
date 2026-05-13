/**
 * @file router-config.ts
 * @description Cấu hình Router tinh giản bao gồm HomeScreen và các trang khác.
 */
// HomeScreen giữ nguyên file nhưng không dùng trong router hiện tại
// import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen'; // Giữ nguyên, không xóa
import DeepLinkHomeScreen from '../screens/DeepLinkHomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ApiScreen from '../screens/ApiScreen';
import SwitchAppScreen from '../screens/SwitchAppScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen'; // giữ nguyên file
import LayoutTestScreen from '../screens/LayoutTestScreen';
import HeaderTestScreen from '../screens/HeaderTestScreen';
import ImmersiveTestScreen from '../screens/ImmersiveTestScreen';
import BottomActionTestScreen from '../screens/BottomActionTestScreen';
import React from 'react';

export type AnimationType = 'none' | 'slide_left' | 'slide_up' | 'fade_in';

/** Cấu hình cho AppBar Native */
export interface INativeAppBar {
  type: 'native';
  title: string;
  backIcon?: 'arrow' | 'none';
  backgroundColor?: string;
  textColor?: string;
}

/** Cấu hình cho AppBar Custom */
export interface ICustomAppBar {
  type: 'custom';
  Component?: React.ComponentType<any>;
}

export type AppBarConfig = INativeAppBar | ICustomAppBar;

export interface IRouterPageConfig {
  pathname: string;
  Component: React.ComponentType<any>;
  animation: AnimationType;
  appBar: AppBarConfig;
  showAppBar?: boolean;
  showBottomNav?: boolean;
}

export interface IRouterConfig {
  pages: IRouterPageConfig[];
  bottomTabBar: {
    items: { id: string; name: string; path: string; icon: string }[];
  };
}

export const getRouterConfig = (): IRouterConfig => ({
  pages: [
    {
      pathname: '/',
      Component: DeepLinkHomeScreen, // OverviewScreen cũ vẫn giữ nguyên
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },

    {
      pathname: '/api',
      Component: ApiScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/switch-app',
      Component: SwitchAppScreen,
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/about',
      Component: AboutScreen,
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/account',
      Component: AccountScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/login',
      Component: LoginScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false,
      showBottomNav: false
    },
    {
      pathname: '/layout-test',
      Component: LayoutTestScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Kiểm tra Layout' },
      showAppBar: false
    },
    {
      pathname: '/test-immersive',
      Component: ImmersiveTestScreen,
      animation: 'slide_up',
      appBar: { type: 'custom' },
      showAppBar: false,
      showBottomNav: false
    },
    {
      pathname: '/test-bottom',
      Component: BottomActionTestScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Test Bottom Area' },
      showAppBar: true,
      showBottomNav: false
    },
    {
      pathname: '/test-header',
      Component: HeaderTestScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Biến CSS Safe Area' },
      showAppBar: false,
      showBottomNav: false
    },
  ],
  bottomTabBar: {
    items: [
      { id: 'overview', name: 'Trang chủ', path: '/', icon: 'home' },
      { id: 'api', name: 'API', path: '/api', icon: 'code' },
      { id: 'about', name: 'Giới thiệu', path: '/about', icon: 'circle-info' },
      { id: 'account', name: 'Tài khoản', path: '/account', icon: 'user' },
    ]
  }
});
