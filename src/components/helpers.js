import React, { Component } from 'react'

const helpers = {
  convertdate: function (date) {
    const newDate = date.split('-').reverse().slice(0, -1)
    const arrDates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const arrDates2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const index1 = arrDates2.indexOf(newDate[1])
    newDate[1] = arrDates[index1]
    return newDate.join('-')
  }
}

export default helpers