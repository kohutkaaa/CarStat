import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

function MyNavBar() {
  return (
    <>
       <aside id="layout-menu" className="vh-100 w-100 layout-menu menu-vertical menu bg-menu-theme text-start m-0" >
          
          <div className="app-brand demo py-2">
          <NavLink to='/' className="app-brand-link">
              <span className=" demo ">
                <img style={{ width: '100px' }} src={require('../../images/logo1.png')}  />
              </span>
              <span className="app-brand-text demo menu-text fw-bold">Car Statistics</span>
            </NavLink>
          </div>

          <div className="menu-inner-shadow"></div>
          {/* {({ isActive }) => isActive ? "menu-item active" : "menu-item" } */}

          <ul className="menu-inner py-1">
            <li className="menu-item active" >
              <NavLink to='/about_cars'  className="menu-link">
                <i className="menu-icon tf-icons ti ti-car"></i>
                <div>Мої авто</div>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink to='/add_car'  className="menu-link">
                <i className="menu-icon tf-icons ti ti-plus"></i>
                <div>Додати авто</div>
              </NavLink>
            </li>
            
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Звітність</span>
            </li>

            <li className="menu-item">
              <a href="app-email.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-mail"></i>
                <div data-i18n="Email">Email</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-chat.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-messages"></i>
                <div data-i18n="Chat">Chat</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-calendar.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-calendar"></i>
                <div data-i18n="Calendar">Calendar</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-kanban.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-layout-kanban"></i>
                <div data-i18n="Kanban">Kanban</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-email.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-mail"></i>
                <div data-i18n="Email">Email</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-chat.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-messages"></i>
                <div data-i18n="Chat">Chat</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-calendar.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-calendar"></i>
                <div data-i18n="Calendar">Calendar</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-kanban.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-layout-kanban"></i>
                <div data-i18n="Kanban">Kanban</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-email.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-mail"></i>
                <div data-i18n="Email">Email</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-chat.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-messages"></i>
                <div data-i18n="Chat">Chat</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-calendar.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-calendar"></i>
                <div data-i18n="Calendar">Calendar</div>
              </a>
            </li>
          </ul>
        </aside>
    </>
  )
}

MyNavBar.propTypes = {};

export default memo(MyNavBar);
