import type {ProSettings} from '@ant-design/pro-components';
import {
    ProCard,
    PageContainer,
    ProConfigProvider,
    ProLayout,
    SettingDrawer,
} from '@ant-design/pro-components';
import {Input, theme, MenuProps, Modal, Dropdown} from 'antd';
import React, {useState} from 'react';
import defaultProps from './components/_defaultProps';
import {useNavigate} from "react-router-dom";
import {remove_Token} from "@/utils/handleToken";
import WithLoadingOutlet from "@/components/antd/WithLoadingOutlet";
import {store} from "@/redux";
// import MenuCard from "@/layout/components/MenuCard";

const SearchInput = () => {
    const {token} = theme.useToken();
    return (
        <div
            aria-hidden="true"
            style={{
                display: 'flex',
                alignItems: 'center',
                marginInlineEnd: 24,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <Input
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: token.colorBgTextHover,
                }}
                prefix={
                    <i className="ri-search-line" style={{
                        color: token.colorTextLightSolid,
                    }}></i>
                }
                placeholder="搜索方案"
                bordered={false}
            />
            <i className='ri-add-circle-fill text-2xl'
               style={{
                   color: token.colorPrimary
               }}
            ></i>
        </div>
    );
};

const Layout:React.FC =  () => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: true,
    });

    const [pathname, setPathname] = useState('/welcome');
    // const [num, setNum] = useState(40);
    const [modal, contextHolder] = Modal.useModal();
    const navigate = useNavigate()
    const config = {
        title: '您确定要退出吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
            remove_Token()
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
        // {
        //     key: 'user-center',
        //     icon: <UserOutlined/>,
        //     label: (
        //         <span onClick={() => navigate('/user/setting')}>个人中心</span>
        //     ),
        // },
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
                    {...defaultProps}
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
                                    <span className="h-full flex-cc"> {'山上沙锅'}</span>
                                </div>
                            </Dropdown>
                        ),
                    }}
                    actionsRender={(props) => {
                        if (props.isMobile) return [];
                        return [
                            props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                                <SearchInput/>
                            ) : undefined,
                            <i className="ri-information-fill text-lg"></i>,
                            <i className="ri-question-fill text-lg"></i>,
                            <i className="ri-github-fill text-lg"></i>,
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
                                {/*<MenuCard/>*/}
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
                    onMenuHeaderClick={(e) => console.log(e)}
                    menuItemRender={(item, dom) => {
                        return (
                            <div
                                onClick={() => {
                                    navigate(item.path!)
                                    setPathname(item.path || '/welcome');
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
                        getContainer={() => document.getElementById('app-layout')}
                        settings={settings}
                        onSettingChange={(changeSetting) => {
                            setSetting(changeSetting);
                        }}
                        disableUrlParams={false}
                    />
                </ProLayout>
            </ProConfigProvider>
        </div>
    );
};

export default Layout