import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAdminStatistics from '../selectors';
import reducer from '../reducer';

import SpinnersForLoading from '../../../components/SpinnersForLoading';

export function CardsByCategory({
  state,
  page
}) {
  useInjectReducer({ key: 'adminStatistics', reducer });

  const iconbyCategory = (category) => {
    if (category === "Ремонтні роботи"){
      return 'ti-hammer text-danger';
    }
    if (category === "Автозапчастини"){
      return 'ti-puzzle text-warning';
    }
    if (category === "Інше"){
      return 'ti-link text-info';
    }
    if (category === "Топливо"){
      return 'ti-gas-station text-success';
    }
    if (category === "Разом"){
      return 'ti-hierarchy text-primary';
    }
  }

  const colorIconByCategory = (category) => {
    if (category === "Ремонтні роботи"){
      return 'bg-label-danger';
    }
    if (category === "Автозапчастини"){
      return 'bg-label-warning';
    }
    if (category === "Інше"){
      return 'bg-label-info';
    }
    if (category === "Топливо"){
      return 'bg-label-success';
    }
    if (category === "Разом"){
      return 'bg-label-light';
    }
  }

  const amountPaymentFuel = (category, itemId) => {
    if (state.dataPaymentsFilter === false ) {
      if (category === 'Разом') {
        let tot = 0;
        for (let i = 0; i < state.dataPaymFuel.length; i++) {
          tot += state.dataPaymFuel[i].attributes.Payment;
        }
        return(tot);
      } else {
        let filterData = state.dataPaymFuel.filter((expense) => expense.attributes.car.data.id === itemId)
        let tot = 0;
        for (let i = 0; i < filterData.length; i++) {
          tot += filterData[i].attributes.Payment;
        }
        return(tot)
      }
    }
    if (category === 'Разом') {
      let filter = state.dataPaymentsFilter.filter( step => {
        return step.attributes.Category.includes('Топливо')
      })
      let tot = 0;
      for (let i = 0; i < filter.length; i++) {
        tot += filter[i].attributes.Payment;
      }
      return(tot);
    } else {
      let filter = state.dataPaymentsFilter.filter( step => {
        return step.attributes.Category.includes('Топливо')
      })
      let filterData = filter.filter((expense) => expense.attributes.car.data.id === itemId)
      let tot = 0;
      for (let i = 0; i < filterData.length; i++) {
        tot += filterData[i].attributes.Payment;
      }
      return(tot)
    }
  }
   
  const percentagePaymentFuel = (itemId) => {
    if (state.dataPaymentsFilter === false ) {
      let filterData = state.dataPaymFuel.filter((expense) => expense.attributes.car.data.id === itemId)
      let total = 0;
        for (let i = 0; i < filterData.length; i++) {
          total += filterData[i].attributes.Payment;
        }
      let tot = 0;
      for (let i = 0; i < state.dataPaymFuel.length; i++) {
        tot += state.dataPaymFuel[i].attributes.Payment;
      }
      let percentage = total * 100 / tot;
      return(percentage.toFixed(2))
    } else {
      let filter = state.dataPaymentsFilter.filter( step => {
        return step.attributes.Category.includes('Топливо')
      })
      let filterData = filter.filter((expense) => expense.attributes.car.data.id === itemId)
      let tot = 0;
      for (let i = 0; i < filterData.length; i++) {
        tot += filterData[i].attributes.Payment;
      }
      let total = 0;
        for (let i = 0; i < state.dataPaymentsFilter.length; i++) {
          total += state.dataPaymentsFilter[i].attributes.Payment;
        }
      let percentage = tot * 100 / total;
      return(percentage.toFixed(2))
    }
  }
  
  const amountPayment = (category) => {
    if (state.fuelShow === true) {
      if (state.dataPaymentsFilter === false ) {
        if (category === 'Разом') {
          let tot = 0;
          for (let i = 0; i < state.dataPaym.length; i++) {
            tot += state.dataPaym[i].attributes.Payment;
          }
          return(tot);
        } else {
          let filter = state.dataPaym.filter( step => {
            return step.attributes.Category.includes(category)
          })
          let tot = 0;
          for (let i = 0; i < filter.length; i++) {
            tot += filter[i].attributes.Payment;
          }
          return(tot)
        }
      } else {
        if (category === 'Разом') {
          let tot = 0;
          for (let i = 0; i < state.dataPaymentsFilter.length; i++) {
            tot += state.dataPaymentsFilter[i].attributes.Payment;
          }
          return(tot);
        } else {
          let filter = state.dataPaymentsFilter.filter( step => {
            return step.attributes.Category.includes(category)
          })
          let tot = 0;
          for (let i = 0; i < filter.length; i++) {
            tot += filter[i].attributes.Payment;
          }
          return(tot)
        }
      }
    } else {
      if (state.dataPaymentsFilter === false ) {
        if (category === 'Разом') {
          let tot = 0;
          for (let a = 0; a < state.dataPaym.length; a++) {
            if (state.dataPaym[a].attributes.Category !== "Топливо") {
              tot += state.dataPaym[a].attributes.Payment;
            }
          }
          return(tot);
        } else {
          let filter = state.dataPaym.filter( step => {
            return step.attributes.Category.includes(category)
          })
          let tot = 0;
          for (let i = 0; i < filter.length; i++) {
            tot += filter[i].attributes.Payment;
          }
          return(tot)
        }
      } else {
        if (category === 'Разом') {
          let tot = 0;
          for (let a = 0; a < state.dataPaymentsFilter.length; a++) {
            if (state.dataPaymentsFilter[a].attributes.Category !== "Топливо") {
              tot += state.dataPaymentsFilter[a].attributes.Payment;
            }
          }
          return(tot);
        } else {
          let filter = state.dataPaymentsFilter.filter( step => {
            return step.attributes.Category.includes(category)
          })
          let tot = 0;
          for (let i = 0; i < filter.length; i++) {
            tot += filter[i].attributes.Payment;
          }
          return(tot)
        }
      }
    }
  }
  
  const percentagePayment = (category) => {
    if (state.dataPaymentsFilter === false ) {
      let total = 0;
        for (let i = 0; i < state.dataPaym.length; i++) {
          total += state.dataPaym[i].attributes.Payment;
        }
      let filter = state.dataPaym.filter( step => {
        return step.attributes.Category.includes(category)
      })
      let tot = 0;
      for (let i = 0; i < filter.length; i++) {
        tot += filter[i].attributes.Payment;
      }
      let percentage = tot * 100 / total;
      return(percentage.toFixed(2))
    }
    let total = 0;
      for (let i = 0; i < state.dataPaymentsFilter.length; i++) {
        total += state.dataPaymentsFilter[i].attributes.Payment;
      }
    let filter = state.dataPaymentsFilter.filter( step => {
      return step.attributes.Category.includes(category)
    })
    let tot = 0;
    for (let i = 0; i < filter.length; i++) {
      tot += filter[i].attributes.Payment;
    }
    let percentage = tot * 100 / total;
    return(percentage.toFixed(2))
  }  

  const totalAmountPayment = (category) => {
    if (state.fuelShow === true) {
      if (state.dataPaymentsFilter === false ) {
        if (category === 'Разом') {
          let tot = 0;
          for (let a = 0; a < state.dataCars.length; a++) {
            for (let i = 0; i < state.dataCars[a].attributes.payments.data.length; i++) {
              tot += state.dataCars[a].attributes.payments.data[i].attributes.Payment;
            }
          }
          return(tot);
        } else {
          let tot = 0;
          for (let a = 0; a < state.dataCars.length; a++) {
            var data = state.dataCars[a].attributes.payments.data.filter( step => {
              return step.attributes.Category.includes(category)
            })
            for (let i = 0; i < data.length; i++) {
              tot += data[i].attributes.Payment;
            }
          }
          return(tot)  
        }
      } else {
        if (category === 'Разом') {
          let tot = 0;
          for (let i = 0; i < state.dataPaymentsFilter.length; i++) {
            tot += state.dataPaymentsFilter[i].attributes.Payment;
          }
          return(tot);
        } else {
          let filter = state.dataPaymentsFilter.filter( step => {
            return step.attributes.Category.includes(category)
          })
          let tot = 0;
          for (let i = 0; i < filter.length; i++) {
            tot += filter[i].attributes.Payment;
          }
          return(tot)
        }
      }
    } else {
      if (state.dataPaymentsFilter === false ) {
        if (category === 'Разом') {
          let tot = 0;
          for (let a = 0; a < state.dataCars.length; a++) {
            var dataFilter = state.dataCars[a].attributes.payments.data.filter(item => item.attributes.Category !== "Топливо");
            for (let i = 0; i < dataFilter.length; i++) {
              tot += dataFilter[i].attributes.Payment;
            }
          }
          return(tot);
        } else {
          let tot = 0;
          for (let a = 0; a < state.dataCars.length; a++) {
            var data = state.dataCars[a].attributes.payments.data.filter(step => {
              return step.attributes.Category.includes(category)
            })
            for (let b = 0; b < data.length; b++) {
              if (data[b].attributes.Category !== "Топливо") {
                tot += data[b].attributes.Payment;
              }
            }
          }
          return tot; 
        }
      } else {
        if (category === 'Разом') {
          let tot = 0;
          for (let a = 0; a < state.dataPaymentsFilter.length; a++) {
            if (state.dataPaymentsFilter[a].attributes.Category !== "Топливо") {
              tot += state.dataPaymentsFilter[a].attributes.Payment;
            }
          }
          return tot;
        } else {
          let tot = 0;
          for (let a = 0; a < state.dataPaymentsFilter.length; a++) {
            if (state.dataPaymentsFilter[a].attributes.Category === category && state.dataPaymentsFilter[a].attributes.Category !== "Топливо") {
              tot += state.dataPaymentsFilter[a].attributes.Payment;
            }
          }
          return tot;
        }
      }
    }
  }  

  const totalPercentagePayment = (category) => {
    if (state.fuelShow === true) {
      if (state.dataPaymentsFilter === false ) {
        let total = 0;
          for (let a = 0; a < state.dataCars.length; a++) {
            for (let i = 0; i < state.dataCars[a].attributes.payments.data.length; i++) {
              total += state.dataCars[a].attributes.payments.data[i].attributes.Payment;
            }
          }
        let tot = 0;
        for (let a = 0; a < state.dataCars.length; a++) {
          var data = state.dataCars[a].attributes.payments.data.filter( step => {
            return step.attributes.Category.includes(category)
          })
          for (let i = 0; i < data.length; i++) {
            tot += data[i].attributes.Payment;
          }
        }
        let percentage = tot * 100 / total;
        return(percentage.toFixed(2))
      } else {
        let total = 0;
        for (let i = 0; i < state.dataPaymentsFilter.length; i++) {
          total += state.dataPaymentsFilter[i].attributes.Payment;
        }
        let filter = state.dataPaymentsFilter.filter( step => {
          return step.attributes.Category.includes(category)
        })
        let tot = 0;
        for (let i = 0; i < filter.length; i++) {
          tot += filter[i].attributes.Payment;
        }
        let percentage = tot * 100 / total;
        return(percentage.toFixed(2))
      }
    } else {
      if (state.dataPaymentsFilter === false ) {
        let total = 0;
        let tot = 0;
        for (let a = 0; a < state.dataCars.length; a++) {
          const dataFilter = state.dataCars[a].attributes.payments.data.filter(item => item.attributes.Category !== "Топливо");
          for (let i = 0; i < dataFilter.length; i++) {
            total += dataFilter[i].attributes.Payment;
            if (dataFilter[i].attributes.Category === category) {
              tot += dataFilter[i].attributes.Payment;
            }
          }
        }
        const percentage = (tot * 100) / total;
        return percentage.toFixed(2);   
      } else {
        let total = 0;
        let tot = 0;
        for (let a = 0; a < state.dataPaymentsFilter.length; a++) {
          if (state.dataPaymentsFilter[a].attributes.Category !== "Топливо") {
            total += state.dataPaymentsFilter[a].attributes.Payment;
            if (state.dataPaymentsFilter[a].attributes.Category === category) {
              tot += state.dataPaymentsFilter[a].attributes.Payment;
            }
          }
        }
        if (tot === 0 || total === 0) {
          return 0;
        }
        const percentage = (tot * 100) / total;
        return percentage.toFixed(2);
      }
    }
  }  

  const dataCategoryWihtFuel = [{Category: "Ремонтні роботи"}, {Category: "Автозапчастини"}, {Category: "Інше"}, {Category: "Топливо"}];

  const dataCategory = [{Category: "Ремонтні роботи"}, {Category: "Автозапчастини"}, {Category: "Інше"}];

  return (
    page === 'fuel' ? (
      state.dataPaymFuel === false ? (
        <SpinnersForLoading/>
      ) : (
        <>
          {state.dataPaymentsFilter && state.dataPaymentsFilter.length === 0 ? (
            <>
              <div className="d-flex justify-content-center mt-5">
                <img style={{ width: '150px' }} src={require('../../../images/logo1.png')}  />
              </div>
              <h5 className="text-center text-uppercase text-muted ">
                <span className="badge bg-label-primary p-2 rounded mx-2">
                  Car Statistics
                </span>
              </h5>
              <h4 className="mt-4 text-center text-uppercase">
                У вас ще не має збережених витрат за цей проміжок часу! 
              </h4>
            </>
          ) : (
            <>
              {state.dataPaymFuel.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center mt-5">
                    <img style={{ width: '300px' }} src={require('../../../images/logo1.png')}  />
                  </div>
                  <h5 className="text-center text-uppercase text-muted ">Ласкаво просимо до  
                    <span className="badge bg-label-primary p-2 rounded mx-2">
                      Car Statistics
                    </span>
                    - автомобільного трекера витрат!
                  </h5>
                  <h4 className="mt-4 text-center text-uppercase">
                    У вас ще не має збережених витрат! 
                  </h4>
                </>
              ) : (
                state.carId === false ? (
                  <>
                    {state.dataCars && state.dataCars.map( (item, index) => (
                      <div className="col-3 mb-4" key={index}>
                        <div className="card">
                          <div className="card-body">
                            <div className='badge p-2 bg-label-success mb-2 rounded'>
                              <i className='ti ti-gas-station ti-md'></i>
                            </div>
                            <h5 className="card-title mb-1 pt-2">{item.attributes.Model}</h5>
                            <small className="text-muted">авто</small>
                            <p className="mb-2 mt-1">{percentagePaymentFuel(item.id)} %</p>
                            <div className="pt-1">
                              <span className="badge bg-label-danger">{amountPaymentFuel('Топливо', item.id)} грн</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-3 mb-4">
                      <div className="card bg-label-primary">
                        <div className="card-body ">
                          <div className={`badge p-2 ${colorIconByCategory('Разом')}  mb-2 rounded`}>
                            <i className={`ti ${iconbyCategory('Разом')} ti-md`}></i>
                          </div>
                          <h5 className="card-title mb-1 pt-2 text-primary">Разом</h5>
                          <small className="text-primary">витрати на авто</small>
                          <p className="mb-2 mt-1 text-primary">100 %</p>
                          <div className="pt-1">
                            <span className="badge bg-primary">{amountPaymentFuel('Разом')} грн</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className='badge p-2 bg-label-success mb-2 rounded'>
                          <i className='ti ti-gas-station ti-md'></i>
                        </div>
                        <h5 className="card-title mb-1 pt-2">Топливо</h5>
                        <small className="text-muted">разом</small>
                        <p className="mb-2 mt-1"><br/></p>
                        <div className="pt-1">
                          <span className="badge bg-label-danger">{amountPaymentFuel('Топливо', state.carId)} грн</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </>
      )
    ) : (
      <>
        {state.dataPaymentsFilter && state.dataPaymentsFilter.length === 0 ? (
          <>
            <div className="d-flex justify-content-center mt-5">
              <img style={{ width: '150px' }} src={require('../../../images/logo1.png')}  />
            </div>
            <h5 className="text-center text-uppercase text-muted ">
              <span className="badge bg-label-primary p-2 rounded mx-2">
                Car Statistics
              </span>
            </h5>
            <h4 className="mt-4 text-center text-uppercase">
              У вас ще не має збережених витрат за цей проміжок часу! 
            </h4>
          </>
        ) : (
          state.dataCars && state.dataPaym && state.dataPaym !== false ? (
            <>
              {state.dataPaym.length === 0 ? (
                <>
                  <div className="d-flex justify-content-center mt-5">
                    <img style={{ width: '300px' }} src={require('../../../images/logo1.png')}  />
                  </div>
                  <h5 className="text-center text-uppercase text-muted ">Ласкаво просимо до  
                    <span className="badge bg-label-primary p-2 rounded mx-2">
                      Car Statistics
                    </span>
                    - автомобільного трекера витрат!
                  </h5>
                  <h4 className="mt-4 text-center text-uppercase">
                    У вас ще не має збережених витрат! 
                  </h4>
                </>
              ) : (
                <>
                  {state.fuelShow === true ? (
                    dataCategoryWihtFuel && dataCategoryWihtFuel.map( (item, index) => (
                      <div className="col-3 mb-4" key={index}>
                        <div className="card">
                          <div className="card-body">
                            <div className={`badge p-2 ${colorIconByCategory(item.Category)}  mb-2 rounded`}>
                              <i className={`ti ${iconbyCategory(item.Category)} ti-md`}></i>
                            </div>
                            <h5 className="card-title mb-1 pt-2">{item.Category}</h5>
                            <small className="text-muted">категорія</small>
                            {state.carId === false ? (
                              <p className="mb-2 mt-1">{percentagePayment(item.Category)} %</p>
                            ) : (<><br/><br/></>)
                            }
                            <div className="pt-1">
                              <span className="badge bg-label-danger">{amountPayment(item.Category)} грн</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    dataCategory && dataCategory.map( (item, index) => (
                      <div className="col-3 mb-4" key={index}>
                        <div className="card">
                          <div className="card-body">
                            <div className={`badge p-2 ${colorIconByCategory(item.Category)}  mb-2 rounded`}>
                              <i className={`ti ${iconbyCategory(item.Category)} ti-md`}></i>
                            </div>
                            <h5 className="card-title mb-1 pt-2">{item.Category}</h5>
                            <small className="text-muted">категорія</small>
                            {state.carId === false ? (
                              <p className="mb-2 mt-1">{percentagePayment(item.Category)} %</p>
                            ) : (<><br/><br/></>)
                            }
                            <div className="pt-1">
                              <span className="badge bg-label-danger">{amountPayment(item.Category)} грн</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )} 
                  <div className="col-3 mb-4">
                    <div className="card bg-label-primary">
                      <div className="card-body ">
                        <div className={`badge p-2 ${colorIconByCategory('Разом')}  mb-2 rounded`}>
                          <i className={`ti ${iconbyCategory('Разом')} ti-md`}></i>
                        </div>
                        <h5 className="card-title mb-1 pt-2 text-primary">Разом</h5>
                        <small className="text-primary">витрати на авто</small>
                        {state.carId === false ? (
                              <p className="mb-2 mt-1 text-primary">100 %</p>
                            ) : (<><br/><br/></>)
                            }
                        <div className="pt-1">
                          <span className="badge bg-primary">{amountPayment('Разом')} грн</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {state.fuelShow === true ? (
                dataCategoryWihtFuel && dataCategoryWihtFuel.map( (item, index) => (
                  <div className="col-3 mb-4" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className={`badge p-2 ${colorIconByCategory(item.Category)}  mb-2 rounded`}>
                          <i className={`ti ${iconbyCategory(item.Category)} ti-md`}></i>
                        </div>
                        <h5 className="card-title mb-1 pt-2">{item.Category}</h5>
                        <small className="text-muted">категорія</small>
                        <p className="mb-2 mt-1">{totalPercentagePayment(item.Category)} %</p>
                        <div className="pt-1">
                          <span className="badge bg-label-danger">{totalAmountPayment(item.Category)} грн</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                dataCategory && dataCategory.map( (item, index) => (
                  <div className="col-3 mb-4" key={index}>
                    <div className="card">
                      <div className="card-body">
                        <div className={`badge p-2 ${colorIconByCategory(item.Category)}  mb-2 rounded`}>
                          <i className={`ti ${iconbyCategory(item.Category)} ti-md`}></i>
                        </div>
                        <h5 className="card-title mb-1 pt-2">{item.Category}</h5>
                        <small className="text-muted">категорія</small>
                        <p className="mb-2 mt-1">{totalPercentagePayment(item.Category)} %</p>
                        <div className="pt-1">
                          <span className="badge bg-label-danger">{totalAmountPayment(item.Category)} грн</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div className="col-3 mb-4">
                <div className="card bg-label-primary">
                  <div className="card-body ">
                    <div className={`badge p-2 ${colorIconByCategory('Разом')}  mb-2 rounded`}>
                      <i className={`ti ${iconbyCategory('Разом')} ti-md`}></i>
                    </div>
                    <h5 className="card-title mb-1 pt-2 text-primary">Разом</h5>
                    <small className="text-primary">витрати на всі авто</small>
                    <p className="mb-2 mt-1 text-primary">100 %</p>
                    <div className="pt-1">
                      <span className="badge bg-primary"> {totalAmountPayment('Разом')} грн</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </>
    )
  )
}

CardsByCategory.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array]),  
};

const mapStateToProps = createStructuredSelector({
  state: makeSelectAdminStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CardsByCategory);