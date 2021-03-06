// Copyright (c) 2015 Spinpunch, Inc. All Rights Reserved.
// See License.txt for license information.

var SidebarHeader = require('../sidebar_header.jsx');

export default class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);

        this.isSelected = this.isSelected.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
        };
    }

    handleClick(name) {
        this.props.selectTab(name);
    }

    isSelected(name) {
        if (this.props.selected === name) {
            return 'active';
        }

        return '';
    }

    componentDidMount() {
        $('.nav__menu-item').on('click', function clickme(e) {
            e.preventDefault();
            $(this).closest('.sidebar--collapsable').find('.nav__menu-item').removeClass('active');
            $(this).addClass('active');
            $(this).closest('.sidebar--collapsable').find('.nav__sub-menu').addClass('hide');
            $(this).next('.nav__sub-menu').removeClass('hide');
        });

        $('.nav__sub-menu a').on('click', function clickme(e) {
            e.preventDefault();
            $(this).closest('.nav__sub-menu').find('a').removeClass('active');
            $(this).addClass('active');
        });

        $('.nav__sub-menu-item').on('click', function clickme(e) {
            e.preventDefault();
            $(this).closest('.sidebar--collapsable').find('.nav__inner-menu').addClass('hide');
            $(this).closest('li').next('li').find('.nav__inner-menu').removeClass('hide');
            $(this).closest('li').next('li').find('.nav__inner-menu li:first a').addClass('active');
        });

        $('.nav__inner-menu a').on('click', function clickme() {
            $(this).closest('.nav__inner-menu').closest('li').prev('li').find('a').addClass('active');
        });

        $('.nav__sub-menu .menu__close').on('click', function close() {
            var menuItem = $(this).closest('li');
            menuItem.next('li').remove();
            menuItem.remove();
        });
    }

    render() {
        return (
            <div className='sidebar--left sidebar--collapsable'>
                <div>
                    <SidebarHeader
                        teamDisplayName='Admin Console'
                        teamType='I'
                    />
                    <ul className='nav nav-pills nav-stacked'>
                        <li>
                            <a href='#'
                                className='nav__menu-item active'
                            >
                                <span className='icon fa fa-gear'></span> <span>{'Basic Settings'}</span></a>
                            <ul className='nav nav__sub-menu'>
                                <li>
                                    <a
                                        href='#'
                                        className={this.isSelected('email_settings')}
                                        onClick={this.handleClick.bind(null, 'email_settings')}
                                    >
                                        {'Email Settings'}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className={this.isSelected('logs')}
                                        onClick={this.handleClick.bind(null, 'logs')}
                                    >
                                        {'Logs'}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='nav__menu-item'
                            >
                                <span className='icon fa fa-gear'></span> <span>{'Jobs'}</span>
                            </a>
                            <ul className='nav nav__sub-menu hide'>
                                <li>
                                    <a
                                        href='#'
                                        className={this.isSelected('job_settings')}
                                        onClick={this.handleClick.bind(null, 'job_settings')}
                                    >
                                        {'Job Settings'}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='nav__menu-item'
                            >
                                <span className='icon fa fa-gear'></span>
                                <span>{'Team Settings (306)'}</span>
                                <span className='menu-icon--right'>
                                    <i className='fa fa-plus'></i>
                                </span>
                            </a>
                            <ul className='nav nav__sub-menu hide'>
                                <li>
                                    <a
                                        href='#'
                                        className='nav__sub-menu-item active'
                                    >
                                        {'Adal '}
                                        <span className='menu-icon--right menu__close'>{'x'}</span>
                                </a>
                                </li>
                                <li>
                                    <ul className='nav nav__inner-menu'>
                                        <li>
                                            <a
                                                href='#'
                                                className='active'
                                            >
                                                {'- Users'}
                                            </a>
                                        </li>
                                        <li><a href='#'>{'- View Statistics'}</a></li>
                                        <li>
                                            <a href='#'>
                                                {'- View Audit Log'}
                                                <span className='badge pull-right small'>{'1'}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='nav__sub-menu-item'
                                    >
                                        {'Boole '}
                                        <span className='menu-icon--right menu__close'>{'x'}</span>
                                    </a>
                                </li>
                                <li>
                                    <ul className='nav nav__inner-menu hide'>
                                        <li>
                                            <a
                                                href='#'
                                                className='active'
                                            >
                                                {'- Users'}
                                            </a>
                                        </li>
                                        <li><a href='#'>{'- View Statistics'}</a></li>
                                        <li>
                                            <a href='#'>
                                                {'- View Audit Log'}
                                                <span className='badge pull-right small'>{'1'}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span
                                        data-toggle='modal'
                                        data-target='#select-team'
                                        className='nav-more'
                                    >
                                        {'Select a team'}
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

AdminSidebar.propTypes = {
    selected: React.PropTypes.string,
    selectTab: React.PropTypes.func
};