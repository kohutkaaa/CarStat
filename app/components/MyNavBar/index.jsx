import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

function MyNavBar() {

  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? 'active' : '';
  }

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
          <ul className="menu-inner py-1">
            <li className={`menu-item ${getNavLinkClass("/about_cars")}`} >
              <NavLink to='/about_cars'  className="menu-link">
                <i className="menu-icon tf-icons ti ti-car"></i>
                <div>Мої авто</div>
              </NavLink>
            </li>
            <li className={`menu-item ${getNavLinkClass("/add_car")}`} >
              <NavLink to='/add_car'  className="menu-link">
                <i className="menu-icon tf-icons ti ti-plus"></i>
                <div>Додати авто</div>
              </NavLink>
            </li>
            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Звітність</span>
            </li>
            <li className={`menu-item ${getNavLinkClass("/payments")}`} >
              <NavLink to='/payments'  className="menu-link">
                <i className="menu-icon tf-icons ti ti-file-analytics"></i>
                <div data-i18n="Chat">Витрати</div>
              </NavLink>
            </li>
            <li className="menu-item">
              <a href="app-calendar.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-chart-line"></i>
                <div data-i18n="Calendar">Статистика</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-kanban.html" className="menu-link">
                <i className="menu-icon tf-icons ti ti-gas-station"></i>
                <div data-i18n="Kanban">Топливо</div>
              </a>
            </li>
          </ul>
        </aside>
    </>
  )
}

MyNavBar.propTypes = {};

export default memo(MyNavBar);
