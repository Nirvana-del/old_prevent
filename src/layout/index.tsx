import type {ProSettings} from '@ant-design/pro-components';
import {PageContainer, ProCard, ProConfigProvider, ProLayout, SettingDrawer,} from '@ant-design/pro-components';
import {Dropdown, MenuProps, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import menuRouter from './components/menuRouter';
import {useNavigate} from "react-router-dom";
import WithLoadingOutlet from "@/components/antd/WithLoadingOutlet";
import {store} from "@/redux";
import {useAuthContext} from "@/components/hooks/useAuthContext";
import {remove_Token} from "@/utils/autoReLogin";
import {
    getThemeStyle,
    removeAdmin_Fm_OldId,
    removeAdmin_FmId,
    removeAdmin_Old_OldId,
    setThemeStyle
} from "@/utils/keep-alive";

const Layout:React.FC =  () => {
    const {userInfo, pathname, changePathname} = useAuthContext()
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(getThemeStyle());
    const [phone, setPhone] = useState('');
    useEffect(() => {
        setPhone(userInfo?.phone!)
    },[])
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate()
    const config = {
        title: '您确定要退出吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
            remove_Token()
            removeAdmin_FmId()
            removeAdmin_Fm_OldId()
            removeAdmin_Old_OldId()
            changePathname('')
            store.dispatch({
                type: 'CHANGE_TAB_PAGE',
                payload: '1'
            })
            store.dispatch({
                type: 'CHANGE_BIND_TYPE',
                payload: 0
            })
            navigate('/login')
        }
    };
    const menu: MenuProps['items'] = [
        {
            key: 'logout',
            icon: <i className="ri-shut-down-line"></i>,
            label: (
                <span onClick={() => {
                    modal.confirm(config)
                }}>退出系统</span>
            )
        },
    ]
    return (
        <div id={'app-layout'} className={'h-screen'}>
            {contextHolder}
            <ProConfigProvider hashed={false}>
                <ProLayout
                    title={'老人跌倒检测系统'}
                    loading={false}
                    // siderWidth={256}
                    logo={<i className="ri-bubble-chart-fill text-blue text-4xl"></i>}
                    bgLayoutImgList={[
                        {
                            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                            left: 85,
                            bottom: 100,
                            height: '303px',
                        },
                        {
                            src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                            bottom: -68,
                            right: -45,
                            height: '303px',
                        },
                        {
                            src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                            bottom: 0,
                            left: 0,
                            width: '331px',
                        },
                    ]}
                    {...menuRouter()}
                    location={{
                        pathname,
                    }}
                    siderMenuType="group"
                    menu={{
                        collapsedShowGroupTitle: true,
                    }}
                    avatarProps={{
                        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                        size: 'small',
                        title: (
                            <Dropdown menu={{items: menu}} trigger={['click']}>
                                <div className={'flex-bc'}>
                                    <span className="h-full flex-cc"> {phone}</span>
                                </div>
                            </Dropdown>
                        ),
                    }}
                    actionsRender={(props) => {
                        if (props.isMobile) return [];
                        return [
                            <i className="ri-information-fill text-lg"></i>,
                            <i className="ri-question-fill text-lg"></i>,
                        ];
                    }}
                    headerTitleRender={(logo, title, _) => {
                        const defaultDom = (
                            <a>
                                {logo}
                                {title}
                            </a>
                        );
                        if (document.body.clientWidth < 1400) {
                            return defaultDom;
                        }
                        if (_.isMobile) return defaultDom;
                        return (
                            <>
                                {defaultDom}
                            </>
                        );
                    }}
                    menuFooterRender={(menuProps) => {
                        if (menuProps?.collapsed) return undefined;
                        return (
                            <div className={'text-center'}>
                                <div>© 2022 Made with love</div>
                                <div>by 山上沙锅</div>
                            </div>
                        );
                    }}
                    onMenuHeaderClick={() => {
                        changePathname('/home');
                        navigate('/home')
                    }}
                    menuItemRender={(item, dom) => {
                        return (
                            <div
                                onClick={() => {
                                    changePathname(item.path || '/home');
                                    navigate(item.path!)
                                }}
                            >
                                {dom}
                            </div>
                        )
                    }}
                    {...settings}
                >
                    <PageContainer title={false}>
                        <ProCard className={'min-h-[70vh]'} bordered>
                            <WithLoadingOutlet />
                        </ProCard>
                    </PageContainer>
                    <SettingDrawer
                        pathname={pathname}
                        enableDarkTheme
                        settings={settings}
                        hideHintAlert
                        hideCopyButton
                        onSettingChange={(changeSetting) => {
                            setThemeStyle(changeSetting)
                            setSetting(changeSetting);
                        }}
                    />
                </ProLayout>
            </ProConfigProvider>
        </div>
    );
};

export default Layout